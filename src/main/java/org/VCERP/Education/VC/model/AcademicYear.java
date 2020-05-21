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
	
}