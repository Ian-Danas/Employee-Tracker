-- SELECT e.last_name,m.id, m.last_name
--  FROM employee e 
--  join employee m 
--  ON (e.manager_id = m.id);
SELECT employee.first_name, employee.last_name, m.last_name AS manager, role.title,role.salary,department.name AS Department
FROM employee 
JOIN role ON employee.role_id = role.id 
JOIN department ON role.department_id = department.id 
JOIN employee m WHERE employee.manager_id = m.id;