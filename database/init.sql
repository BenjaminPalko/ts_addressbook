
create table if not exists AddressBook
(
	PK serial not null,
	address varchar(40) not null,
	postalcode varchar(6) not null,
	city varchar(30) not null,
	province varchar(30) not null,
	country varchar(30) not null
);

create unique index AddressBook_PK_uindex
	on AddressBook (PK);

create unique index AddressBook_address_uindex
	on AddressBook (address);

alter table AddressBook
	add constraint AddressBook_pk
		primary key (PK);


create table Users
(
	address_fk serial not null
		constraint Users_addressbook_pk_fk
			references addressbook,
	firstname varchar(20) not null,
	middleinitial char(1) not null,
	lastname varchar(20) not null,
	age int not null,
	sex char(1) not null
);





