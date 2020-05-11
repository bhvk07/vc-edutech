package org.VCERP.Education.VC.controller;

import java.util.ArrayList;

import org.VCERP.Education.VC.dao.FeesPackageDAO;
import org.VCERP.Education.VC.model.FeesPackage;

public class FeesPackageController {

	public void addNewFeesPackage(FeesPackage pack) {
		FeesPackageDAO dao=new FeesPackageDAO();
		dao.addNewFeesPackage(pack);
	}

	public ArrayList<FeesPackage> getFeesPackage() {
		FeesPackageDAO dao=new FeesPackageDAO();
		return dao.getFeesPackage();
	}

}
