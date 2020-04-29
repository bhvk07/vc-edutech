package org.VCERP.Education.VC.controller;

import java.util.ArrayList;

import org.VCERP.Education.VC.dao.AttendanceDAO;
import org.VCERP.Education.VC.model.Attendance;

public class AttendanceController {

	public ArrayList<Attendance> getAttendanceList(String acad_year, String courses) {
		AttendanceDAO dao=new AttendanceDAO();
		return dao.getAttendanceList(acad_year,courses);
	}

}
