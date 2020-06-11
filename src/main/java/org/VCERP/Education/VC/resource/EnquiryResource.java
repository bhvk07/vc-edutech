package org.VCERP.Education.VC.resource;

import java.util.ArrayList;

import javax.annotation.security.PermitAll;
import javax.validation.Valid;
import javax.ws.rs.BeanParam;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.VCERP.Education.VC.controller.EnquiryController;
import org.VCERP.Education.VC.interfaces.JWTTokenNeeded;
import org.VCERP.Education.VC.model.Enquiry;
import org.VCERP.Education.VC.utility.Util;

@Path("Enquiry")
public class EnquiryResource {
	
	@Path("/EnquiryData")
	@POST
	@PermitAll
	//@JWTTokenNeeded
	//@PreAuthorize("hasRole('desk')")
	//@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response EnquiryData(@Valid @BeanParam Enquiry enquiry){
		try {
			
			//System.out.println(enquiry.getCaste());
			EnquiryController controller=new EnquiryController();
			controller.EnquiryData(enquiry);
			return Response.status(Status.OK).build();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Util.generateErrorResponse(Status.NOT_ACCEPTABLE,"Data Not Accepted.").build();
	}

	@Path("/editEnquiryData")
	@POST
	@PermitAll
	//@JWTTokenNeeded
	//@PreAuthorize("hasRole('desk')")
	//@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response EditEnquiryData(@Valid @BeanParam Enquiry enquiry){
		try {
			
			//System.out.println(enquiry.getCaste());
			EnquiryController controller=new EnquiryController();
			controller.EditEnquiryData(enquiry);
			return Response.status(Status.OK).build();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Util.generateErrorResponse(Status.NOT_ACCEPTABLE,"Data Not updated.").build();
	}
	
	@GET
	@PermitAll
	//@JWTTokenNeeded
	@Path("/FetchAllEnquiryData")
	@Produces(MediaType.APPLICATION_JSON)
	public Response FetchAllEnquiryData(@QueryParam("branch") String branch){
		try {
			ArrayList<Enquiry> enq=new ArrayList<>();
			EnquiryController controller=new EnquiryController();
			enq=controller.FetchAllEnquiryData(branch);
			return Response.status(Status.OK).entity(enq).build();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Util.generateErrorResponse(Status.NOT_FOUND,"Data Not Found.").build();
	}
	
	@DELETE
	@PermitAll
	@JWTTokenNeeded
	@Path("/DeleteMultipleEnquiryData")
	//@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	@Produces(MediaType.APPLICATION_JSON)
	public Response DeleteMultipleEnquiryData(@QueryParam("delete") Long id){
		try {
			EnquiryController controller=new EnquiryController();
			controller.DeleteMultipleEnquiryData(id);
			return Util.generateResponse(Status.OK,"Data Deleted").build();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Util.generateErrorResponse(Status.NOT_FOUND,"Data Not Found.").build();
	}
	
	@PUT
	@PermitAll
	@JWTTokenNeeded
	@Path("/Admission")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	@Produces(MediaType.APPLICATION_JSON)
	public Response Admission(@FormParam("id") long id){
		try {
			EnquiryController controller=new EnquiryController();
			controller.Admission(id);
			return Util.generateResponse(Status.OK,"Admission done.").build();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Util.generateErrorResponse(Status.BAD_REQUEST,"Admission not done.").build();
	}
	@POST
	@PermitAll
	//@JWTTokenNeeded
	@Path("/EnquiryReport")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	@Produces(MediaType.APPLICATION_JSON)
	public Response EnquiryReport(@FormParam("enq_taken_by") String enq_taken,@FormParam("from_date") String from_date,
			@FormParam("to_date") String to_date,@FormParam("enq_status") String enq_status,
			@FormParam("branch") String branch){
		System.out.println(enq_status);
		String[] commaSeperated_Enq_taken=Util.commaSeperatedString(enq_taken);
		String[] commaSeperated_Enq_status=Util.commaSeperatedString(enq_status);
		Enquiry enquiry=null;
		Enquiry enqData=new Enquiry();
		EnquiryController controller=new EnquiryController();
		ArrayList<Enquiry> enq=new ArrayList<>();
		try {
			for(int i=0;i<commaSeperated_Enq_taken.length;i++){
				for(int j=0;j<commaSeperated_Enq_status.length;j++){
					enquiry=new Enquiry();
					enquiry.setEnq_taken_by(commaSeperated_Enq_taken[i]);
					enquiry.setFrom_date(from_date);
					enquiry.setTo_date(to_date);
					enquiry.setStatus(commaSeperated_Enq_status[j]);
					enquiry.setBranch(branch);
					enqData=controller.EnquiryReport(enquiry);
					if(enqData!=null){
						enq.add(enqData);	
					}
				}
			}
			if(enq!=null){
				return Response.status(Status.ACCEPTED).entity(enq).build();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Util.generateErrorResponse(Status.BAD_REQUEST,"Admission not done.").build();
	}
	

}
