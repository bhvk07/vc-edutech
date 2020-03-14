package org.VCERP.Education.VC.resource;

import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.VCERP.Education.VC.controller.EmployeeController;
import org.VCERP.Education.VC.model.Employee;
import org.VCERP.Education.VC.utility.Util;

@Path("Employee")
public class EmployeeResource {

	@Path("/NewEmployee")
	@POST
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	private Response addEmployee(@FormParam("emp_type") String emp_type,@FormParam("branch") String branch
			,@FormParam("emp_name") String emp_name,@FormParam("emp_unq_code") String emp_unq_code
			,@FormParam("address") String address,@FormParam("contact") String contact,
			@FormParam("dob") String dob,@FormParam("join_date") String join_date,
			@FormParam("design") String design){
		Employee emp=null;
		EmployeeController controller=null;
		System.out.println(emp_type);
		try {
			emp=new Employee();
			controller=new EmployeeController();
			emp.setEmp_type(emp_type);
			emp.setBranch(branch);
			emp.setEmp_name(emp_name);
			emp.setEmp_unq_code(emp_unq_code);
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
}
