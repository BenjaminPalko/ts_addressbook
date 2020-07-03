
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
	address_key serial not null,
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

CREATE OR REPLACE FUNCTION CreateOrRetrieveAddressBookKey(add VARCHAR(40), pos VARCHAR(6), cit VARCHAR(30), pro VARCHAR(30), cou VARCHAR(30))
    RETURNS numeric AS $$
BEGIN
    IF not exists(select * from addressbook where address = add and postalcode = pos and city = cit and province = pro and country = cou limit 1) THEN
        insert into addressbook(address, postalcode, city, province, country) VALUES (add, pos, cit, pro, cou);
    END IF;
    select addressbook_key from addressbook where address = add and postalcode = pos and city = cit and province = pro and country = cou limit 1;
end; $$ LANGUAGE plpgsql


