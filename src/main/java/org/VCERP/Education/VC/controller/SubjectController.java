package org.VCERP.Education.VC.controller;

import java.util.ArrayList;


import org.VCERP.Education.VC.dao.SubjectDAO;
import org.VCERP.Education.VC.model.Subject;
public class SubjectController{
	
	public Subject addSubject(Subject sub) {
		SubjectDAO dao=new SubjectDAO();
		return dao.addSubject(sub);
	}
	
	public ArrayList<Subject> FetchAllSubject() {
		SubjectDAO dao=new SubjectDAO();
		return dao.FetchAllSubject();
	}
}