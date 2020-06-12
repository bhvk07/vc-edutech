package org.VCERP.Education.VC.resource;

import java.util.ArrayList;
import java.util.Arrays;

import javax.annotation.security.PermitAll;
import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.VCERP.Education.VC.controller.AcademicYearController;
import org.VCERP.Education.VC.controller.AdmissionController;
import org.VCERP.Education.VC.controller.EnquiryController;
import org.VCERP.Education.VC.controller.FeesPackageController;
import org.VCERP.Education.VC.dao.AdmissionDAO;
import org.VCERP.Education.VC.model.AcademicYear;
import org.VCERP.Education.VC.model.Admission;
import org.VCERP.Education.VC.model.Enquiry;
import org.VCERP.Education.VC.model.FeesPackage;
import org.VCERP.Education.VC.model.Installment;
import org.VCERP.Education.VC.model.ReceiptDetails;
import org.VCERP.Education.VC.utility.Util;

@Path("Admission")
public class AdmissionResource {
	Admission admission = new Admission();

	@PermitAll
	@POST
	@Path("/StudentAdmission")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response StudentAdmission(@FormParam("stud_details") String student_name,
			@FormParam("enq_taken_by") String enq_taken_by, @FormParam("adm_fees_pack") String adm_fees_pack,
			@FormParam("division") String division, @FormParam("status") String status, @FormParam("date") String date,
			@FormParam("Rollno") String Rollno, @FormParam("regno") String regno,
			@FormParam("invoice_no") String invoice_no, @FormParam("admission_date") String admission_date,
			@FormParam("acad_year") String acad_year, @FormParam("join_date") String join_date,
			@FormParam("personalDetails") String personalDetails, @FormParam("feestypeDetails") String feestypeDetails,
			@FormParam("installment") String installment, @FormParam("newAmt") String newAmt,
			@FormParam("branch") String branch) {
		String[] name = Util.symbolSeperatedString(student_name);
		String[] f_pack = Util.symbolSeperatedString(adm_fees_pack);
		String[] personal = Util.commaSeperatedString(personalDetails);
		EnquiryController eqcontroller = null;
		AdmissionController controller = null;
		AcademicYearController acadcontroller = null;
		try {
			admission = new Admission();
			// admission.setId(Integer.parseInt(name[0]));
			admission.setStudent_name(personal[15]);
			admission.setFname(personal[0]);
			admission.setLname(personal[1]);
			admission.setMname(personal[2]);
			admission.setUid(personal[3]);
			admission.setDob(personal[4]);
			admission.setGender(personal[5]);
			admission.setCaste(personal[6]);
			admission.setCategory(personal[7]);
			admission.setLanguage(personal[8]);
			admission.setContact(personal[16]);
			admission.setFather_cont(personal[9]);
			System.out.println(personal[10] + " " + personal[11]);
			admission.setMother_cont(personal[10]);
			admission.setAddress(personal[11]);
			admission.setPin(personal[12]);
			admission.setEmail(personal[13]);
			admission.setW_app_no(personal[14]);
			admission.setEnq_taken_by(enq_taken_by);
			admission.setDivision(division);
			admission.setAdm_fees_pack(f_pack[0]);
			admission.setStatus(status);
			admission.setDate(date);
			admission.setRollno(Rollno);
			admission.setRegno(regno);
			admission.setInvoice_no(invoice_no);
			admission.setAdmission_date(admission_date);
			admission.setAcad_year(acad_year);
			admission.setJoin_date(join_date);
			admission.setBranch(branch);
			admission.setStandard(getStandard(f_pack[0], branch));
			admission.setFeesDetails(feestypeDetails);
			/*
			 * if(!newAmt.equals("0")) {
			 */
			// String[] commaSeperated=Util.commaSeperatedString(newAmt);

			/*
			 * for(int i=0;i<commaSeperated.length;i++) {
			 */
			// String a=commaSeperated[i];
			String[] symbolSeperated = Util.symbolSeperatedString(newAmt);

			admission.setDisccount(Integer.parseInt(symbolSeperated[0]));
			admission.setFees(Integer.parseInt(symbolSeperated[1]));
			// }

			// }
			/*
			 * else{ admission.setDisccount(0);
			 * admission.setFees(Integer.parseInt(f_pack[1])); }
			 */
			// admission.setPaid_fees(getPaidFees(installment));
			// admission.setRemain_fees(Integer.parseInt(f_pack[1])-admission.getPaid_fees());
			String[] commaSeperatedInstallment = Util.commaSeperatedString(installment);
			if (commaSeperatedInstallment.length > 2) {
				saveInstallment(commaSeperatedInstallment, branch);
			}
			controller = new AdmissionController();
			controller.StudentAdmission(admission);

			acadcontroller = new AcademicYearController();
			acadcontroller.updateAcademicDetails(Rollno, invoice_no, regno, acad_year, branch);

			eqcontroller = new EnquiryController();
			System.out.println(Long.parseLong(name[0]));
			eqcontroller.Admission(Long.parseLong(name[0]));

		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		return Util.generateErrorResponse(Status.BAD_REQUEST, "Data not save").build();
	}

	/*
	 * public int getPaidFees(String Installment){ String[]
	 * commaSeperated=Util.commaSeperatedString(Installment); String
	 * a=commaSeperated[1]; String[]
	 * symbolSeperated=Util.symbolSeperatedString(a); int
	 * paidAmt=Integer.parseInt(symbolSeperated[2]);
	 * if(commaSeperated.length>2){ saveInstallment(commaSeperated); } return
	 * paidAmt; }
	 */

	public String getStandard(String fees_pack, String branch) {
		System.out.println(fees_pack + "  " + branch);
		FeesPackage pack = new FeesPackage();
		FeesPackageController controller = new FeesPackageController();
		pack = controller.getFeesPackage(fees_pack, branch);
		return pack.getStandard();
	}

	public Response saveInstallment(String[] commaSeperated, String branch) {
		ArrayList<String> installDate = new ArrayList<>();
		ArrayList<String> fees_title = new ArrayList<>();
		ArrayList<Integer> amt = new ArrayList<>();
		for (int i = 2; i < commaSeperated.length; i++) {
			String a = commaSeperated[i];
			String[] symbolSeperated = Util.symbolSeperatedString(a);
			installDate.add(symbolSeperated[0]);
			fees_title.add(symbolSeperated[1]);
			amt.add(Integer.parseInt(symbolSeperated[2]));
		}
		AdmissionController controller = null;
		Installment installment = null;
		try {
			installment = new Installment();
			installment.setRollno(admission.getRollno());
			installment.setStud_name(admission.getStudent_name());
			installment.setTotal_fees(admission.getFees());
			installment.setMonthly_pay(amt);
			installment.setDue_date(installDate);
			installment.setFees_title(fees_title);
			controller = new AdmissionController();
			controller.saveInstallment(installment, branch);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return Util.generateErrorResponse(Status.NOT_FOUND, "Data not Save").build();
	}

	@Path("/SearchStudent")
	@GET
	@PermitAll
	@Produces(MediaType.APPLICATION_JSON)
	public Response searchStudent(@QueryParam("id") String enq_stud, @QueryParam("branch") String branch) {
		Enquiry enquiry = new Enquiry();
		AdmissionController controller = new AdmissionController();
		enquiry = controller.searchStudent(enq_stud, branch);
		FeesPackage pack = new FeesPackage();
		FeesPackageController feescontroller = new FeesPackageController();
		String[] packname = Util.symbolSeperatedString(enquiry.getFees_pack());
		pack = feescontroller.getFeesPackage(packname[0], branch);
		enquiry.setFeesPack(pack);
		if (enquiry != null) {
			return Response.status(Status.ACCEPTED).entity(enquiry).build();
		}
		return Util.generateErrorResponse(Status.NOT_FOUND, "Data not found").build();
	}

	@PermitAll
	@GET
	@Path("/FetchAllAdmittedStudent")
	@Produces(MediaType.APPLICATION_JSON)
	public Response fetchAllAdmittedStudent(@QueryParam("branch") String branch) {
		ArrayList<Admission> admission = null;
		AdmissionController controller = null;
		try {
			admission = new ArrayList<>();
			controller = new AdmissionController();
			controller.fetchAllAdmittedStudent(admission, branch);
			return Response.status(Status.ACCEPTED).entity(admission).build();
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		return Util.generateErrorResponse(Status.NOT_FOUND, "Data not found").build();
	}

	@PermitAll
	@GET
	@Path("/getAutoIncrementedDetails")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAutoIncrementedDetails(@QueryParam("branch") String branch) {

		try {
			AcademicYear acad = new AcademicYear();
			AcademicYearController controller = new AcademicYearController();
			acad = controller.getCurrentAcademicYear(branch);
			return Response.status(Status.ACCEPTED).entity(acad).build();
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		return Util.generateErrorResponse(Status.NOT_FOUND, "Data not found").build();
	}

	@Path("/getPromotionData")
	@POST
	@PermitAll
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response getPromotionData(@FormParam("acad_year") String acad_year, @FormParam("standard") String standard,
			@FormParam("division") String division, @FormParam("selectedStatus") String status,
			@FormParam("branch") String branch) {
		Admission admission = new Admission();
		ArrayList<Admission> promotion = new ArrayList<>();
		AdmissionController controller = new AdmissionController();
		admission.setAcad_year(acad_year);
		admission.setStandard(standard);
		admission.setDivision(division);
		admission.setStatus(status);
		admission.setBranch(branch);
		promotion = controller.getPromotionData(admission);
		if (promotion != null) {
			return Response.status(Status.ACCEPTED).entity(promotion).build();
		}
		return Util.generateErrorResponse(Status.NOT_FOUND, "Data not found").build();
	}

	@Path("/StudentPromotion")
	@POST
	@PermitAll
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response StudentPromotion(@FormParam("fees") String fees, @FormParam("student_status") String status,
			@FormParam("acad_year") String acad_year, @FormParam("division") String division,
			@FormParam("admission_date") String admission_date, @FormParam("id") String id,
			@FormParam("user") String enq_taken, @FormParam("branch") String branch) {
		Admission enq = new Admission();
		AcademicYear year = new AcademicYear();
		AcademicYearController yearController = new AcademicYearController();
		AdmissionDAO dao = new AdmissionDAO();
		FeesPackage pack = new FeesPackage();
		FeesPackageController controller = new FeesPackageController();
		String[] commaSeperatedId = Util.commaSeperatedString(id);
		for (int i = 0; i < commaSeperatedId.length; i++) {
			String[] symbolSeperatedFees = Util.symbolSeperatedString(fees);
			pack = controller.getFeesPackage(symbolSeperatedFees[0], branch);
			String feesdetails = pack.getFees_details();
			enq = dao.searchStudentFromAdmission(commaSeperatedId[i], branch);
			String personalDetails = enq.getFname() + "," + enq.getLname() + "," + enq.getMname() + "," + enq.getUid()
					+ "," + enq.getDob() + "," + enq.getGender() + "," + enq.getCaste() + "," + enq.getCategory() + ","
					+ enq.getLanguage() + "," + enq.getFather_cont() + "," + enq.getMother_cont() + ","
					+ enq.getAddress() + "," + enq.getPin() + "," + enq.getEmail() + "," + enq.getW_app_no() + ","
					+ enq.getStudent_name() + "," + enq.getContact();
			String stud_details = enq.getId() + "|" + enq.getStudent_name() + " " + enq.getFname() + " "
					+ enq.getLname() + "|" + enq.getContact() + "|" + enq.getStatus();
			year = yearController.getCurrentAcademicYear(branch);
			String studId = year.getId_prefix() + "-" + year.getId_no();
			String regno = year.getReg_prefix() + "-" + year.getRegistration();
			String invoice = year.getInvoice_prefix() + "-" + year.getInvoice();
			yearController.updateAcademicDetails(studId, invoice, regno, acad_year, branch);
			String installment = "installment details,0|ActivityFees|0";
			int disc = 0;
			String[] commaSeperatedFeesDetails = Util.commaSeperatedString(feesdetails);
			for (int j = 0; j < commaSeperatedFeesDetails.length; j++) {
				String[] getdiscount = Util.symbolSeperatedString(commaSeperatedFeesDetails[j]);
				disc = disc + Integer.parseInt(getdiscount[2]);
			}
			String newamt = disc + "|" + symbolSeperatedFees[1];
			StudentAdmission(stud_details, enq_taken, fees, division, status, admission_date, studId, regno, invoice,
					admission_date, acad_year, admission_date, personalDetails, feesdetails, installment, newamt,
					branch);
		}
		return Util.generateErrorResponse(Status.NOT_FOUND, "Data not found").build();
	}

	@PermitAll
	@GET
	@Path("/getAdmissionDetailsOfSpecificStudent")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAdmissionDetailsOfSpecificStudent(@QueryParam("id") String id,
			@QueryParam("branch") String branch) {

		try {
			Admission admission = new Admission();
			AdmissionController controller = new AdmissionController();
			admission = controller.searchStudentFromAdmission(id, branch);
			Installment installment = controller.getInstallment(admission.getRollno(), branch);
			admission.setInstallment(installment);
			return Response.status(Status.ACCEPTED).entity(admission).build();
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		return Util.generateErrorResponse(Status.NOT_FOUND, "Data not found").build();
	}

	@PermitAll
	@POST
	@Path("/AdmissionReport")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	@Produces(MediaType.APPLICATION_JSON)
	public Response AdmissionReport(@FormParam("from_date") String from_date, @FormParam("to_date") String to_date,
			@FormParam("adm_taken_by") String adm_taken_by, @FormParam("package") String fees_package,
			@FormParam("division") String division, @FormParam("acad_year") String acad_year,
			@FormParam("standard") String standard, @FormParam("branch") String branch) {
		String[] commaSeperatedTaken = Util.commaSeperatedString(adm_taken_by);
		String[] commaSeperatedPackage = Util.commaSeperatedString(fees_package);
		String[] commaSeperatedStandard = Util.commaSeperatedString(standard);
		String[] commaSeperatedDivision = Util.commaSeperatedString(division);
		AdmissionController controller = new AdmissionController();
		Admission admissionData=new Admission();
		ArrayList<Admission> admissionReportData=new ArrayList<>();
		try {
			for(int i=0;i<commaSeperatedTaken.length;i++){
				for(int j=0;j<commaSeperatedPackage.length;j++){
					for(int k=0;k<commaSeperatedStandard.length;k++){
						for(int l=0;l<commaSeperatedDivision.length;l++){
							Admission admission=new Admission();
							admission.setEnq_taken_by(commaSeperatedTaken[i]);
							admission.setAdm_fees_pack(commaSeperatedPackage[j]);
							admission.setStandard(commaSeperatedStandard[k]);
							admission.setDivision(commaSeperatedDivision[l]);
							admission.setFrom_date(from_date);
							admission.setTo_date(to_date);
							admission.setAcad_year(acad_year);
							admission.setBranch(branch);
							admissionReportData=controller.AdmissionReport(admission,admissionReportData);
						}
					}
				}
			}
			if(admissionReportData!=null){
				return Response.status(Status.ACCEPTED).entity(admissionReportData).build();	
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		return Util.generateErrorResponse(Status.NOT_FOUND, "Data not found").build();
	}
}
