package org.VCERP.Education.VC.resource;

import javax.annotation.security.PermitAll;
import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.VCERP.Education.VC.controller.ReceiptDetailsController;
import org.VCERP.Education.VC.model.ReceiptDetails;
import org.VCERP.Education.VC.utility.Util;

@Path("Receipt")
public class ReceiptDetailsResource {
	
	@PermitAll
	@POST
	@Path("/ReceiptDetails")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response ReceiptDetailsForm(@FormParam("stud_name") String stud_name,
			@FormParam("receipt_date") String receipt_date,@FormParam("receipt_no") String receipt_no,
			@FormParam("received_amt") long received_amt,@FormParam("pay_mode") String pay_mode
			,@FormParam("trans_status") String trans_status,@FormParam("trans_date") String trans_date
			,@FormParam("trans_no") String trans_no,@FormParam("received_by") String received_by)
	{
		ReceiptDetails details=null;
		ReceiptDetailsController controller=null;
		try {
			details=new ReceiptDetails();
			details.setStud_name(stud_name);
			details.setReceipt_date(receipt_date);
			details.setReceipt_no(receipt_no);
			details.setReceived_amt(received_amt);
			details.setPay_mode(pay_mode);
			details.setTrans_status(trans_status);
			details.setTrans_date(trans_date);
			details.setTrans_no(trans_no);
			details.setReceived_by(received_by);
			
			controller=new ReceiptDetailsController();
			controller.ReceiptDetailsForm(details);
			return Util.generateResponse(Status.ACCEPTED, "Data Inserted").build();
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		return Util.generateErrorResponse(Status.BAD_REQUEST, "not Inserted").build();
	}

}
