package org.VCERP.Education.VC.controller;

import java.util.ArrayList;

import org.VCERP.Education.VC.dao.CasteDAO;
import org.VCERP.Education.VC.dao.FeesTypeDAO;
import org.VCERP.Education.VC.model.Caste;
import org.VCERP.Education.VC.model.FeesType;

public class CasteController {

	public void addNewCaste(Caste caste) {
		CasteDAO dao=new CasteDAO();
		dao.addNewCaste(caste);
		
	}

	public ArrayList<Caste> getCaste(String branch) {
		CasteDAO dao=new CasteDAO();
		return dao.getCaste(branch);
	}

	public void EditCaste(Caste caste) {
		CasteDAO dao=new CasteDAO();
		dao.EditCaste(caste);
	}

	public void deleteCaste(String id) {
		CasteDAO dao=new CasteDAO();
		dao.deleteCaste(id);
	}
}
