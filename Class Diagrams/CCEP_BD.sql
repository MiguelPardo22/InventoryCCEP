create database ccep_bd;

create table categories(
id bigint auto_increment,
name varchar(30) not null,
state varchar(10),
primary key(id));

create table subcategories(
id bigint auto_increment,
name varchar(30) not null,
category_id bigint,
state varchar(10),
primary key(id),
foreign key(category_id) references categories(id));

create table suppliers(
id bigint auto_increment,
nit bigint not null,
name varchar(50) not null,
phone bigint,
mail varchar(100) not null,
state varchar(10),
primary key(id));

create table products(
id bigint auto_increment,
name varchar(50) not null,
reference bigint not null,
description varchar(250) not null,
purchase_price numeric not null,
sale_price numeric not null,
subcategory_id bigint not null,
provider_id bigint not null,
state varchar(10),
primary key(id),
foreign key(subcategory_id) references subcategories(id),
foreign key(provider_id) references suppliers(id));

create table sales(
id bigint auto_increment,
total_sale numeric not null,
sale_date date not null,
state varchar(10),
primary key(id));

create table sales_details(
id bigint auto_increment,
quantity int not null,
subtotal numeric not null,
final_price bigint not null,
product_id bigint not null,
sale_id bigint not null,
state varchar(10),
primary key(id),
foreign key(product_id) references products(id),
foreign key(sale_id) references sales(id));


create table purchases(
id bigint auto_increment,
total_purchase numeric not null,
purchase_date date not null,
provider_id bigint not null,
state varchar(10),
primary key(id),
foreign key(provider_id) references suppliers(id));


create table purchases_details(
id bigint auto_increment,
quantity int not null,
subtotal numeric not null,
product_id bigint not null,
purchase_id bigint not null,
state varchar(10),
primary key(id),
foreign key(product_id) references products(id),
foreign key(purchase_id) references purchases(id));

create table inventories(
id bigint auto_increment,
stock bigint not null,
product_id bigint not null,
saledetail_id bigint,
purchasedetail_id bigint,
primary key(id),
foreign key(purchasedetail_id) references purchases_details(id),
foreign key(saledetail_id) references sales_details(id));