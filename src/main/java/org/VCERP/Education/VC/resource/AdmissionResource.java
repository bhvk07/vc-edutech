package org.VCERP.Education.VC.resource;

import java.util.ArrayList;

import javax.annotation.security.PermitAll;
import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.VCERP.Education.VC.controller.AdmissionController;
import org.VCERP.Education.VC.model.Admission;
import org.VCERP.Education.VC.model.Enquiry;
import org.VCERP.Education.VC.model.ReceiptDetails;
import org.VCERP.Education.VC.utility.Util;


@Path("Admission") 
public class AdmissionResource {
	
	@PermitAll
	@POST
	@Path("/StudentAdmission")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)	
	public Response StudentAdmission(@FormParam("student_name") String student_name,
			@FormParam("enq_taken_by") String enq_taken_by,@FormParam("adm_fees_pack") String adm_fees_pack,
			@FormParam("status") String status,@FormParam("date") String date,
			@FormParam("Rollno") String Rollno,@FormParam("regno") String regno,
			@FormParam("invoice_no") String invoice_no,@FormParam("admission_date") String admission_date,
			@FormParam("acad_year") String acad_year,@FormParam("join_date") String join_date)
	{
		Admission admission=null;
		ReceiptDetails receipt=null;
		AdmissionController controller=null;
		try {
			admission=new Admission();
			admission.setStudent_name(student_name);
			admission.setEnq_taken_by(enq_taken_by);
			admission.setAdm_fees_pack(adm_fees_pack);
			admission.setStatus(status);
			admission.setDate(date);
			admission.setRollno(Rollno);
			admission.setRegno(regno);
			admission.setInvoice_no(invoice_no);
			admission.setAdmission_date(admission_date);
			admission.setAcad_year(acad_year);
			admission.setJoin_date(join_date);
			
			receipt=new ReceiptDetails();
			receipt.setStud_name(student_name);
			
			controller=new AdmissionController();
			controller.StudentAdmission(admission,receipt);
			
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		return Util.generateErrorResponse(Status.BAD_REQUEST, "Data not save").build();
	}
	
	@PermitAll
	@GET
	@Path("/NonAdmittedStudent")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getNonAdmittedStudent(){
		ArrayList<Enquiry> admission=null;
		AdmissionController controller=null;
		try {
			admission=new ArrayList<>();
			controller=new AdmissionController();
			controller.getNonAdmittedStudent(admission);
			return Response.status(Status.ACCEPTED).entity(admission).build();
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		return Util.generateErrorResponse(Status.NOT_FOUND, "Data not found").build();
	}
	
	@PermitAll
	@GET
	@Path("/FetchAllAdmittedStudent")
	@Produces(MediaType.APPLICATION_JSON)
	public Response fetchAllAdmittedStudent(){
		ArrayList<Admission> admission=null;
		AdmissionController controller=null;
		try {
			admission=new ArrayList<>();
			controller=new AdmissionController();
			controller.fetchAllAdmittedStudent(admission);
			return Response.status(Status.ACCEPTED).entity(admission).build();
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		return Util.generateErrorResponse(Status.NOT_FOUND, "Data not found").build();
	}
}
