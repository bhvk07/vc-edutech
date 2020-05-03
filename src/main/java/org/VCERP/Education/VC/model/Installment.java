package org.VCERP.Education.VC.model;

import java.util.ArrayList;

public class Installment {

	private long id;
	private String rollno;
	private String stud_name;
	private long total_fees;
	private ArrayList<Integer> monthly_pay;
	private ArrayList<String> due_date;
	private ArrayList<String> fees_title;
	private long paid_fees;
	private ArrayList<String> paid;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getRollno() {
		return rollno;
	}
	public void setRollno(String rollno) {
		this.rollno = rollno;
	}
	public String getStud_name() {
		return stud_name;
	}
	public void setStud_name(String stud_name) {
		this.stud_name = stud_name;
	}
	public long getTotal_fees() {
		return total_fees;
	}
	public void setTotal_fees(long total_fees) {
		this.total_fees = total_fees;
	}
	public ArrayList<Integer> getMonthly_pay() {
		return monthly_pay;
	}
	public void setMonthly_pay(ArrayList<Integer> monthly_pay) {
		this.monthly_pay = monthly_pay;
	}
	public ArrayList<String> getDue_date() {
		return due_date;
	}
	public void setDue_date(ArrayList<String> due_date) {
		this.due_date = due_date;
	}
	public ArrayList<String> getFees_title() {
		return fees_title;
	}
	public void setFees_title(ArrayList<String> fees_title) {
		this.fees_title = fees_title;
	}
	
	public long getPaid_fees() {
		return paid_fees;
	}
	public void setPaid_fees(long paid_fees) {
		this.paid_fees = paid_fees;
	}
	public ArrayList<String> getPaid() {
		return paid;
	}
	public void setPaid(ArrayList<String> paid) {
		this.paid = paid;
	}
	
	
	
}
