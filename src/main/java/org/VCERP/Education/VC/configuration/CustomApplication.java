package org.VCERP.Education.VC.configuration;

import org.glassfish.jersey.filter.LoggingFilter;
import org.glassfish.jersey.server.ResourceConfig;

public class CustomApplication extends ResourceConfig{
	public CustomApplication() 
    {
        packages("org.VCERP.Education.VC.configuration");
        register(LoggingFilter.class);
        register(GsonMessageBodyHandler.class);
 
        //Register Auth Filter here
        register(AuthenticationFilter.class);
    }
}
