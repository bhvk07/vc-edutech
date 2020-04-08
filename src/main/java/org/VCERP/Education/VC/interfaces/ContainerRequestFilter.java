package org.VCERP.Education.VC.interfaces;

import java.io.IOException;

import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.core.Response;

public interface ContainerRequestFilter {
	public Response filter(ContainerRequestContext requestContext) throws IOException;
}
