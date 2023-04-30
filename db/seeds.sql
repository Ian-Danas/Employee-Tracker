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
VALUES ('John', 'Lennon', 1,1),
       ('Ringo', 'Star',2,2),
       ('George','Harrison',3,3),
       ('Paul', 'McCarthy',4,4),
       ('Yoko','Ono',5,5);