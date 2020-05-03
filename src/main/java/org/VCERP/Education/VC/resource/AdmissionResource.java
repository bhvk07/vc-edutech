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

import org.VCERP.Education.VC.controller.AdmissionController;
import org.VCERP.Education.VC.controller.EnquiryController;
import org.VCERP.Education.VC.model.Admission;
import org.VCERP.Education.VC.model.Enquiry;
import org.VCERP.Education.VC.model.Installment;
import org.VCERP.Education.VC.model.ReceiptDetails;
import org.VCERP.Education.VC.utility.Util;


@Path("Admission") 
public class AdmissionResource {
	Admission admission=new Admission();
	@PermitAll
	@POST
	@Path("/StudentAdmission")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)	
	public Response StudentAdmission(@FormParam("stud_details") String student_name,
			@FormParam("enq_taken_by") String enq_taken_by,@FormParam("adm_fees_pack") String adm_fees_pack,
			@FormParam("status") String status,@FormParam("date") String date,
			@FormParam("Rollno") String Rollno,@FormParam("regno") String regno,
			@FormParam("invoice_no") String invoice_no,@FormParam("admission_date") String admission_date,
			@FormParam("acad_year") String acad_year,@FormParam("join_date") String join_date,
			@FormParam("installment") String installment,@FormParam("newAmt") String newAmt)
	{
		String[] name=Util.symbolSeperatedString(student_name);
		String[] f_pack=Util.symbolSeperatedString(adm_fees_pack);
		EnquiryController eqcontroller=null;
		AdmissionController controller=null;
		try {
			admission=new Admission();
			admission.setId(Integer.parseInt(name[0]));
			admission.setStudent_name(name[1]);
			admission.setContact(name[2]);
			admission.setEnq_taken_by(enq_taken_by);
			admission.setAdm_fees_pack(f_pack[0]);
			admission.setStatus(status);
			admission.setDate(date);
			admission.setRollno(Rollno);
			admission.setRegno(regno);
			admission.setInvoice_no(invoice_no);
			admission.setAdmission_date(admission_date);
			admission.setAcad_year(acad_year);
			admission.setJoin_date(join_date);

			if(!newAmt.equals("0"))
			{
				String[] commaSeperated=Util.commaSeperatedString(newAmt);
				
				for(int i=1;i<commaSeperated.length;i++)
				{	String a=commaSeperated[i];
					String[] symbolSeperated=Util.symbolSeperatedString(a);
					
					admission.setDisccount(Integer.parseInt(symbolSeperated[0]));
					admission.setFees(Integer.parseInt(symbolSeperated[1]));
				}
				
			}
			else{
				admission.setDisccount(0);
				admission.setFees(Integer.parseInt(f_pack[1]));
			}
//			admission.setPaid_fees(getPaidFees(installment));
//			admission.setRemain_fees(Integer.parseInt(f_pack[1])-admission.getPaid_fees());
			String[] commaSeperated=Util.commaSeperatedString(installment);
			if(commaSeperated.length>2){
				saveInstallment(commaSeperated);
			}
			controller=new AdmissionController();
			controller.StudentAdmission(admission);
			
			eqcontroller=new EnquiryController();
			eqcontroller.Admission(Long.parseLong(name[0]));
			
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		return Util.generateErrorResponse(Status.BAD_REQUEST, "Data not save").build();
	}
	
	/*public int getPaidFees(String Installment){
		String[] commaSeperated=Util.commaSeperatedString(Installment);
		String a=commaSeperated[1];
		String[] symbolSeperated=Util.symbolSeperatedString(a);
		int paidAmt=Integer.parseInt(symbolSeperated[2]);
		if(commaSeperated.length>2){
		saveInstallment(commaSeperated);
		}
		return paidAmt;
	}*/
	public Response saveInstallment(String[] commaSeperated){
		ArrayList<String> installDate=new ArrayList<>();
		ArrayList<String> fees_title=new ArrayList<>();
		ArrayList<Integer> amt=new ArrayList<>();
		for(int i=2;i<commaSeperated.length;i++){
			String a=commaSeperated[i];
			String[] symbolSeperated=Util.symbolSeperatedString(a);
			installDate.add(symbolSeperated[0]);
			fees_title.add(symbolSeperated[1]);
			amt.add(Integer.parseInt(symbolSeperated[2]));
		}
		AdmissionController controller=null;
		Installment installment=null;
		try {
			installment=new Installment();
			installment.setRollno(admission.getRollno());
			installment.setStud_name(admission.getStudent_name());
			installment.setTotal_fees(admission.getFees());
			installment.setMonthly_pay(amt);
			installment.setDue_date(installDate);
			installment.setFees_title(fees_title);
			controller=new AdmissionController();
			controller.saveInstallment(installment);	
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return Util.generateErrorResponse(Status.NOT_FOUND, "Data not Save").build();
	}
	
	@Path("/SearchStudent")
	@GET
	@PermitAll
	@Produces(MediaType.APPLICATION_JSON)
	public Response searchStudent(@QueryParam("id") long enq_stud){
		System.out.println(enq_stud);
		 Enquiry enquiry=new Enquiry();
			AdmissionController controller=new AdmissionController();
			enquiry=controller.searchStudent(enq_stud);
			if(enquiry!=null)
			{
				return Response.status(Status.ACCEPTED).entity(enquiry).build();
			}
			else{
				return Util.generateErrorResponse(Status.NOT_FOUND, "Data not found").build();
			}
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
