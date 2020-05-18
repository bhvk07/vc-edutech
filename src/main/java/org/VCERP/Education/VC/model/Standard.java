package org.VCERP.Education.VC.model;

public class Standard {
	private long id;
	private String standard;
	private String std_fees;
	private String subject;
	private String Branch;
	private String created_date;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getStandard() {
		return standard;
	}
	public void setStandard(String standard) {
		this.standard = standard;
	}
	public String getStd_fees() {
		return std_fees;
	}
	public void setStd_fees(String std_fees) {
		this.std_fees = std_fees;
	}
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	public String getBranch() {
		return Branch;
	}
	public void setBranch(String branch) {
		Branch = branch;
	}
	public String getCreated_date() {
		return created_date;
	}
	public void setCreated_date(String created_date) {
		this.created_date = created_date;
	}
	
	
}
