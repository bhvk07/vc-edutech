package org.VCERP.Education.VC.resource;

import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;

import javax.annotation.security.PermitAll;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.VCERP.Education.VC.configuration.SigningKeyGenerator;
import org.VCERP.Education.VC.controller.UserController;
import org.VCERP.Education.VC.model.Employee;
import org.VCERP.Education.VC.utility.SecureUtil;
import org.VCERP.Education.VC.utility.Util;
//import org.VCERP.Education.VC.validation.UserResourceValidation;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;

@Controller
@Path("user")
public class UserResource {
	
	@POST
	@PermitAll
	@Path("/login")
	@Produces(MediaType.APPLICATION_JSON)
	public Response authenticateUser(@FormParam("userid") String userid,
			@FormParam("password") String password) throws NoSuchAlgorithmException{
//		System.out.println(userid+""+password);
//		String message=UserResourceValidation.validateAuthenticateUser(userid,password);
		
		Employee emp=new Employee();
//		if(message=="accepted"){
		UserController controller=new UserController();
		emp=controller.authenticateUser(userid,password);
//		}else{
//			return Response.status(Status.BAD_REQUEST).entity(message).build();
//		}
		if(emp==null){
		return Util.generateErrorResponse(Status.NOT_FOUND, "invalid username or password").build();
		}else
		{
			PrivateKey  key=SigningKeyGenerator.signKey();
			String session=Util.randomStringGenerator(8);
			SecureUtil secure=new SecureUtil();
			String token=secure.issueToken(emp,key,session);
		return Response.status(Status.ACCEPTED).header("X-Authorization", "Bearer "+token).entity(emp).build();
		}
}
}
