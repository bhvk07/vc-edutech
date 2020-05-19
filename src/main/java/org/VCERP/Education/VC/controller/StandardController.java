package org.VCERP.Education.VC.controller;

import java.util.ArrayList;

import org.VCERP.Education.VC.dao.StandardDAO;
import org.VCERP.Education.VC.model.Standard;

public class StandardController {

	public ArrayList<Standard> getAllStandard(String branch) {
		StandardDAO dao=new StandardDAO();
		return dao.getAllStandard(branch);
		
	}
	
	public void addStandard(Standard std, ArrayList<String> branch) {
		StandardDAO dao=new StandardDAO();
		dao.addStandard(std,branch);
		
	}

	

}
