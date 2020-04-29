package org.VCERP.Education.VC.model;

public class Attendance {
	private long id;
	private String RollNo;
	private String Name;
	private String currentDate;
	private String Attendance;
	private String acad_year;
	private String course;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getRollNo() {
		return RollNo;
	}
	public void setRollNo(String rollNo) {
		RollNo = rollNo;
	}
	public String getName() {
		return Name;
	}
	public void setName(String name) {
		Name = name;
	}
	public String getCurrentDate() {
		return currentDate;
	}
	public void setDate(String date) {
		currentDate = date;
	}
	public String getAttendance() {
		return Attendance;
	}
	public void setAttendance(String attendance) {
		Attendance = attendance;
	}
	public String getAcad_year() {
		return acad_year;
	}
	public void setAcad_year(String acad_year) {
		this.acad_year = acad_year;
	}
	public String getCourse() {
		return course;
	}
	public void setCourse(String course) {
		this.course = course;
	}
	
	
}
