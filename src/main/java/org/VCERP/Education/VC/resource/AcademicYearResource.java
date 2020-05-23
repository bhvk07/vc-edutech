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

import org.VCERP.Education.VC.controller.AcademicYearController;
import org.VCERP.Education.VC.interfaces.JWTTokenNeeded;
import org.VCERP.Education.VC.model.AcademicYear;
import org.VCERP.Education.VC.model.Employee;
import org.VCERP.Education.VC.utility.Util;

@Path("AcademicYear")
public class AcademicYearResource{
	
	@POST
	@PermitAll
	@Path("/NewAcademic")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response addAcademic(@FormParam("aca_year") String aca_year, @FormParam("aca_start") String aca_start,
			@FormParam("aca_end") String aca_end,@FormParam("prefix_id_card") String prefix_id_card,
			@FormParam("id_card") String id_card,@FormParam("prefix_invoice") String prefix_invoice,
			@FormParam("invoice") String invoice,@FormParam("prefix_regno") String prefix_regno,
			@FormParam("regno") String regno,@FormParam("branch") String branch)
	{
		AcademicYear year = null;
		AcademicYearController controller = null;
		try {
			year = new AcademicYear();
			controller = new AcademicYearController();
			year.setAca_year(aca_year);
			year.setStart_date(aca_start);
			year.setEnd_date(aca_end);
			year.setId_prefix(prefix_id_card);
			year.setId_no(id_card);
			year.setInvoice_prefix(prefix_invoice);
			year.setInvoice(invoice);
			year.setReg_prefix(prefix_regno);
			year.setRegistration(regno);
			year.setBranch(branch);
			controller.addAcademicYear(year);
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
	@Path("/AcademicList")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response FetchAllAcademic(){
		
		AcademicYearController controller = null;
		try{
			ArrayList<AcademicYear> academiclist = new ArrayList<>();
			controller = new AcademicYearController();
			academiclist = controller.AcademicList();
			return Response.status(Status.OK).entity(academiclist).build();
		}
		catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		return Util.generateErrorResponse(Status.NOT_FOUND, "Data not found").build();
	}
	
}
