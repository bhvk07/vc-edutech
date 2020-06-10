package org.VCERP.Education.VC.controller;

import java.util.ArrayList;

import org.VCERP.Education.VC.dao.EnquiryDAO;
import org.VCERP.Education.VC.model.Enquiry;

public class EnquiryController {

	public Enquiry EnquiryData(Enquiry enquiry) {
		EnquiryDAO dao=new EnquiryDAO();
		return dao.EnquiryData(enquiry);		
	}

	public ArrayList<Enquiry> FetchAllEnquiryData(String branch) {
		EnquiryDAO dao=new EnquiryDAO();
		return dao.FetchAllEnquiryData(branch);
	}

	 public void DeleteEnquiryData(String id) {
		  EnquiryDAO dao=new EnquiryDAO();
		  dao.DeleteEnquiryData(id);
	}

	public void DeleteMultipleEnquiryData(Long id) {
		EnquiryDAO dao=new EnquiryDAO();
		dao.DeleteMultipleEnquiryData(id);
	}

	public void Admission(long id) {
		EnquiryDAO dao=new EnquiryDAO();
		dao.Admission(id);	
	}

	public void EditEnquiryData(Enquiry enquiry) {
		EnquiryDAO dao=new EnquiryDAO();
		dao.EditEnquiryData(enquiry);
	}

	public Enquiry EnquiryReport(Enquiry enquiry) {
		EnquiryDAO dao=new EnquiryDAO();
		return dao.EnquiryReport(enquiry);
	}

}
