package org.VCERP.Education.VC.controller;

import java.util.ArrayList;

import org.VCERP.Education.VC.dao.DesignationDAO;
import org.VCERP.Education.VC.model.Designation;

public class DesignationController {

	public Designation addDesignation(Designation des) {
		DesignationDAO dao = new DesignationDAO();
		return dao.addDesignation(des);
	}
	
	  public ArrayList<Designation> FetchAllDesignation(String branch)
	  { 
		  DesignationDAO dao=new DesignationDAO(); 
	  return dao.FetchAllDesignation(branch); 
	  }
	 
	  public void EditDesignation(Designation des)
	  { 
		 DesignationDAO dao=new DesignationDAO();
	  dao.EditDesignation(des); 
	  }
	  	     
	  public void deleteDesignation(String id) {
		  DesignationDAO dao=new DesignationDAO();
	  dao.deleteDesignation(id);
	  }
	 
}