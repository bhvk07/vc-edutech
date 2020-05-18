package org.VCERP.Education.VC.resource;

import java.util.ArrayList;

import javax.annotation.security.PermitAll;
import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.VCERP.Education.VC.controller.StandardController;
import org.VCERP.Education.VC.model.Standard;
import org.VCERP.Education.VC.utility.Util;

@Path("standard")
public class StandardResource {
	
	@Path("/getAllStandard")
	@GET
	@PermitAll
	@Consumes(MediaType.APPLICATION_JSON)
	public Response getAllStandard(){
		
		try{
			ArrayList<Standard> std=new ArrayList<>();
			StandardController controller=new StandardController();
			std=controller.getAllStandard();
			if(std!=null){
				return Response.status(Status.ACCEPTED).entity(std).build();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Util.generateErrorResponse(Status.ACCEPTED, "NOT Found").build();
	}

	
	@Path("/addStandard")
	@POST
	@PermitAll
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response addStandard(@FormParam("stdname") String stdname,@FormParam("stdamt") String stdamt,
			@FormParam("sub") String sub,@FormParam("branchData") String branchData){
		
		try{
			String[] commaSeperated=Util.commaSeperatedString(branchData);
			ArrayList<String> branch=new ArrayList<>();
			for(int i=1;i<commaSeperated.length;i++)
			{
				String[] symbolSeperated=Util.symbolSeperatedString(commaSeperated[i]);
				branch.add(symbolSeperated[0]);
			}
			Standard std=new Standard();
			std.setStandard(stdname);
			std.setStd_fees(stdamt);
			std.setSubject(sub);
			StandardController controller=new StandardController();
			controller.addStandard(std,branch);
			return Util.generateResponse(Status.ACCEPTED, "Data Save").build();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Util.generateErrorResponse(Status.ACCEPTED, "Data Save").build();
	}
}
