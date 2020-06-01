package org.VCERP.Education.VC.controller;

import java.util.ArrayList;

import org.VCERP.Education.VC.dao.AcademicYearDAO;
import org.VCERP.Education.VC.model.AcademicYear;


public class AcademicYearController {
	public AcademicYear addAcademicYear(AcademicYear year) {
		AcademicYearDAO dao=new AcademicYearDAO();
		return dao.addAcademicYear(year);
	}
	public ArrayList<AcademicYear> AcademicList(String branch){
		AcademicYearDAO dao=new AcademicYearDAO();
		return dao.FetchAllAcademic(branch);
	}
	public AcademicYear getCurrentAcademicYear(String branch) {
		AcademicYearDAO dao=new AcademicYearDAO();
		return dao.getCurrentAcademicYear(branch);
	}
	public void updateAcademicDetails(String rollno, String invoice_no, String regno, String acad_year, String branch) {
		AcademicYearDAO dao=new AcademicYearDAO();
		dao.updateAcademicDetails(rollno,invoice_no,regno,acad_year,branch);
	}
	public AcademicYear SpecificAcademicData(String id, String branch) {
		AcademicYearDAO dao=new AcademicYearDAO();
		return dao.SpecificAcademicData(id,branch);
	}
	public void editAcademicYear(AcademicYear year) {
		AcademicYearDAO dao=new AcademicYearDAO();
		dao.editAcademicYear(year);		
	}
}