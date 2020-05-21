package org.VCERP.Education.VC.controller;

import java.util.ArrayList;

import org.VCERP.Education.VC.dao.AcademicYearDAO;
import org.VCERP.Education.VC.model.AcademicYear;


public class AcademicYearController {
	public AcademicYear addAcademicYear(AcademicYear year) {
		AcademicYearDAO dao=new AcademicYearDAO();
		return dao.addAcademicYear(year);
	}
	public ArrayList<AcademicYear> AcademicList(){
		AcademicYearDAO dao=new AcademicYearDAO();
		return dao.FetchAllAcademic();
	}
}