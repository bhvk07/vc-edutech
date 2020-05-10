package org.VCERP.Education.VC.model;

import java.util.ArrayList;

public class FeesPackage {
	
	private long id;
	private String feesPackage;
	private String standard;
	private String branch;
	private String total_amt;
	private String fees_details;
	private String created_by;
	private String created_date;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getFeesPackage() {
		return feesPackage;
	}
	public void setFeesPackage(String feesPackage) {
		this.feesPackage = feesPackage;
	}
	
	public String getStandard() {
		return standard;
	}
	public void setStandard(String standard) {
		this.standard = standard;
	}
	public String getBranch() {
		return branch;
	}
	public void setBranch(String branch) {
		this.branch = branch;
	}
	public String getTotal_amt() {
		return total_amt;
	}
	public void setTotal_amt(String total_amt) {
		this.total_amt = total_amt;
	}
	
	public String getFees_details() {
		return fees_details;
	}
	public void setFees_details(String fees_details) {
		this.fees_details = fees_details;
	}
	public String getCreated_by() {
		return created_by;
	}
	public void setCreated_by(String created_by) {
		this.created_by = created_by;
	}
	public String getCreated_date() {
		return created_date;
	}
	public void setCreated_date(String created_date) {
		this.created_date = created_date;
	}
	
	

}
