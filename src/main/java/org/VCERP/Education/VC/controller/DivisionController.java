package org.VCERP.Education.VC.controller;

import java.util.ArrayList;

import org.VCERP.Education.VC.dao.DivisionDAO;
import org.VCERP.Education.VC.model.Division;;


public class DivisionController {
	public Division addDivision(Division div) {
		DivisionDAO dao=new DivisionDAO();
		return dao.addDivision(div);
	}
	public ArrayList<Division> divisionList(String branch){
		DivisionDAO dao=new DivisionDAO();
		return dao.FetchAllDivision(branch);
	}
	/*public Division GetDivision(String id) {
		DivisionDAO dao=new DivisionDAO();
		return dao.GetDivision(id);
	}*/
	public void EditDivision(Division div) {
		DivisionDAO dao=new DivisionDAO();
		dao.EditDivision(div);
		
	}
}