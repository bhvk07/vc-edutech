package org.VCERP.Education.VC.model;

public class Caste {
	private long id;
	private String Caste;
	private String Created_Date;
	private String branch;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getCaste() {
		return Caste;
	}
	public void setCaste(String caste) {
		Caste = caste;
	}
	public String getCreated_Date() {
		return Created_Date;
	}
	public void setCreated_Date(String created_Date) {
		Created_Date = created_Date;
	}
	public String getBranch() {
		return branch;
	}
	public void setBranch(String branch) {
		this.branch = branch;
	}
	
}
