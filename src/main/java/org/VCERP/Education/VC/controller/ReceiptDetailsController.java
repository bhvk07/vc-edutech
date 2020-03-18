package org.VCERP.Education.VC.controller;

import org.VCERP.Education.VC.dao.ReceiptDetailsDAO;
import org.VCERP.Education.VC.model.ReceiptDetails;

public class ReceiptDetailsController {

	public ReceiptDetails ReceiptDetailsForm(ReceiptDetails details) {
		ReceiptDetailsDAO dao=new ReceiptDetailsDAO();
		return dao.ReceiptDetailsForm(details);	
	}

}
