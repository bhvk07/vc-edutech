package org.VCERP.Education.VC.controller;

import java.util.ArrayList;

import org.VCERP.Education.VC.dao.FeesTypeDAO;
import org.VCERP.Education.VC.model.FeesType;

public class FeesTypeController {

	public void addNewFeesType(FeesType type) {
		FeesTypeDAO dao=new FeesTypeDAO();
		dao.addNewFeesType(type);
		
	}

	public ArrayList<FeesType> getFeesType() {
		FeesTypeDAO dao=new FeesTypeDAO();
		return dao.getFeesType();
	}

}
