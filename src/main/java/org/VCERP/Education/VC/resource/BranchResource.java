package org.VCERP.Education.VC.resource;

import java.util.ArrayList;

import javax.annotation.security.PermitAll;
import javax.ws.rs.BeanParam;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.VCERP.Education.VC.controller.BranchController;
import org.VCERP.Education.VC.model.Branch;
import org.VCERP.Education.VC.utility.Util;

@Path("branch")
public class BranchResource {

	@Path("/addNewBranch")
	@POST
	@PermitAll
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response addNewBranch(@BeanParam Branch branch) {
		try {
			BranchController controller = new BranchController();
			controller.addNewBranch(branch);
			return Util.generateResponse(Status.ACCEPTED, "Data Save").build();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Util.generateErrorResponse(Status.BAD_REQUEST, "Not Save").build();
	}

	@Path("/getBranch")
	@GET
	@PermitAll
	@Produces(MediaType.APPLICATION_JSON)
	public Response getBranchDetails(@QueryParam("branch") String branch) {
		try {
			BranchController controller = new BranchController();
			Branch b = controller.getBranchDetails(branch);
			if (b != null) {
				return Response.status(Status.ACCEPTED).entity(b).build();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Util.generateErrorResponse(Status.BAD_REQUEST, "Not Found").build();
	}
	
	@Path("/getAllBranch")
	@GET
	@PermitAll
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllBranchDetails() {
		try {
			BranchController controller = new BranchController();
			ArrayList<Branch> branch = controller.getAllBranchDetails();
			if (branch != null) {
				return Response.status(Status.ACCEPTED).entity(branch).build();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Util.generateErrorResponse(Status.BAD_REQUEST, "Not Found").build();
	}
}
