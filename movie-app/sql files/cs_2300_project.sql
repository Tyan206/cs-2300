create database cs_2300_db;

use cs_2300_db;

-- Create tables

create table Title ( 
	T_id	varchar(20)	not null primary key,
    T_name	varchar(5000) not null,
    T_type	varchar(10),
    T_status	varchar(10),
    T_country	varchar(50),
    T_time	varchar(50),
    T_poster	varchar(5000),
    T_release	varchar(20),
    T_cert	varchar(10),
    T_story	varchar(5000),
    Y_links	varchar(500)
); -- data inserted

create table Genre_of(
	T_id	varchar(20)		not null references Title(T_id),
    G_name	varchar(20)	not null references Genre(G_name),
    primary key(T_id,G_name)
); -- data inserted

create table Genre(
	G_name varchar(20) not null primary key
); -- data inserted

create table Streaming_on(
	T_id	varchar(20)		not null,
    S_id	int		not null references Streaming_service(S_id),
    primary key(T_id,S_id)
); -- data inserted

create table Streaming_service(
	S_id	int	not null primary key,
    S_name	varchar(20) not null,
    S_price	float,
    S_url	varchar(1000) not null
); -- data inserted

create table Acted_by(
	T_id	varchar(20)		not null references Title(T_id),
    A_id	int		not null references Person(id),
    A_role	varchar(100),
    primary key(T_id,A_id)
); -- data inserted

create table Directed_by(
	T_id	varchar(20)		not null references Title(T_id),
    D_id	int		not null references Person(id),
    primary key(T_id,D_id)
); -- data inserted


create table Written_by(
	T_id	varchar(20)		not null references Title(T_id),
    W_id	int		not null references Person(id),
    primary key(T_id,W_id)
); -- data inserted

create table Person(
	id	int		not null primary key,
    name	varchar(100) not null
); -- data inserted

