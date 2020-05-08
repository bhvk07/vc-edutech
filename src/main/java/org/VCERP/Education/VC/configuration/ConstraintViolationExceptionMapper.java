package org.VCERP.Education.VC.configuration;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import org.VCERP.Education.VC.utility.ErrorMessage;


@Provider
public class ConstraintViolationExceptionMapper implements ExceptionMapper<ConstraintViolationException> {

	@Override
	  public Response toResponse(final ConstraintViolationException exception) {
		 String msg = "";
	      for (ConstraintViolation<?> cv : exception.getConstraintViolations()) {
	          msg+=cv.getPropertyPath()+" "+cv.getMessage()+"\n";
	      }
	      ErrorMessage error = new ErrorMessage(Status.NOT_ACCEPTABLE.getStatusCode(), msg);
	      return Response.status(Response.Status.BAD_REQUEST).entity(error).type(MediaType.APPLICATION_JSON).build();
	  }

}
