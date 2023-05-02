USE workplace_db;
INSERT INTO department (name)
VALUES ("Marketing"),
       ("Engineering"),
       ("Finance"),
       ("Legal"),
       ("Recruitment");

INSERT INTO role (title, salary,department_id)
VALUES ('Head Marketer',85000,1),
       ('Full Stack Engineer',100000,2),
       ('CFO', 250000,3),
       ('Lawyer',75000,4),
       ('recruiter',50000,5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Michael', 'Scott', 1,null),
       ('Dewight', 'Schrutte',2,1),
       ('Jim','Halpert',3,1),
       ('Pam', 'Beesley',4,1),
       ('Kevin','Malone',5,1);