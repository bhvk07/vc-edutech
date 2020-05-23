package org.VCERP.Education.VC.controller;

import java.util.ArrayList;

import org.VCERP.Education.VC.dao.DivisionDAO;
import org.VCERP.Education.VC.model.Division;;


public class DivisionController {
	public Division addDivision(Division div) {
		DivisionDAO dao=new DivisionDAO();
		return dao.addDivision(div);
	}
	public ArrayList<Division> divisionList(){
		DivisionDAO dao=new DivisionDAO();
		return dao.FetchAllDivision();
	}
}