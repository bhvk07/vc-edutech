package org.VCERP.Education.VC.controller;

import java.util.ArrayList;

import org.VCERP.Education.VC.dao.LeadSourceDAO;
import org.VCERP.Education.VC.dao.SubjectDAO;
import org.VCERP.Education.VC.model.LeadSource;
import org.VCERP.Education.VC.model.Subject;


public class LeadSourceController {
	public LeadSource addLeadSource(LeadSource lead) {
		LeadSourceDAO dao=new LeadSourceDAO();
		return dao.addLeadSource(lead);
	}
	public ArrayList<LeadSource> FetchAllSource() {
		LeadSourceDAO dao=new LeadSourceDAO();
		return dao.FetchAllSource();
	}
	
}