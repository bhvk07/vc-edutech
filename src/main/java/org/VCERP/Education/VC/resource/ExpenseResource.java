package org.VCERP.Education.VC.resource;

import java.util.ArrayList;

import javax.annotation.security.PermitAll;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;


import org.VCERP.Education.VC.controller.ExpenseController;
import org.VCERP.Education.VC.interfaces.JWTTokenNeeded;
import org.VCERP.Education.VC.model.Vendor;
import org.VCERP.Education.VC.model.Expense;
import org.VCERP.Education.VC.utility.Util;

@Path("Expense")
public class ExpenseResource {
	@POST
	@PermitAll
	@JWTTokenNeeded
	@Path("/NewExpense")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response addExpenses(@FormParam("exp_date") String exp_date,@FormParam("exp_amt") String exp_amt,
			@FormParam("vendor") String vendor,@FormParam("pay_mode") String pay_mode,@FormParam("branch") String branch)
	{
		Expense exp = null;
		ExpenseController controller = null;
	try{
		exp = new Expense();
		controller = new ExpenseController();
		exp.setExp_date(exp_date);
		exp.setAmt(exp_amt);
		exp.setVend(vendor);
		exp.setPay_mode(pay_mode);
		exp.setBranch(branch);
		controller.addExpenses(exp);
		return Util.generateResponse(Status.ACCEPTED, "New Expense Successfully Created.").build();
	}
	catch(Exception e){
		e.printStackTrace();
		System.out.println(e);
	}
	return Util.generateErrorResponse(Status.BAD_REQUEST, "Unable to create new expense.Please try again or contact with administrator.").build();
	}
	@POST
	@PermitAll
	@JWTTokenNeeded
	@Path("/EditExpense")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response EditExpenses(@FormParam("id") Long id,@FormParam("exp_date") String exp_date,
			@FormParam("exp_amt") String exp_amt,@FormParam("vendor") String vendor,
			@FormParam("pay_mode") String pay_mode,@FormParam("branch") String branch)
	{
		Expense exp = null;
		ExpenseController controller = null;
	try{
		exp = new Expense();
		controller = new ExpenseController();
		exp.setId(id);
		exp.setExp_date(exp_date);
		exp.setAmt(exp_amt);
		exp.setVend(vendor);
		exp.setPay_mode(pay_mode);
		exp.setBranch(branch);
		controller.EditExpenses(exp);
		return Util.generateResponse(Status.ACCEPTED, "Expense Successfully Updated.").build();
	}
	catch(Exception e){
		e.printStackTrace();
		System.out.println(e);
	}
	return Util.generateErrorResponse(Status.BAD_REQUEST, "Unable to complete this .").build();
}
	@DELETE
	@PermitAll
	@JWTTokenNeeded
	@Path("/DeleteExpense")
	//@PreAuthorize("hasRole('desk')")
	@Produces(MediaType.APPLICATION_JSON)
	public Response DeleteExpenses(@QueryParam("id") String id,@QueryParam("branch") String branch){
		ExpenseController controller=new ExpenseController();
		try {
			controller.DeleteExpenses(id,branch);
			return Util.generateResponse(Status.ACCEPTED, "Expense Successfully Deleted.").build();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Util.generateErrorResponse(Status.BAD_REQUEST, "Unable to complete this .").build();
	}
	
	@GET
	@PermitAll
	@JWTTokenNeeded
	@Path("/FetchAllExpense")
	//@PreAuthorize("hasRole('desk')")
	@Produces(MediaType.APPLICATION_JSON)
	public Response FetchAllExpenses(@QueryParam("branch") String branch){
			//@QueryParam("branch") String branch
		try {
			ArrayList<Expense> sub=new ArrayList<>();
			ExpenseController controller=new ExpenseController();
			sub=controller.FetchAllExpense(branch);
			if(sub!=null){
			return Response.status(Status.OK).entity(sub).build();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Util.generateErrorResponse(Status.NOT_FOUND,"Data Not Found.").build();
	}
	
	
	@POST
	@PermitAll
	@JWTTokenNeeded
	@Path("/NewVendor")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response addVendor(@FormParam("ven") String vendor)
	{
		Vendor ven = null;
		ExpenseController controller = null;
	try{
		ven = new Vendor();
		controller = new ExpenseController();
		ven.setVendor(vendor);
		controller.addVendor(ven);
		return Util.generateResponse(Status.ACCEPTED, "New Vendor Successfully Created.").build();
	}
	catch(Exception e){
		e.printStackTrace();
		System.out.println(e);
	}
	return Util.generateErrorResponse(Status.BAD_REQUEST, "Unable to create new vendor.Please try again or contact with administrator.").build();
	}
	
	
	
	@GET
	@PermitAll
	@JWTTokenNeeded
	@Path("/LoadVendor")
	//@PreAuthorize("hasRole('desk')")
	@Produces(MediaType.APPLICATION_JSON)
	public Response LoadVendor(){
			//@QueryParam("branch") String branch
		try {
			ArrayList<Vendor> ven=new ArrayList<>();
			ExpenseController controller=new ExpenseController();
			ven=controller.LoadVendor();
			if(ven!=null){
			return Response.status(Status.OK).entity(ven).build();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Util.generateErrorResponse(Status.NOT_FOUND,"Data Not Found.").build();
	}
}