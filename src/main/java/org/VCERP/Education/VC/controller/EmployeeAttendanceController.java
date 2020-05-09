package org.VCERP.Education.VC.controller;

import java.util.ArrayList;

import org.VCERP.Education.VC.dao.EmployeeAttendanceDAO;
//import org.VCERP.Education.VC.dao.AttendanceDAO;
import org.VCERP.Education.VC.model.Employee;

public class EmployeeAttendanceController{

	public ArrayList<Employee> getEmpAttendanceList() {
		EmployeeAttendanceDAO dao=new EmployeeAttendanceDAO();
		return dao.getEmployeeAttendanceList();
	}

/*	public void studentAttendance(String acad_year, String courses, ArrayList<String> rollno,
			ArrayList<String> attend) {
		AttendanceDAO dao=new AttendanceDAO();
		dao.studentAttendance(acad_year,courses,rollno,attend);
		
	}*/

}