package org.VCERP.Education.VC.model;

import javax.ws.rs.FormParam;

public class Branch {

	private long id;
	
	@FormParam("branch")
	private String Branch;
	
	@FormParam("instituteType")
	private String InstituteType;
	
	@FormParam("title")
	private String Title;
	
	@FormParam("subTitle")
	private String SubTitle;
	
	@FormParam("branchCode")
	private String BranchCode;
	
	@FormParam("address")
	private String Address;
	
	@FormParam("email")
	private String Email;
	
	@FormParam("contact")
	private String Contact;
	
	@FormParam("telno")
	private String Telno;
	
	@FormParam("GSTIN")
	private String GSTIN;
	
	@FormParam("panNo")
	private String PanNo;
	
	@FormParam("country")
	private String Country;
	
	@FormParam("state")
	private String State;
	
	@FormParam("distinct")
	private String Distinct;
	
	@FormParam("tehsil")
	private String Tehsil;
	
	@FormParam("createdBy")
	private String CreatedBy;
	
	private String Created_Date;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getBranch() {
		return Branch;
	}
	public void setBranch(String branch) {
		Branch = branch;
	}
	public String getInstituteType() {
		return InstituteType;
	}
	public void setInstituteType(String instituteType) {
		InstituteType = instituteType;
	}
	public String getTitle() {
		return Title;
	}
	public void setTitle(String title) {
		Title = title;
	}
	public String getSubTitle() {
		return SubTitle;
	}
	public void setSubTitle(String subTitle) {
		SubTitle = subTitle;
	}
	public String getBranchCode() {
		return BranchCode;
	}
	public void setBranchCode(String branchCode) {
		BranchCode = branchCode;
	}
	public String getAddress() {
		return Address;
	}
	public void setAddress(String address) {
		Address = address;
	}
	public String getEmail() {
		return Email;
	}
	public void setEmail(String email) {
		Email = email;
	}
	public String getContact() {
		return Contact;
	}
	public void setContact(String contact) {
		Contact = contact;
	}
	public String getTelno() {
		return Telno;
	}
	public void setTelno(String telno) {
		Telno = telno;
	}
	public String getGSTIN() {
		return GSTIN;
	}
	public void setGSTIN(String gSTIN) {
		GSTIN = gSTIN;
	}
	public String getPanNo() {
		return PanNo;
	}
	public void setPanNo(String panNo) {
		PanNo = panNo;
	}
	public String getCountry() {
		return Country;
	}
	public void setCountry(String country) {
		Country = country;
	}
	public String getState() {
		return State;
	}
	public void setState(String state) {
		State = state;
	}
	public String getDistinct() {
		return Distinct;
	}
	public void setDistinct(String distinct) {
		Distinct = distinct;
	}
	public String getTehsil() {
		return Tehsil;
	}
	public void setTehsil(String tehsil) {
		Tehsil = tehsil;
	}
	public String getCreatedBy() {
		return CreatedBy;
	}
	public void setCreatedBy(String createdBy) {
		CreatedBy = createdBy;
	}
	public String getCreated_Date() {
		return Created_Date;
	}
	public void setCreated_Date(String created_Date) {
		Created_Date = created_Date;
	}
	
	
}
