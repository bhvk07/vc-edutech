package org.VCERP.Education.VC.model;

public class Attendance {
	private long id;
	private String RollNo;
	private String Name;
	private String currentDate;
	private String Attendance;
	private String acad_year;
	private String standard;
	private String division;
	private String from_date;
	private String to_date;
	private int totalDays;
	private int totalPresent;
	private String percentageCount;
	private String branch;
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
	public String getDivision() {
		return division;
	}
	public void setDivision(String division) {
		this.division = division;
	}
	public String getBranch() {
		return branch;
	}
	public void setBranch(String branch) {
		this.branch = branch;
	}
	public void setCurrentDate(String currentDate) {
		this.currentDate = currentDate;
	}
	public String getStandard() {
		return standard;
	}
	public void setStandard(String standard) {
		this.standard = standard;
	}
	public String getFrom_date() {
		return from_date;
	}
	public void setFrom_date(String from_date) {
		this.from_date = from_date;
	}
	public String getTo_date() {
		return to_date;
	}
	public void setTo_date(String to_date) {
		this.to_date = to_date;
	}
	public String getPercentageCount() {
		return percentageCount;
	}
	public void setPercentageCount(String percentageCount) {
		this.percentageCount = percentageCount;
	}
	public int getTotalDays() {
		return totalDays;
	}
	public void setTotalDays(int totalDays) {
		this.totalDays = totalDays;
	}
	public int getTotalPresent() {
		return totalPresent;
	}
	public void setTotalPresent(int totalPresent) {
		this.totalPresent = totalPresent;
	}
	
}
