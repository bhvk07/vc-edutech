package org.VCERP.Education.VC.controller;

import java.util.ArrayList;

import org.VCERP.Education.VC.dao.FeesTypeDAO;
import org.VCERP.Education.VC.model.FeesType;

public class FeesTypeController {

	public void addNewFeesType(FeesType type) {
		FeesTypeDAO dao=new FeesTypeDAO();
		dao.addNewFeesType(type);
		
	}

	public ArrayList<FeesType> getFeesType(String branch) {
		FeesTypeDAO dao=new FeesTypeDAO();
		return dao.getFeesType(branch);
	}

	public void EditFeesType(FeesType type) {
		FeesTypeDAO dao=new FeesTypeDAO();
		dao.EditFeesType(type);
	}

	public void deleteFeesType(String id) {
		FeesTypeDAO dao=new FeesTypeDAO();
		dao.deleteFeesType(id);
	}

}
