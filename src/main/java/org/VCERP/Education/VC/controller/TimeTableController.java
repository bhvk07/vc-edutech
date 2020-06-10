package org.VCERP.Education.VC.controller;

import java.util.ArrayList;


import org.VCERP.Education.VC.dao.TimeTableDAO;

import org.VCERP.Education.VC.model.TimeTable;
public class TimeTableController{
	
	public TimeTable addSubject(TimeTable tt) {
		TimeTableDAO dao=new TimeTableDAO();
		return dao.addTimeTable(tt);
	}
	public ArrayList<TimeTable> FetchTimeTable() {
		TimeTableDAO dao=new TimeTableDAO();
		return dao.FetchTimeTable();
	}
}