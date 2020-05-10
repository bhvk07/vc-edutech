package org.VCERP.Education.VC.controller;

import org.VCERP.Education.VC.dao.FeesPackageDAO;
import org.VCERP.Education.VC.model.FeesPackage;

public class FeesPackageController {

	public void addaddNewFeesPackage(FeesPackage pack) {
		FeesPackageDAO dao=new FeesPackageDAO();
		dao.addNewFeesPackage(pack);
	}

}
