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

import org.VCERP.Education.VC.controller.FeesTypeController;
import org.VCERP.Education.VC.model.FeesType;
import org.VCERP.Education.VC.utility.Util;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@Path("feesType")
public class FeesTypeResource {

	//private static final Logger LOGGER = LogManager.getLogger(FeesTypeResource.class);
	
	@POST
	@Path("/addNewFeesType")
	@PermitAll
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response addNewFeesType(@FormParam("feesType") String feesType)
	{
		try{
		FeesType type=new FeesType();
		type.setCreatedDate(Util.currentDate());
		type.setFeesType(feesType);
		FeesTypeController controller=new FeesTypeController();
		controller.addNewFeesType(type);
		return Util.generateResponse(Status.ACCEPTED, "Data save").build();
		}catch(Exception e)
		{
			e.printStackTrace();
		}
		return Util.generateErrorResponse(Status.BAD_REQUEST, "data not save").build();
	}
	@GET
	@Path("/getFeesType")
	@PermitAll
	@Produces(MediaType.APPLICATION_JSON)
	public Response getFeesType()
	{
		try{
		ArrayList<FeesType> type=new ArrayList<>();
		FeesTypeController controller=new FeesTypeController();
		type=controller.getFeesType();
		if(type!=null)
		{
			return Response.status(Status.ACCEPTED).entity(type).build();
		}
		}catch(Exception e)
		{
			e.printStackTrace();
		}
		return Util.generateErrorResponse(Status.BAD_REQUEST, "data not found").build();
	}
}
