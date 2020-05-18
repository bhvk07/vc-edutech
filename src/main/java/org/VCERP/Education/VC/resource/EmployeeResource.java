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

import org.VCERP.Education.VC.controller.EmployeeController;
import org.VCERP.Education.VC.controller.EnquiryController;
import org.VCERP.Education.VC.interfaces.JWTTokenNeeded;
import org.VCERP.Education.VC.model.Employee;
import org.VCERP.Education.VC.model.Enquiry;
import org.VCERP.Education.VC.utility.Util;

@Path("Employee")
public class EmployeeResource {

	@POST
	@PermitAll
	//@JWTTokenNeeded
	@Path("/NewEmployee")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response addEmployee(@FormParam("emp_type") String emp_type,@FormParam("branch") String branch
			,@FormParam("emp_name") String emp_name,@FormParam("emp_unq_code") String emp_unq_code
			,@FormParam("address") String address,@FormParam("contact") String contact,
			@FormParam("dob") String dob,@FormParam("join_date") String join_date,
			@FormParam("design") String design,@FormParam("email") String email){
		Employee emp=null;
		EmployeeController controller=null;
		try {
			emp=new Employee();
			controller=new EmployeeController();
			emp.setEmp_type(emp_type);
			emp.setBranch(branch);
			emp.setEmp_name(emp_name);
			emp.setEmp_unq_code(emp_unq_code);
			emp.setEmail(email);
			emp.setAddress(address);
			emp.setContact(contact);
			emp.setDob(dob);
			emp.setJoin_date(join_date);
			emp.setDesign(design);
			controller.addEmployee(emp);
			return Util.generateResponse(Status.ACCEPTED, "Data Successfully Inserted").build();
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		
		return Util.generateErrorResponse(Status.BAD_REQUEST, "Data not Inserted").build();
	}
	
	@POST
	@PermitAll
	//@JWTTokenNeeded
	@Path("/createEmployeeAccount")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response createEmployeeAccount(@FormParam("emp_type") String emp_type,@FormParam("branch") String branch
			,@FormParam("role") String role,@FormParam("emp_name") String emp_name,
			@FormParam("userid") String userid,@FormParam("password") String password){
		Employee emp=null;
		EmployeeController controller=null;
		try {
			emp=new Employee();
			controller=new EmployeeController();
			emp.setEmp_type(emp_type);
			emp.setBranch(branch);
			emp.setRole(role);
			emp.setEmp_name(emp_name);
			emp.setUserid(userid);
			emp.setPassword(password);
			controller.createEmployeeAccount(emp);
			return Util.generateResponse(Status.ACCEPTED, "Data Successfully Inserted").build();
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
	return Util.generateErrorResponse(Status.BAD_REQUEST, "Data not Inserted").build();
}
	
	@GET
	@PermitAll
	//@JWTTokenNeeded
	@Path("/FetchAllEmployee")
	//@PreAuthorize("hasRole('desk')")
	@Produces(MediaType.APPLICATION_JSON)
	//@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response FetchAllEmployee(@QueryParam("branch") String branch){
		try {
			ArrayList<Employee> emp=new ArrayList<>();
			EmployeeController controller=new EmployeeController();
			emp=controller.FetchAllEmployee(branch);
			return Response.status(Status.OK).entity(emp).build();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Util.generateErrorResponse(Status.NOT_FOUND,"Data Not Found.").build();
	}
	
	
}
