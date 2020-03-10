package org.VCERP.Education.VC.resource;

import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.VCERP.Education.VC.model.User;
import org.VCERP.Education.VC.utility.Util;
import org.VCERP.Education.VC.controller.UserController;

@Path("user")
public class UserResource {
	
	@POST
	@Path("/login")
	@Produces(MediaType.APPLICATION_JSON)
	public Response authenticateUser(@FormParam("userid") String userid,
			@FormParam("password") String password){
		User user=new User();
		UserController controller=new UserController();
		user=controller.authenticateUser(userid,password);
		if(user==null){
		return Util.generateErrorResponse(Status.NOT_FOUND, "invalid username or password").build();
		}else
		{
//		resource.getCompany(user.getCompany_name());
//		String session=Util.randomStringGenerator(8);
//		String token=SecureUtil.issueToken(user, "3QAy*bZn7jW%==LDKK$U", session);
		return Response.status(Status.ACCEPTED).header("X-Authorization", "Bearer "+"token").entity(user).build();
		}
	}
}
