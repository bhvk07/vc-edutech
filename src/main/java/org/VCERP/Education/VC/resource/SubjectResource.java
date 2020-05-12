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

import org.VCERP.Education.VC.controller.EmployeeController;
import org.VCERP.Education.VC.controller.SubjectController;
import org.VCERP.Education.VC.interfaces.JWTTokenNeeded;
import org.VCERP.Education.VC.model.Employee;
import org.VCERP.Education.VC.model.Subject;
import org.VCERP.Education.VC.utility.Util;

@Path("Subject")
public class SubjectResource {
	@POST
	@PermitAll
	//@JWTTokenNeeded
	@Path("/NewSubject")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response addSubject(@FormParam("subjectname") String subjectname,@FormParam("timeline") String timeline)
	{
	Subject sub = null;
	SubjectController controller = null;
	try{
		sub = new Subject();
		controller = new SubjectController();
		sub.setSubject(subjectname);
		sub.setTimeline(timeline);
		controller.addSubject(sub);
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
	@Path("/FetchAllSubject")
	//@PreAuthorize("hasRole('desk')")
	@Produces(MediaType.APPLICATION_JSON)
	//@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response FetchAllSubject(){
		try {
			ArrayList<Subject> sub=new ArrayList<>();
			SubjectController controller=new SubjectController();
			sub=controller.FetchAllSubject();
			return Response.status(Status.OK).entity(sub).build();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Util.generateErrorResponse(Status.NOT_FOUND,"Data Not Found.").build();
	}
	
	
	
}