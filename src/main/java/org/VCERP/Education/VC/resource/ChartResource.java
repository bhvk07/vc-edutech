package org.VCERP.Education.VC.resource;

import java.util.ArrayList;

import javax.annotation.security.PermitAll;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.VCERP.Education.VC.controller.ChartController;
import org.VCERP.Education.VC.interfaces.JWTTokenNeeded;
import org.VCERP.Education.VC.model.Chart;
import org.VCERP.Education.VC.utility.Util;

@Path("chart")
public class ChartResource {

	@GET
	@PermitAll
	//@JWTTokenNeeded
	@Path("/getChartData")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getChartData(){
			ChartController controller=new ChartController();
			ArrayList<Chart> chart=new ArrayList<>();
			chart=controller.getChartData();
			if(chart==null)
			{
				return Util.generateErrorResponse(Status.BAD_REQUEST, "Data Not Found").build();
			}
			return Response.status(Status.ACCEPTED).entity(chart).build();
	}
}
