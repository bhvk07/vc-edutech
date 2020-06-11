package org.VCERP.Education.VC.controller;

import java.util.ArrayList;


import org.VCERP.Education.VC.dao.TimeSlotDAO;

import org.VCERP.Education.VC.model.TimeSlot;
public class TimeSlotController{
	
	public TimeSlot InsertTimeSlot(TimeSlot ts) {
		TimeSlotDAO dao=new TimeSlotDAO();
		return dao.InsertTimeSlot(ts);
	}
	public ArrayList<TimeSlot> loadTime() {
		TimeSlotDAO dao=new TimeSlotDAO();
		return dao.loadTime();
	}
}