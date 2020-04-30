package org.VCERP.Education.VC.controller;

import java.util.ArrayList;

import org.VCERP.Education.VC.dao.AttendanceDAO;
import org.VCERP.Education.VC.model.Attendance;

public class AttendanceController {

	public ArrayList<Attendance> getAttendanceList(String acad_year, String courses) {
		AttendanceDAO dao=new AttendanceDAO();
		return dao.getAttendanceList(acad_year,courses);
	}

	public void studentAttendance(String acad_year, String courses, ArrayList<String> rollno,
			ArrayList<String> attend) {
		AttendanceDAO dao=new AttendanceDAO();
		dao.studentAttendance(acad_year,courses,rollno,attend);
		
	}

}
