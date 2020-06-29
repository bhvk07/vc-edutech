
package org.VCERP.Education.VC.resource;

import java.util.ArrayList;

import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
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

import org.VCERP.Education.VC.controller.ChartController;

import org.VCERP.Education.VC.interfaces.JWTTokenNeeded;
import org.VCERP.Education.VC.model.Chart;

import org.VCERP.Education.VC.utility.Util;

@Path("chart")
public class ChartResource {

		
	@POST
	@PermitAll
	//@JWTTokenNeeded
	@Path("/getExpenseChart")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	@Produces(MediaType.APPLICATION_JSON)
	public Response getExpenseData(@FormParam("start_date") String start_date,@FormParam("end_date") String end_date,@FormParam("branch") String branch)
	{
		Chart ch = null;
		ChartController controller = new ChartController();
		ArrayList<Chart> exp_chart = new ArrayList<>();
	try{
		ch = new Chart();
		 
		ch.setS_date(start_date.trim());
		ch.setE_date(end_date.trim());
		ch.setBranch(branch.trim());
		exp_chart = controller.getExpenseData(ch, exp_chart);
		//return Util.generateResponse(Status.ACCEPTED, "Data Successfully Fetched").build();
	
		if(exp_chart!=null){
			for(int i=0;i<exp_chart.size();i++) {
				System.out.println("Values"+exp_chart.get(i));
			}
			System.out.println("notttttttt successssss");
		return Response.status(Status.ACCEPTED).entity(exp_chart).build();	
	}
	}
	catch(Exception e){
		e.printStackTrace();
		System.out.println(e);
	}
	return Util.generateErrorResponse(Status.NOT_FOUND, "Data not found").build();
	}



@POST
@PermitAll
//@JWTTokenNeeded
@Path("/getReceiptChart")
@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
@Produces(MediaType.APPLICATION_JSON)
public Response getReceiptData(@FormParam("start_date") String start_date,@FormParam("end_date") String end_date,@FormParam("branch") String branch)
{
	Chart ch = null;
	ChartController controller = new ChartController();
	ArrayList<Chart> rec_chart = new ArrayList<>();
try{
	ch = new Chart();
	 
	ch.setS_date(start_date.trim());
	ch.setE_date(end_date.trim());
	ch.setBranch(branch.trim());
	rec_chart = controller.getReceiptData(ch, rec_chart);
	//return Util.generateResponse(Status.ACCEPTED, "Data Successfully Fetched").build();

	if(rec_chart!=null){
		
		System.out.println("notttttttt successssss");
	return Response.status(Status.ACCEPTED).entity(rec_chart).build();	
}
}
catch(Exception e){
	e.printStackTrace();
	System.out.println(e);
}
return Util.generateErrorResponse(Status.NOT_FOUND, "Data not found").build();
}


@POST
@PermitAll
//@JWTTokenNeeded
@RolesAllowed("VIEW_ADMISSION_CHART")
@Path("/getAdmissionChart")
@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
@Produces(MediaType.APPLICATION_JSON)
public Response getAdmissionData(@FormParam("start_date") String start_date,@FormParam("end_date") String end_date,@FormParam("branch") String branch)
{
	Chart ch = null;
	ChartController controller = new ChartController();
	ArrayList<Chart> adm_chart = new ArrayList<>();
try{
	ch = new Chart();
	 
	ch.setS_date(start_date.trim());
	ch.setE_date(end_date.trim());
	ch.setBranch(branch.trim());
	adm_chart = controller.getAdmissionData(ch, adm_chart);
	//return Util.generateResponse(Status.ACCEPTED, "Data Successfully Fetched").build();

	if(adm_chart!=null){
		
		System.out.println("notttttttt successssss");
	return Response.status(Status.ACCEPTED).entity(adm_chart).build();	
}
}
catch(Exception e){
	e.printStackTrace();
	System.out.println(e);
}
return Util.generateErrorResponse(Status.NOT_FOUND, "Data not found").build();
}


@POST
@PermitAll
//@JWTTokenNeeded
@Path("/getConversionChart")
@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
@Produces(MediaType.APPLICATION_JSON)
public Response getConversionData(@FormParam("start_date") String start_date,@FormParam("end_date") String end_date,@FormParam("branch") String branch)
{
	Chart ch = null;
	ChartController controller = new ChartController();
	ArrayList<Chart> conv_chart = new ArrayList<>();
try{
	ch = new Chart();
	 
	ch.setS_date(start_date.trim());
	ch.setE_date(end_date.trim());
	ch.setBranch(branch.trim());
	conv_chart = controller.getConversionData(ch, conv_chart);
	//return Util.generateResponse(Status.ACCEPTED, "Data Successfully Fetched").build();

	if(conv_chart!=null){
		
		System.out.println("notttttttt successssss");
	return Response.status(Status.ACCEPTED).entity(conv_chart).build();	
}
}
catch(Exception e){
	e.printStackTrace();
	System.out.println(e);
}
return Util.generateErrorResponse(Status.NOT_FOUND, "Data not found").build();
}

@POST
@PermitAll
//@JWTTokenNeeded
@Path("/getSalesCard")
@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
@Produces(MediaType.APPLICATION_JSON)
public Response getSalesCard(@FormParam("start_date") String start_date,@FormParam("end_date") String end_date,@FormParam("branch") String branch){
		Chart ch = null;
		ChartController controller=new ChartController();
		ArrayList<Chart> sales_card=new ArrayList<>();
		
		try {
			ch = new Chart(); 
			
			ch.setS_date(start_date.trim());
			ch.setE_date(end_date.trim());
			ch.setBranch(branch.trim());
			sales_card=controller.getSalesCard(ch, sales_card);
		if(sales_card!=null)
		{ 
			
			return Response.status(Status.ACCEPTED).entity(sales_card).build();
			
		}
		}
		catch(Exception e){
			e.printStackTrace();
			System.out.println(e);
		}
		return Util.generateErrorResponse(Status.BAD_REQUEST, "Data Not Found").build();
}

@POST
@PermitAll
//@JWTTokenNeeded
@Path("/getReceivedCard")
@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
@Produces(MediaType.APPLICATION_JSON)
public Response getReceivedCard(@FormParam("start_date") String start_date,@FormParam("end_date") String end_date,@FormParam("branch") String branch){
		Chart ch = null;
		ChartController controller=new ChartController();
		ArrayList<Chart> received_card=new ArrayList<>();
		//received_card=controller.getReceivedCard(branch);
		try {
			ch = new Chart(); 
			
			ch.setS_date(start_date.trim());
			ch.setE_date(end_date.trim());
			ch.setBranch(branch.trim());
			received_card = controller.getReceivedCard(ch, received_card);
			if(received_card!=null)
			{
			
				return Response.status(Status.ACCEPTED).entity(received_card).build();
				
			}
		}
		catch(Exception e){
			e.printStackTrace();
			System.out.println(e);
		}
		
		return Util.generateErrorResponse(Status.BAD_REQUEST, "Data Not Found").build();
}

@POST
@PermitAll
//@JWTTokenNeeded
@Path("/getReceivableCard")
@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
@Produces(MediaType.APPLICATION_JSON)
public Response getReceivableCard(@FormParam("start_date") String start_date,@FormParam("end_date") String end_date,@FormParam("branch") String branch){
		Chart ch = null;
		ChartController controller=new ChartController();
		ArrayList<Chart> receivable_card=new ArrayList<>();
		
		try {
			ch = new Chart(); 
			
			ch.setS_date(start_date.trim());
			ch.setE_date(end_date.trim());
			ch.setBranch(branch.trim());
			receivable_card = controller.getReceivableCard(ch, receivable_card);
			if(receivable_card!=null)
			{
				
				return Response.status(Status.ACCEPTED).entity(receivable_card).build();
				
			}
		}
		catch(Exception e){
			e.printStackTrace();
			System.out.println(e);
		}
		
		return Util.generateErrorResponse(Status.BAD_REQUEST, "Data Not Found").build();
}



@POST
@PermitAll
//@JWTTokenNeeded
@Path("/getNetIncomeCard")
@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
@Produces(MediaType.APPLICATION_JSON)
public Response getNetIncomeCard(@FormParam("start_date") String start_date,@FormParam("end_date") String end_date,@FormParam("branch") String branch){
		Chart ch = null;
		ChartController controller=new ChartController();
		ArrayList<Chart> income_card=new ArrayList<>();
		
		try {
			ch = new Chart(); 
			
			ch.setS_date(start_date.trim());
			ch.setE_date(end_date.trim());
			ch.setBranch(branch.trim());
			income_card = controller.getNetIncomeCard(ch, income_card);
			if(income_card!=null)
			{
				
				return Response.status(Status.ACCEPTED).entity(income_card).build();
				
			}
		}
		catch(Exception e){
			e.printStackTrace();
			System.out.println(e);
		}
		
		return Util.generateErrorResponse(Status.BAD_REQUEST, "Data Not Found").build();
}


}
