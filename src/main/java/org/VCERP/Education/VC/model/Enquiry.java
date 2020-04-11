package org.VCERP.Education.VC.model;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.ws.rs.FormParam;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
public class Enquiry {
	
	private long id;
	
	@NotNull(message="student name must not be null.")
	@NotBlank(message="student name must not be Blank.")
	@FormParam("sname")
	private String sname;
	
	@FormParam("lname")
	private String lname;
	
	@FormParam("fname")
	private String fname;
	
	@FormParam("mname")
	private String mname;
	
	@FormParam("uid")
	private String uid;
	
	@FormParam("dob")
	private String dob;
	
	@FormParam("gender")
	private String gender;
	
	@FormParam("caste")
	private String caste;
	
	@FormParam("category")
	private String category;
	
	@FormParam("lang")
	private String lang;
	
	@FormParam("stud_cont")
	private String stud_cont;
	
	@FormParam("father_cont")
	private String father_cont;
	
	@FormParam("mother_cont")
	private String mother_cont;
	
	@FormParam("address")
	private String address;
	
	@FormParam("pin")
	private String pin;
	
	@Email(message="valid form")
	@FormParam("email")
	private String email;
	
	@FormParam("w_app_no")
	private String w_app_no;
	
	@FormParam("enq_date")
	private String enq_date;
	
	@FormParam("enq_no")
	private String enq_no;
	
	@FormParam("enq_taken_by")
	private String enq_taken_by;
	
	@FormParam("fees_pack")
	private String fees_pack;
	
	@FormParam("lead_source")
	private String lead_source;
	
	@FormParam("remark")
	private String remark;
	
	private String status;
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getSname() {
		return sname;
	}
	public void setSname(String sname) {
		this.sname = sname;
	}
	public String getLname() {
		return lname;
	}
	public void setLname(String lname) {
		this.lname = lname;
	}
	public String getFname() {
		return fname;
	}
	public void setFname(String fname) {
		this.fname = fname;
	}
	public String getMname() {
		return mname;
	}
	public void setMname(String mname) {
		this.mname = mname;
	}
	public String getUid() {
		return uid;
	}
	public void setUid(String uid) {
		this.uid = uid;
	}
	public String getDob() {
		return dob;
	}
	public void setDob(String dob) {
		this.dob = dob;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getCaste() {
		return caste;
	}
	public void setCaste(String caste) {
		this.caste = caste;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getLang() {
		return lang;
	}
	public void setLang(String lang) {
		this.lang = lang;
	}
	public String getStud_cont() {
		return stud_cont;
	}
	public void setStud_cont(String stud_cont) {
		this.stud_cont = stud_cont;
	}
	public String getFather_cont() {
		return father_cont;
	}
	public void setFather_cont(String father_cont) {
		this.father_cont = father_cont;
	}
	public String getMother_cont() {
		return mother_cont;
	}
	public void setMother_cont(String mother_cont) {
		this.mother_cont = mother_cont;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getPin() {
		return pin;
	}
	public void setPin(String pin) {
		this.pin = pin;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getW_app_no() {
		return w_app_no;
	}
	public void setW_app_no(String w_app_no) {
		this.w_app_no = w_app_no;
	}
	public String getEnq_date() {
		return enq_date;
	}
	public void setEnq_date(String enq_date) {
		this.enq_date = enq_date;
	}
	public String getEnq_no() {
		return enq_no;
	}
	public void setEnq_no(String enq_no) {
		this.enq_no = enq_no;
	}
	public String getEnq_taken_by() {
		return enq_taken_by;
	}
	public void setEnq_taken_by(String enq_taken_by) {
		this.enq_taken_by = enq_taken_by;
	}
	public String getFees_pack() {
		return fees_pack;
	}
	public void setFees_pack(String fees_pack) {
		this.fees_pack = fees_pack;
	}
	public String getLead_source() {
		return lead_source;
	}
	public void setLead_source(String lead_source) {
		this.lead_source = lead_source;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
	

}
