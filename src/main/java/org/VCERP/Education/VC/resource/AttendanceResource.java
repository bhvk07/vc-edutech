package org.VCERP.Education.VC.resource;

import java.util.ArrayList;

import javax.annotation.security.PermitAll;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.VCERP.Education.VC.controller.AttendanceController;
import org.VCERP.Education.VC.model.Attendance;
import org.VCERP.Education.VC.utility.Util;


@Path("Attendance")
public class AttendanceResource {

	@Path("/getAttendaceList")
	@POST
	@PermitAll
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAttendaceList(@FormParam("acad_year") String acad_year,@FormParam("courses") String courses){
		ArrayList<Attendance> attendance=new ArrayList<>();
		AttendanceController controller=new AttendanceController();
		attendance=controller.getAttendanceList(acad_year,courses);
		if(attendance!=null)
		{
			return Response.status(Status.ACCEPTED).entity(attendance).build();
		}
		return Util.generateErrorResponse(Status.NOT_FOUND, "Data Not Found").build();
	}
	
}
