-- SELECT e.last_name,m.id, m.last_name
--  FROM employee e 
--  join employee m 
--  ON (e.manager_id = m.id);
-- SELECT employee.first_name AS "First Name", employee.last_name AS "Last Name", CONCAT(m.first_name,' ',m.last_name) AS Manager
-- FROM employee 
-- LEFT JOIN employee m ON employee.manager_id = m.id;

SELECT employee.first_name AS "First Name", employee.last_name AS "Last Name", CONCAT(m.first_name,' ',m.last_name) AS Manager, role.title,role.salary AS Salary,department.name AS Department
    FROM employee 
    JOIN role ON employee.role_id = role.id 
    JOIN department ON role.department_id = department.id 
    LEFT JOIN employee m ON employee.manager_id = m.id;