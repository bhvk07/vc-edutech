package org.VCERP.Education.VC.controller;

import java.util.ArrayList;

import org.VCERP.Education.VC.dao.AdmissionDAO;
import org.VCERP.Education.VC.dao.ReceiptDetailsDAO;
import org.VCERP.Education.VC.model.Admission;
import org.VCERP.Education.VC.model.ReceiptDetails;

public class ReceiptDetailsController {

	public void StudentDetails(ReceiptDetails receipt) {
		ReceiptDetailsDAO dao=new ReceiptDetailsDAO();
		dao.StudentDetails(receipt);
	}
	
	public ReceiptDetails ReceiptDetailsForm(ReceiptDetails details) {
		ReceiptDetailsDAO dao=new ReceiptDetailsDAO();
		return dao.ReceiptDetailsForm(details);	
	}

	public Admission searchStudent(long enq_stud) {
		ReceiptDetailsDAO dao=new ReceiptDetailsDAO();
		return dao.searchStudent(enq_stud);
	}

	public ArrayList<ReceiptDetails> FetchAllReceiptDetails(ArrayList<ReceiptDetails> receipt) {
		ReceiptDetailsDAO dao=new ReceiptDetailsDAO();
		return dao.FetchAllReceiptDetails(receipt);
		
	}

	

}
