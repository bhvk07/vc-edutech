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


import org.VCERP.Education.VC.controller.LeadSourceController;
import org.VCERP.Education.VC.interfaces.JWTTokenNeeded;
import org.VCERP.Education.VC.model.LeadSource;

import org.VCERP.Education.VC.utility.Util;

@Path("LeadSource")
public class LeadSourceResource {
	
	@POST
	@PermitAll
	@Path("/NewSource")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response addLeadSource(@FormParam("leadsource") String source){
		LeadSource lead = null;
		LeadSourceController controller = null;
		try{
			lead = new LeadSource();
			controller = new LeadSourceController();
			lead.setSource(source);
			/*lead.setCreated_date(Util.currentDate());*/
			controller.addLeadSource(lead);
			return Util.generateResponse(Status.ACCEPTED, "Data Successfully Inserted").build();
		}
		catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		
		return Util.generateErrorResponse(Status.BAD_REQUEST, "Data not Inserted").build();
	}
	
	
	@GET
	@PermitAll
	@Path("/LeadSourceList")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response FetchAllSource(){
		
		LeadSourceController controller = null;
		try{
			ArrayList<LeadSource> sourceList = new ArrayList<>();
			controller = new LeadSourceController();
			sourceList = controller.FetchAllSource();
			return Response.status(Status.OK).entity(sourceList).build();
		}
		catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		return Util.generateErrorResponse(Status.NOT_FOUND, "Data not found").build();
	}
	/*@GET
	@PermitAll
	@Path("/getDivision")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response GetDivision(@QueryParam("id") String id){
		
		DivisionController controller = null;
		try{
			Division division= new Division();
			controller = new DivisionController();
			division = controller.GetDivision(id);
			return Response.status(Status.OK).entity(division).build();
		}
		catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		return Util.generateErrorResponse(Status.NOT_FOUND, "Data not found").build();
	}
	*/
	/*@POST
	@PermitAll
	@Path("/EditDivision")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response EditDivision(@FormParam("division") String division,@FormParam("id") Long id){
		Division div = null;
		DivisionController controller = null;
		try{
			div = new Division();
			controller = new DivisionController();
			div.setDivision(division);
			div.setId(id);
			controller.EditDivision(div);
			return Util.generateResponse(Status.ACCEPTED, "Data Successfully Inserted").build();
		}
		catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		
		return Util.generateErrorResponse(Status.BAD_REQUEST, "Data not Inserted").build();
	}
*/	/*@DELETE
	@Path("/deleteDivision")
	@PermitAll
	@Produces(MediaType.APPLICATION_JSON)
	public Response deleteDivision(@QueryParam("id") String id)
	{
		try{
		DivisionController controller=new DivisionController();
		controller.deleteDivision(id);
		return Response.status(Status.ACCEPTED).build();
		}catch(Exception e)
		{
			e.printStackTrace();
		}
		return Util.generateErrorResponse(Status.BAD_REQUEST, "data not deleted").build();
	}*/
	}