package org.VCERP.Education.VC.controller;

import java.util.ArrayList;

import org.VCERP.Education.VC.dao.AdmissionDAO;
import org.VCERP.Education.VC.model.Admission;
import org.VCERP.Education.VC.model.Enquiry;
import org.VCERP.Education.VC.model.Installment;
import org.VCERP.Education.VC.model.ReceiptDetails;

public class AdmissionController {

	public Admission StudentAdmission(Admission admission) {
		AdmissionDAO dao=new AdmissionDAO();
		return dao.StudentAdmission(admission);
	}
	public ArrayList<Admission> fetchAllAdmittedStudent(ArrayList<Admission> admission, String branch) {
		AdmissionDAO dao=new AdmissionDAO();
		return dao.fetchAllAdmittedStudent(admission,branch);
	}

	public Enquiry searchStudent(String enq_stud,String branch) {
		AdmissionDAO dao=new AdmissionDAO();
		return dao.searchStudent(enq_stud,branch);
		
	}
	public void updateTotalFeesPaid(String rollno, long fees_paid, long fees_remain) {
		AdmissionDAO dao=new AdmissionDAO();
		dao.updateTotalFeesPaid(rollno,fees_paid,fees_remain);
	}
	public Installment saveInstallment(Installment installment) {
		AdmissionDAO dao=new AdmissionDAO();
		return dao.saveInstallment(installment);
	}
	public Enquiry searchStudentFromAdmission(String enq_stud, String branch) {
		AdmissionDAO dao=new AdmissionDAO();
		return dao.searchStudentFromAdmission(enq_stud,branch);
	}
	public String getStandard(String fees_pack, String branch) {
		AdmissionDAO dao=new AdmissionDAO();
		return dao.getStandard(fees_pack,branch);
	}

}
