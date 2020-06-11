package org.VCERP.Education.VC.resource;

import java.util.ArrayList;

import javax.annotation.security.PermitAll;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;


import org.VCERP.Education.VC.controller.TimeSlotController;

import org.VCERP.Education.VC.interfaces.JWTTokenNeeded;

import org.VCERP.Education.VC.model.TimeSlot;
import org.VCERP.Education.VC.utility.Util;

@Path("TimeSlot")
public class TimeSlotResource {
	@POST
	@PermitAll
	//@JWTTokenNeeded
	@Path("/InsertTimeSlot")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response InsertTimeSlot(@FormParam("slot") String slot)
	{
		TimeSlot ts = null;
		TimeSlotController controller = null;
	try{
		ts = new TimeSlot();
		controller = new TimeSlotController();
		ts.setSlot(slot);		
		controller.InsertTimeSlot(ts);
		return Util.generateResponse(Status.ACCEPTED, "Data Successfully Inserted").build();
	}
	catch(Exception e){
		e.printStackTrace();
		System.out.println(e);
	}
	return Util.generateErrorResponse(Status.BAD_REQUEST, "Data not Inserted").build();
	}
	
	@GET
	@PermitAll
	//@JWTTokenNeeded
	@Path("/FetchTime")
	//@PreAuthorize("hasRole('desk')")
	@Produces(MediaType.APPLICATION_JSON)
	//@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response loadTime(){
		try {
			ArrayList<TimeSlot> tslot=new ArrayList<>();
			TimeSlotController controller=new TimeSlotController();
			tslot=controller.loadTime();
			return Response.status(Status.OK).entity(tslot).build();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Util.generateErrorResponse(Status.NOT_FOUND,"Data Not Found.").build();
	}
	
	
}