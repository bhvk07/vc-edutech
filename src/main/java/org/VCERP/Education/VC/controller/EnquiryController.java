package org.VCERP.Education.VC.controller;

import java.util.ArrayList;

import org.VCERP.Education.VC.dao.EnquiryDAO;
import org.VCERP.Education.VC.model.Enquiry;

public class EnquiryController {

	public Enquiry EnquiryData(Enquiry enquiry) {
		EnquiryDAO dao=new EnquiryDAO();
		return dao.EnquiryData(enquiry);		
	}

	public ArrayList<Enquiry> FetchAllEnquiryData() {
		EnquiryDAO dao=new EnquiryDAO();
		return dao.FetchAllEnquiryData();
	}

}
