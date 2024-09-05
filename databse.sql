/*create table users*/

create table users(
    user_id uuid DEFAULT gen_random_uuid() primary key,
    pin varchar(255) unique not null,
    password varchar(255) not null, 
    imageurl varchar(255) 

);


/*create table api info */

CREATE TABLE api_org (
    resource VARCHAR(255) PRIMARY KEY,
    allowedKeys varchar(255) NOT NULL,
    apiurl varchar(255) NOT NULL
);

/* insertion into api_org */

-- Insert non-sensitive attributes for the personal_info relation
INSERT INTO api_org (resource, allowedKeys, apiurl)
VALUES 
('personal_info', 'name, surname, country, address, dateOfBirth', 'https://mygov-provider-7df4c6be399d.herokuapp.com/api/personal_info');

-- Insert non-sensitive attributes for the workplace relation
INSERT INTO api_org (resource, allowedKeys, apiurl)
VALUES 
('workplace', 'company_name, company_address, occupation, salary, insurance', 'https://mygov-provider-7df4c6be399d.herokuapp.com/api/workplace_info');

-- Insert non-sensitive attributes for the personal_interest relation
INSERT INTO api_org (resource, allowedKeys, apiurl)
VALUES 
('personal_interest', 'hobbies, pets, favorite_color', 'https://mygov-provider-7df4c6be399d.herokuapp.com/api/personal_interest');

-- Insert non-sensitive attributes for the financial_info relation
INSERT INTO api_org (resource, allowedKeys, apiurl)
VALUES 
('financial_info', 'tax_yearly, expenses_yearly, revenue_yearly', 'https://mygov-provider-7df4c6be399d.herokuapp.com/api/financial_info');

-- Insert non-sensitive attributes for the family_info relation
INSERT INTO api_org (resource, allowedKeys, apiurl)
VALUES 
('family_info', 'family_name, family_size, number_boys, number_girls', 'https://mygov-provider-7df4c6be399d.herokuapp.com/api/family_info');

-- Insert non-sensitive attributes for the education_info relation
INSERT INTO api_org (resource, allowedKeys, apiurl)
VALUES 
('education_info', 'institution_name, institution_address, highest_degree', 'https://mygov-provider-7df4c6be399d.herokuapp.com/api/education_info');
