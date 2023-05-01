SELECT employee.first_name, employee.last_name, employee.manager_id, role.title,role.salary,department.name
FROM employee 
JOIN role 
ON employee.role_id = role.id
JOIN department
ON role.department_id = department.id;
