package org.VCERP.Education.VC.controller;

import org.VCERP.Education.VC.dao.EmployeeDAO;
import org.VCERP.Education.VC.model.Employee;

public class EmployeeController {

	public Employee addEmployee(Employee emp) {
		EmployeeDAO dao=new EmployeeDAO();
		return dao.addEmployee(emp);
	}

}
