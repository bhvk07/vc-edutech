package org.VCERP.Education.VC.controller;

import java.util.ArrayList;

import org.VCERP.Education.VC.dao.AttendanceDAO;
import org.VCERP.Education.VC.model.Attendance;

public class AttendanceController {

	public ArrayList<Attendance> getAttendanceList(String standard, String acad_year, String branch) {
		AttendanceDAO dao=new AttendanceDAO();
		return dao.getAttendanceList(standard,acad_year,branch);
	}

	public void studentAttendance(String standard, String acad_year,  String branch, ArrayList<String> rollno,
			ArrayList<String> attend) {
		AttendanceDAO dao=new AttendanceDAO();
		dao.studentAttendance(standard,acad_year,branch,rollno,attend);
		
	}

}
