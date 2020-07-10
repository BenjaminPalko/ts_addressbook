/*  Tables  */
create table if not exists AddressBook
(
	addressbook_key serial not null,
	address varchar(40) not null,
	postalcode varchar(6) not null,
	city varchar(30) not null,
	province varchar(30) not null,
	country varchar(30) not null
);

create unique index AddressBook_addressbook_key_uindex
	on AddressBook (addressbook_key);

create unique index AddressBook_address_uindex
	on AddressBook (address);

alter table AddressBook
	add constraint AddressBook_addressbook_key
		primary key (addressbook_key);


create table users
(
	user_key serial not null
		constraint users_address_fk
			references addressbook,
	addressbook_key serial not null,
	firstname varchar(30) not null,
	middlename varchar(30) not null,
	lastname varchar(30) not null,
	age int not null,
	sex varchar(1) not null
);

create unique index users_user_key_uindex
	on users (user_key);

alter table users
	add constraint users_pk
		primary key (user_key);

/*  Functions   */
CREATE OR REPLACE FUNCTION CreateRetrieveAddressBook(address_p VARCHAR(40), postalcode_p VARCHAR(6), city_p VARCHAR(30),
                                                     province_p VARCHAR(30), country_p VARCHAR(30))
    RETURNS TABLE (addressbook_key integer, address VARCHAR(40), postalcode VARCHAR(6), city VARCHAR(30),
                   province VARCHAR(30), country VARCHAR(30)) AS
$$
BEGIN
    IF not exists(select *
                  from addressbook ab
                  where ab.address = address_p
                    and ab.postalcode = postalcode_p
                    and ab.city = city_p
                    and ab.province = province_p
                    and ab.country = country_p
                  limit 1) THEN
        insert into addressbook(address, postalcode, city, province, country)
        VALUES (address_p, postalcode_p, city_p, province_p, country_p);
    END IF;
    RETURN QUERY select *
                 from addressbook ab
                 where ab.address = address_p
                   and ab.postalcode = postalcode_p
                   and ab.city = city_p
                   and ab.province = province_p
                   and ab.country = country_p
                 limit 1;
END
$$ LANGUAGE plpgsql



