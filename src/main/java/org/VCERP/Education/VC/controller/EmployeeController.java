package org.VCERP.Education.VC.controller;

import java.util.ArrayList;

import org.VCERP.Education.VC.dao.EmployeeDAO;
import org.VCERP.Education.VC.model.Employee;

public class EmployeeController {

	public Employee addEmployee(Employee emp) {
		EmployeeDAO dao=new EmployeeDAO();
		return dao.addEmployee(emp);
	}

	public ArrayList<Employee> FetchAllEmployee() {
		EmployeeDAO dao=new EmployeeDAO();
		return dao.FetchAllEmployee();
	}

	public Employee createEmployeeAccount(Employee emp) {
		EmployeeDAO dao=new EmployeeDAO();
		return dao.createEmployeeAccount(emp);
	}

}
