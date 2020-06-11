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

	public Admission searchStudent(String enq_stud, String branch) {
		ReceiptDetailsDAO dao=new ReceiptDetailsDAO();
		return dao.searchStudent(enq_stud,branch);
	}

	public ArrayList<ReceiptDetails> FetchAllReceiptDetails(String branch) {
		ReceiptDetailsDAO dao=new ReceiptDetailsDAO();
		return dao.FetchAllReceiptDetails(branch);
		
	}

	public ReceiptDetails updateRemainingAmount(String id) {
		ReceiptDetailsDAO dao=new ReceiptDetailsDAO();
		return dao.updateRemainingAmount(id);
		
	}

	public long calculateTotalFeesPaid(String rollno, String name) {
		ReceiptDetailsDAO dao=new ReceiptDetailsDAO();
		return dao.calculateTotalFeesPaid(rollno,name);
	}

	public ArrayList<ReceiptDetails> getReceiptAdmissionData(long rollno, String receiptno) {
		ReceiptDetailsDAO dao=new ReceiptDetailsDAO();
		return dao.getReceiptAdmissionData(rollno,receiptno);
	}
	
	public ArrayList<ReceiptDetails> getStudReceiptList(long rno){
		ReceiptDetailsDAO dao=new ReceiptDetailsDAO();
		return dao.getStudReceiptList(rno);
	}

	public void updateInstallment(String rollno, String due_date, String branch, long received_amt) {
		ReceiptDetailsDAO dao=new ReceiptDetailsDAO();
		dao.updateInstallment(rollno,due_date,branch,received_amt);
	}

	public ArrayList<ReceiptDetails> ReceiptReport(ReceiptDetails receipt, Admission admission,ArrayList<ReceiptDetails> receiptReportData) {
		ReceiptDetailsDAO dao=new ReceiptDetailsDAO();
		return dao.ReceiptReport(receipt,admission,receiptReportData);
	}

}
