package org.VCERP.Education.VC.configuration;
//import java.io.IOException;
import java.lang.reflect.Method;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.security.DenyAll;
import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ResourceInfo;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.ext.Provider;

import org.VCERP.Education.VC.resource.UserResource;
import org.VCERP.Education.VC.utility.Util;

@Provider
public class AuthenticationFilter implements javax.ws.rs.container.ContainerRequestFilter
{
     
    @Context
    private ResourceInfo resourceInfo;
     
    private static final String AUTHORIZATION_PROPERTY = "X-Authorization";
    //private static final String AUTHENTICATION_SCHEME = "Bearer";
    private static final Response ACCESS_DENIED = Util.generateErrorResponse(Status.UNAUTHORIZED, "You Are UNAUTHORIZED To PerForm This Task.").build();
    private static final Response ACCESS_FORBIDDEN = Response.status(Response.Status.FORBIDDEN).build();
    //private static final Response SERVER_ERROR = Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();

      
    @Override
    public void filter(ContainerRequestContext requestContext)
    {
    	 Method method = resourceInfo.getResourceMethod();
         //Access allowed for all 
         if( ! method.isAnnotationPresent(PermitAll.class))
         {
             //Access denied for all 
             if(method.isAnnotationPresent(DenyAll.class))
             {
                 requestContext.abortWith(ACCESS_FORBIDDEN);
                 return;
             }
               
             //Get request headers
             final MultivaluedMap<String, String> headers = requestContext.getHeaders();
               
             //Fetch authorization header
             final List<String> authorization = headers.get(AUTHORIZATION_PROPERTY);
               
             //If no authorization information present; block access
             if(authorization == null || authorization.isEmpty())
             {
                 requestContext.abortWith(ACCESS_DENIED);
                 return;
             }
             if(method.isAnnotationPresent(RolesAllowed.class))
             {
                 RolesAllowed rolesAnnotation = method.getAnnotation(RolesAllowed.class);
                 String[] roles=rolesAnnotation.value();
                 
                 if( ! isUserAllowed(roles[0],getUserPermission()))
                 {
                     requestContext.abortWith(ACCESS_DENIED);
                     return;
                 }
             }
         }
     }
     private boolean isUserAllowed( final String roles, ArrayList<String> permission) 
     {
         boolean isAllowed = false;

         if(permission.contains(roles))
         {
             isAllowed = true;
         }
         return isAllowed;
     }
     
     private ArrayList<String> getUserPermission(){
    	 Connection con=null;
    	 PreparedStatement st=null;
    	 ResultSet rs=null;
    	 ArrayList<String> permisison=new ArrayList<>();
    	 try {
			con=Util.getDBConnection();
			String query="select permission from role_permission where role=? and branch=?";
			st=con.prepareStatement(query);
			st.setString(1, UserResource.user_role);
			st.setString(2, UserResource.user_branch);
			rs=st.executeQuery();
			while(rs.next()){
				permisison.add(rs.getString(1));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
    	 finally {
			Util.closeConnection(rs, st, con);
		}
    	 return permisison;
     }
}