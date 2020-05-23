package org.VCERP.Education.VC.model;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)

public class AcademicYear{
	private long id;
	private String created_date;
	private String aca_year;
	private String start_date;
	private String end_date;
	private String id_prefix;
	private String id_no;
	private String invoice_prefix;
	private String invoice;
	private String reg_prefix;
	private String registration;
	private String branch;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getCreated_date() {
		return created_date;
	}
	public void setCreated_date(String created_date) {
		this.created_date = created_date;
	}
	public String getAca_year() {
		return aca_year;
	}
	public void setAca_year(String aca_year) {
		this.aca_year = aca_year;
	}
	public String getStart_date() {
		return start_date;
	}
	public void setStart_date(String start_date) {
		this.start_date = start_date;
	}
	public String getEnd_date() {
		return end_date;
	}
	public void setEnd_date(String end_date) {
		this.end_date = end_date;
	}
	public String getId_prefix() {
		return id_prefix;
	}
	public void setId_prefix(String id_prefix) {
		this.id_prefix = id_prefix;
	}
	public String getId_no() {
		return id_no;
	}
	public void setId_no(String id_no) {
		this.id_no = id_no;
	}
	public String getInvoice_prefix() {
		return invoice_prefix;
	}
	public void setInvoice_prefix(String invoice_prefix) {
		this.invoice_prefix = invoice_prefix;
	}
	public String getInvoice() {
		return invoice;
	}
	public void setInvoice(String invoice) {
		this.invoice = invoice;
	}
	public String getReg_prefix() {
		return reg_prefix;
	}
	public void setReg_prefix(String reg_prefix) {
		this.reg_prefix = reg_prefix;
	}
	public String getRegistration() {
		return registration;
	}
	public void setRegistration(String registration) {
		this.registration = registration;
	}
	public String getBranch() {
		return branch;
	}
	public void setBranch(String branch) {
		this.branch = branch;
	}
	
}