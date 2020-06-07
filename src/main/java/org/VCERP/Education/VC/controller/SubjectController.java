package org.VCERP.Education.VC.controller;

import java.util.ArrayList;


import org.VCERP.Education.VC.dao.SubjectDAO;
import org.VCERP.Education.VC.model.Subject;
public class SubjectController{
	
	public Subject addSubject(Subject sub) {
		SubjectDAO dao=new SubjectDAO();
		return dao.addSubject(sub);
	}
	
	public ArrayList<Subject> FetchAllSubject(String branch) {
		SubjectDAO dao=new SubjectDAO();
		return dao.FetchAllSubject(branch);
	}

	public void EditSubject(Subject sub) {
		SubjectDAO dao=new SubjectDAO();
		dao.EditSubject(sub);
	}

	public void deleteSubject(String id) {
		SubjectDAO dao=new SubjectDAO();
		dao.deleteSubject(id);
	}
}