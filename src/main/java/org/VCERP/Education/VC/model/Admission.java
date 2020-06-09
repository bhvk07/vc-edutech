package org.VCERP.Education.VC.model;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
public class Admission {

	private long id;
	private String student_name;
	private String lname;
	private String fname;
	private String mname;
	private String uid;
	private String dob;
	private String gender;
	private String caste;
	private String category;
	private String language;
	private String contact;
	private String father_cont;
	private String mother_cont;
	private String address;
	private String pin;
	private String email;
	private String w_app_no;
	private String enq_taken_by;
	private String adm_fees_pack;
	private String status;
	private String date;
	private String Rollno;
	private String regno;
	private String standard;
	private String division;
	private String invoice_no;
	private String admission_date;
	private String acad_year;
	private String join_date;
	private String feesDetails;
	private long fees;
	private long disccount;
	private long paid_fees;
	private long remain_fees;
	private String created_date;
	private String Branch;
	private Installment installment;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getStudent_name() {
		return student_name;
	}
	public void setStudent_name(String student_name) {
		this.student_name = student_name;
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
	public String getEnq_taken_by() {
		return enq_taken_by;
	}
	public void setEnq_taken_by(String enq_taken_by) {
		this.enq_taken_by = enq_taken_by;
	}
	public String getAdm_fees_pack() {
		return adm_fees_pack;
	}
	public void setAdm_fees_pack(String adm_fees_pack) {
		this.adm_fees_pack = adm_fees_pack;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getRollno() {
		return Rollno;
	}
	public void setRollno(String rollno) {
		Rollno = rollno;
	}
	public String getRegno() {
		return regno;
	}
	public void setRegno(String regno) {
		this.regno = regno;
	}
	public String getInvoice_no() {
		return invoice_no;
	}
	public void setInvoice_no(String invoice_no) {
		this.invoice_no = invoice_no;
	}
	public String getAdmission_date() {
		return admission_date;
	}
	public void setAdmission_date(String admission_date) {
		this.admission_date = admission_date;
	}
	public String getAcad_year() {
		return acad_year;
	}
	public void setAcad_year(String acad_year) {
		this.acad_year = acad_year;
	}
	public String getJoin_date() {
		return join_date;
	}
	public void setJoin_date(String join_date) {
		this.join_date = join_date;
	}
	public long getFees() {
		return fees;
	}
	public void setFees(long fees) {
		this.fees = fees;
	}
	public String getContact() {
		return contact;
	}
	public void setContact(String contact) {
		this.contact = contact;
	}
	
	public long getDisccount() {
		return disccount;
	}
	public void setDisccount(long disccount) {
		this.disccount = disccount;
	}
	public long getPaid_fees() {
		return paid_fees;
	}
	public void setPaid_fees(long paid_fees) {
		this.paid_fees = paid_fees;
	}
	public long getRemain_fees() {
		return remain_fees;
	}
	public void setRemain_fees(long remain_fees) {
		this.remain_fees = remain_fees;
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
	public String getLanguage() {
		return language;
	}
	public void setLanguage(String language) {
		this.language = language;
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
	public String getCreated_date() {
		return created_date;
	}
	public void setCreated_date(String created_date) {
		this.created_date = created_date;
	}
	public String getBranch() {
		return Branch;
	}
	public void setBranch(String branch) {
		Branch = branch;
	}
	public String getStandard() {
		return standard;
	}
	public void setStandard(String standard) {
		this.standard = standard;
	}
	public Installment getInstallment() {
		return installment;
	}
	public void setInstallment(Installment installment) {
		this.installment = installment;
	}
	public String getDivision() {
		return division;
	}
	public void setDivision(String division) {
		this.division = division;
	}
	public String getFeesDetails() {
		return feesDetails;
	}
	public void setFeesDetails(String feesDetails) {
		this.feesDetails = feesDetails;
	}
	
	
}
