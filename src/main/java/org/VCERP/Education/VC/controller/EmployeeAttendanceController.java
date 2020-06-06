package org.VCERP.Education.VC.controller;

import java.util.ArrayList;

import org.VCERP.Education.VC.dao.EmployeeAttendanceDAO;
//import org.VCERP.Education.VC.dao.AttendanceDAO;
import org.VCERP.Education.VC.model.Employee;

public class EmployeeAttendanceController{

	public ArrayList<Employee> getEmpAttendanceList(String branch) {
		EmployeeAttendanceDAO dao=new EmployeeAttendanceDAO();
		return dao.getEmployeeAttendanceList(branch);
	}

	public void employeeAttendance(ArrayList<String> empcode, ArrayList<String> intime, ArrayList<String> outtime,
			ArrayList<String> attend,String branch) {
		EmployeeAttendanceDAO dao=new EmployeeAttendanceDAO();
		dao.employeeAttendance(empcode,intime,outtime,attend,branch);
	}

	public Employee getEmpAttendanceStat(Employee emp) {
		EmployeeAttendanceDAO dao=new EmployeeAttendanceDAO();
		return dao.getEmpAttendanceStat(emp);
	}

}