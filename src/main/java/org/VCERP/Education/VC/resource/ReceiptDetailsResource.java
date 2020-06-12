package org.VCERP.Education.VC.resource;

import java.util.ArrayList;

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
import org.VCERP.Education.VC.controller.ReceiptDetailsController;
import org.VCERP.Education.VC.model.Admission;
import org.VCERP.Education.VC.model.Enquiry;
import org.VCERP.Education.VC.model.Installment;
import org.VCERP.Education.VC.model.ReceiptDetails;
import org.VCERP.Education.VC.utility.Util;

@Path("Receipt")
public class ReceiptDetailsResource {
	
	@Path("/SearchStudent")
	@GET
	@PermitAll
	@Produces(MediaType.APPLICATION_JSON)
	public Response searchStudent(@QueryParam("id") String enq_stud,@QueryParam("branch") String branch){
		 Admission admission=new Admission();
			ReceiptDetailsController controller=new ReceiptDetailsController();
			admission=controller.searchStudent(enq_stud,branch);
			if(admission!=null)
			{
				return Response.status(Status.ACCEPTED).entity(admission).build();
			}
			else{
				return Util.generateErrorResponse(Status.NOT_FOUND, "Data not found").build();
			}
	}
	
	@PermitAll
	@GET
	@Path("/FetchAllReceiptDetails")
	@Produces(MediaType.APPLICATION_JSON)
	public Response FetchAllReceiptDetails(@QueryParam("branch") String branch){
		ArrayList<ReceiptDetails> receipt=null;
		ReceiptDetailsController controller=null;
		try {
			System.out.println(branch);
			receipt=new ArrayList<>();
			controller=new ReceiptDetailsController();
			receipt=controller.FetchAllReceiptDetails(branch);
			return Response.status(Status.ACCEPTED).entity(receipt).build();
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		return Util.generateErrorResponse(Status.NOT_FOUND, "Data not found").build();
	}
	
	@PermitAll
	@POST
	@Path("/ReceiptDetails")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response ReceiptDetailsForm(@FormParam("stud_details") String stud_name,
			@FormParam("receipt_date") String receipt_date,@FormParam("receipt_no") String receipt_no,
			@FormParam("received_amt") long received_amt,@FormParam("pay_mode") String pay_mode
			,@FormParam("trans_status") String trans_status,@FormParam("trans_date") String trans_date
			,@FormParam("received_by") String received_by,@FormParam("due_date") String due_date,@FormParam("branch") String branch)
	{
		String[] stud_details=Util.symbolSeperatedString(stud_name);
		ReceiptDetails details=null;
		ReceiptDetails r_amt=null;
		AdmissionController adcontroller=null;
		ReceiptDetailsController controller=null;
		long remainAmount=0;
		try {
			details=new ReceiptDetails();
			details.setStud_name(stud_details[1]);
			details.setRollno(stud_details[0]);
			details.setContact(stud_details[2]);
			details.setReceipt_date(receipt_date);
			details.setReceipt_no(receipt_no);
			details.setPay_mode(pay_mode);
			details.setTrans_status(trans_status);
			details.setTrans_date(trans_date);
			details.setReceived_by(received_by);
			details.setTotal_amt(Long.parseLong(stud_details[3]));
			details.setReceived_amt(received_amt);		
			details.setBranch(branch);
			controller=new ReceiptDetailsController();
			r_amt=controller.updateRemainingAmount(stud_details[0]);
			if(r_amt==null)
			{
				remainAmount=Long.parseLong(stud_details[3])-received_amt;
				details.setAmount(remainAmount);
			}
			else{
				remainAmount=r_amt.getAmount()-received_amt;
				details.setAmount(remainAmount);
			}
			controller.ReceiptDetailsForm(details);
			long fees_paid=controller.calculateTotalFeesPaid(details.getRollno(),details.getStud_name());
			long fees_remain=details.getTotal_amt()-fees_paid;
			
			adcontroller=new AdmissionController();
			adcontroller.updateTotalFeesPaid(details.getRollno(),fees_paid,fees_remain);
			
			controller.updateInstallment(stud_details[0],due_date,branch,received_amt);
			
			return Util.generateResponse(Status.ACCEPTED, "Data Inserted").build();
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		return Util.generateErrorResponse(Status.BAD_REQUEST, "not Inserted").build();
	}
	
	@Path("/getReceiptAdmissionData")
	@GET
	@PermitAll
	@Produces(MediaType.APPLICATION_JSON)
	public Response getReceiptAdmissionData(@QueryParam("id") long rollno,@QueryParam("receiptno") String receiptno){
		 ArrayList<ReceiptDetails> admission=new ArrayList<>();
			ReceiptDetailsController controller=new ReceiptDetailsController();
			admission=controller.getReceiptAdmissionData(rollno,receiptno);
			if(admission!=null)
			{
				return Response.status(Status.ACCEPTED).entity(admission).build();
			}
			else{
				return Util.generateErrorResponse(Status.NOT_FOUND, "Data not found").build();
			}
	}
/*	@Path("/demo")
	@POST
	@PermitAll
	@Produces(MediaType.APPLICATION_JSON)
	public Response demo(@FormParam("id") ArrayList<String> rollno){
		for(int i=0;i<rollno.size();i++)
		{
			System.out.println(rollno.indexOf(i));
		}
		return null;
		
//		 ArrayList<ReceiptDetails> admission=new ArrayList<>();
//			ReceiptDetailsController controller=new ReceiptDetailsController();
//			admission=controller.getReceiptAdmissionData(rollno,receiptno);
//			if(admission!=null)
//			{
//				return Response.status(Status.ACCEPTED).entity(admission).build();
//			}
//			else{
//				return Util.generateErrorResponse(Status.NOT_FOUND, "Data not found").build();
//			}
	}*/

	@Path("/getStudReceiptList")
	@GET
	@PermitAll
	@Produces(MediaType.APPLICATION_JSON)
	public Response StudReceiptList(@QueryParam("rno") long rno){
		 ArrayList<ReceiptDetails> rlist = new ArrayList<>();
		 ReceiptDetailsController controller=new ReceiptDetailsController();
		 rlist=controller.getStudReceiptList(rno);
		 if(rlist!=null)
			{
				return Response.status(Status.ACCEPTED).entity(rlist).build();
			}
			else{
				return Util.generateErrorResponse(Status.NOT_FOUND, "Data not found").build();
			}
	}
	@Path("/ReceiptReport")
	@POST
	@PermitAll
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response ReceiptReport(@FormParam("from_date") String from_date,@FormParam("to_date") String to_date,
			@FormParam("received_by") String received_by,@FormParam("branch") String branch,
			@FormParam("pay_mode") String pay_mode,@FormParam("standard") String standard,
			@FormParam("acad_year") String acad_year,@FormParam("stud_name") String stud_name){
		 String[] commaSeperatedReceivedBy=Util.commaSeperatedString(received_by);
		 String[] commaSeperatedPayMode=Util.commaSeperatedString(pay_mode);
		 String[] commaSeperatedStandard=Util.commaSeperatedString(standard);
		 //ReceiptDetails receiptData=new ReceiptDetails();
		 ReceiptDetailsController controller=new ReceiptDetailsController();
		 ArrayList<ReceiptDetails> receiptReportData=new ArrayList<>();
		 try {
			 for(int i=0;i<commaSeperatedReceivedBy.length;i++){
				 for(int j=0;j<commaSeperatedPayMode.length;j++){
					 for(int k=0;k<commaSeperatedStandard.length;k++){
						 ReceiptDetails receipt=new ReceiptDetails();
						 Admission admission=new Admission();
							receipt.setFrom_date(from_date);
							receipt.setTo_date(to_date);
							receipt.setReceived_by(commaSeperatedReceivedBy[i]);
							receipt.setPay_mode(commaSeperatedPayMode[j]);
							admission.setBranch(branch);
							receipt.setStud_name(stud_name);
							admission.setAcad_year(acad_year);
							admission.setStandard(commaSeperatedStandard[k]);
							receiptReportData=controller.ReceiptReport(receipt,admission,receiptReportData);
					 }
				 }
			 }
			 if(receiptReportData!=null){
			 return Response.status(Status.ACCEPTED).entity(receiptReportData).build();
			 }
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Util.generateErrorResponse(Status.NOT_FOUND, "Data not found").build();
	}
	/*@Path("/InstallmentDueReport")
	@POST
	@PermitAll
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response InstallmentDueReport(@FormParam("from_date") String from_date,@FormParam("to_date") String to_date,
			@FormParam("division") String division,@FormParam("branch") String branch,
			@FormParam("package") String fees_package,@FormParam("standard") String standard,
			@FormParam("acad_year") String acad_year,@FormParam("stud_name") String stud_name){
		// String[] commaSeperatedReceivedBy=Util.commaSeperatedString(received_by);
		 String[] commaSeperatedPayMode=Util.commaSeperatedString(pay_mode);
		 String[] commaSeperatedStandard=Util.commaSeperatedString(standard);
		 //ReceiptDetails receiptData=new ReceiptDetails();
		 ReceiptDetailsController controller=new ReceiptDetailsController();
		 ArrayList<ReceiptDetails> receiptReportData=new ArrayList<>();
		 try {
			 for(int i=0;i<commaSeperatedReceivedBy.length;i++){
				 for(int j=0;j<commaSeperatedPayMode.length;j++){
					 for(int k=0;k<commaSeperatedStandard.length;k++){
						 ReceiptDetails receipt=new ReceiptDetails();
						 Admission admission=new Admission();
							receipt.setFrom_date(from_date);
							receipt.setTo_date(to_date);
							receipt.setReceived_by(commaSeperatedReceivedBy[i]);
							receipt.setPay_mode(commaSeperatedPayMode[j]);
							admission.setBranch(branch);
							receipt.setStud_name(stud_name);
							admission.setAcad_year(acad_year);
							admission.setStandard(commaSeperatedStandard[k]);
							receiptReportData=controller.ReceiptReport(receipt,admission,receiptReportData);
					 }
				 }
			 }
			 if(receiptReportData!=null){
			 return Response.status(Status.ACCEPTED).entity(receiptReportData).build();
			 }
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Util.generateErrorResponse(Status.NOT_FOUND, "Data not found").build();
	}
*/
}
