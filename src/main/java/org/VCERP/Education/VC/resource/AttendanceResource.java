package org.VCERP.Education.VC.resource;

import java.util.ArrayList;

import javax.annotation.security.PermitAll;
import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
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
	public Response getAttendaceList(@FormParam("standard") String standard,@FormParam("acad_year") String acad_year
			,@FormParam("branch") String branch){
		ArrayList<Attendance> attendance=new ArrayList<>();
		AttendanceController controller=new AttendanceController();
		attendance=controller.getAttendanceList(standard,acad_year,branch);
		if(attendance!=null)
		{
			return Response.status(Status.ACCEPTED).entity(attendance).build();
		}
		return Util.generateErrorResponse(Status.NOT_FOUND, "Data Not Found").build();
	}
	
	
	@Path("/studentAttendance")
	@POST
	@PermitAll
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response studentAttendance(@FormParam("standard") String standard,@FormParam("acad_year") String acad_year
			,@FormParam("Attendance") String attendance,@FormParam("branch") String branch){
		
		String[] commaSeperatedAttendance=Util.commaSeperatedString(attendance);
		ArrayList<String> rollno=new ArrayList<>();
		ArrayList<String> attend=new ArrayList<>();
		for(int i=1;i<commaSeperatedAttendance.length;i++){
		String a=commaSeperatedAttendance[i];
		String[] symbolSeperatedAttendance=Util.symbolSeperatedString(a);
		rollno.add(symbolSeperatedAttendance[0]);
		attend.add(symbolSeperatedAttendance[1]);
		}
		try {
			AttendanceController controller=new AttendanceController();
			controller.studentAttendance(standard,acad_year,branch,rollno,attend);
			return Response.status(Status.ACCEPTED).build();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return Response.status(Status.NOT_FOUND).build();
	}
}
