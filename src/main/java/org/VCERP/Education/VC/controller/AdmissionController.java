package org.VCERP.Education.VC.controller;

import java.util.ArrayList;

import org.VCERP.Education.VC.dao.AdmissionDAO;
import org.VCERP.Education.VC.model.Admission;
import org.VCERP.Education.VC.model.Enquiry;
import org.VCERP.Education.VC.model.ReceiptDetails;

public class AdmissionController {

	public Admission StudentAdmission(Admission admission, ReceiptDetails receipt) {
		AdmissionDAO dao=new AdmissionDAO();
		ReceiptDetailsController controller=new ReceiptDetailsController();
		controller.StudentDetails(receipt);
		return dao.StudentAdmission(admission);
	}

	public ArrayList<Enquiry> getNonAdmittedStudent(ArrayList<Enquiry> admission) {
		AdmissionDAO dao=new AdmissionDAO();
		return dao.getNonAdmittedStudent(admission);
	}

	public ArrayList<Admission> fetchAllAdmittedStudent(ArrayList<Admission> admission) {
		AdmissionDAO dao=new AdmissionDAO();
		return dao.fetchAllAdmittedStudent(admission);
	}

}
