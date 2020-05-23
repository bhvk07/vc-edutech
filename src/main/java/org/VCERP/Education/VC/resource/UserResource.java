package org.VCERP.Education.VC.resource;

import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import java.util.ArrayList;

import javax.annotation.security.PermitAll;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
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

import org.VCERP.Education.VC.configuration.SigningKeyGenerator;
import org.VCERP.Education.VC.controller.EmployeeController;
import org.VCERP.Education.VC.controller.UserController;
import org.VCERP.Education.VC.model.Employee;
import org.VCERP.Education.VC.model.User;
import org.VCERP.Education.VC.utility.SecureUtil;
import org.VCERP.Education.VC.utility.Util;
import org.VCERP.Education.VC.validation.UserResourceValidation;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;

@Controller
@Path("user")
public class UserResource {

	@POST
	@PermitAll
	@Path("/login")
	@Produces(MediaType.APPLICATION_JSON)
	public Response authenticateUser(@FormParam("userid") String userid, @FormParam("password") String password)
			throws NoSuchAlgorithmException {
		// System.out.println(userid+""+password);
		// String
		// message=UserResourceValidation.validateAuthenticateUser(userid,password);

		User user = new User();
		// if(message=="accepted"){
		UserController controller = new UserController();
		user = controller.authenticateUser(userid, password);
		// }else{
		// return Response.status(Status.BAD_REQUEST).entity(message).build();
		// }
		if (user == null) {
			return Util.generateErrorResponse(Status.NOT_FOUND, "invalid username or password").build();
		} else {
			PrivateKey key = SigningKeyGenerator.signKey();
			String session = Util.randomStringGenerator(8);
			SecureUtil secure = new SecureUtil();
			String token = secure.issueToken(user, key, session);
			return Response.status(Status.ACCEPTED).header("X-Authorization", "Bearer " + token).entity(user).build();
		}
	}

	@POST
	@PermitAll
	// @JWTTokenNeeded
	@Path("/createEmployeeAccount")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response createEmployeeAccount(@FormParam("emp_type") String emp_type, @FormParam("branch") String branch,
			@FormParam("role") String role, @FormParam("emp_name") String emp_name, @FormParam("userid") String userid,
			@FormParam("password") String password) {
		User user = null;
		UserController controller = null;
		try {
			user = new User();
			controller = new UserController();
			user.setEmp_type(emp_type);
			user.setBranch(branch);
			user.setRole(role);
			user.setName(emp_name);
			user.setUserid(userid);
			user.setPassword(password);
			controller.createEmployeeAccount(user);
			return Util.generateResponse(Status.ACCEPTED, "Data Successfully Inserted").build();
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		return Util.generateErrorResponse(Status.BAD_REQUEST, "Data not Inserted").build();
	}

	@GET
	@PermitAll
	// @JWTTokenNeeded
	@Path("/getAllAccount")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllAccount(@QueryParam("branch") String branch) {
		ArrayList<User> user = new ArrayList<>();
		UserController controller = new UserController();
		user = controller.getAllAccount(branch);
		if (user == null) {
			return Util.generateErrorResponse(Status.NOT_FOUND, "Not Found").build();
		} else {
			return Response.status(Status.ACCEPTED).entity(user).build();
		}
	}
}
