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


import org.VCERP.Education.VC.controller.DivisionController;
import org.VCERP.Education.VC.interfaces.JWTTokenNeeded;
import org.VCERP.Education.VC.model.Division;

import org.VCERP.Education.VC.utility.Util;

@Path("Division")
public class DivisionResource {
	
	@POST
	@PermitAll
	@Path("/NewDivision")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response addDiv(@FormParam("division") String division){
		System.out.println("d"+division);
		Division div = null;
		DivisionController controller = null;
		try{
			div = new Division();
			controller = new DivisionController();
			div.setDivision(division);
			controller.addDivision(div);
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
	@Path("/DivisionList")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response FetchAllDivision(){
		
		DivisionController controller = null;
		try{
			ArrayList<Division> divisionlist = new ArrayList<>();
			controller = new DivisionController();
			divisionlist = controller.divisionList();
			return Response.status(Status.OK).entity(divisionlist).build();
		}
		catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		return Util.generateErrorResponse(Status.NOT_FOUND, "Data not found").build();
	}
	}