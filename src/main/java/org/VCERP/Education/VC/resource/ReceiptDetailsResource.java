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
import org.VCERP.Education.VC.model.ReceiptDetails;
import org.VCERP.Education.VC.utility.Util;

@Path("Receipt")
public class ReceiptDetailsResource {
	
	@Path("/SearchStudent")
	@GET
	@PermitAll
	@Produces(MediaType.APPLICATION_JSON)
	public Response searchStudent(@QueryParam("id") long enq_stud){
		 Admission admission=new Admission();
			ReceiptDetailsController controller=new ReceiptDetailsController();
			admission=controller.searchStudent(enq_stud);
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
	public Response FetchAllReceiptDetails(){
		ArrayList<ReceiptDetails> receipt=null;
		ReceiptDetailsController controller=null;
		try {
			receipt=new ArrayList<>();
			controller=new ReceiptDetailsController();
			controller.FetchAllReceiptDetails(receipt);
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
			,@FormParam("received_by") String received_by)
	{
		String[] stud_details=Util.symbolSeperatedString(stud_name);
		ReceiptDetails details=null;
		ReceiptDetails r_amt=null;
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
			
			return Util.generateResponse(Status.ACCEPTED, "Data Inserted").build();
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		return Util.generateErrorResponse(Status.BAD_REQUEST, "not Inserted").build();
	}

}
