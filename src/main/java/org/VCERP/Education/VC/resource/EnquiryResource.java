package org.VCERP.Education.VC.resource;

import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.VCERP.Education.VC.controller.EnquiryController;
import org.VCERP.Education.VC.model.Enquiry;
import org.VCERP.Education.VC.utility.Util;
import org.springframework.security.access.prepost.PreAuthorize;

@Path("Enquiry")
public class EnquiryResource {
	
	@POST
	@PreAuthorize("hasRole('desk')")
	@Path("/EnquiryData")
	//@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response EnquiryData(@FormParam("sname") String sname,@FormParam("lname") String lname,
			@FormParam("mname") String fname,@FormParam("mname") String mname,@FormParam("uid") String uid,
			@FormParam("dob") String dob,@FormParam("gender") String gender,@FormParam("caste") String caste,
			@FormParam("category") String category,@FormParam("lang") String lang,@FormParam("stud_cont") String stud_cont,
			@FormParam("father_cont") String father_cont,@FormParam("mother_cont") String mother_cont,@FormParam("address") String address,
			@FormParam("pin") String pin,@FormParam("email") String email,@FormParam("w_app_no") String w_app_no,
			@FormParam("enq_date") String enq_date,@FormParam("enq_no") String enq_no,@FormParam("enq_taken_by") String enq_taken_by,
			@FormParam("fees_pack") String fees_pack,@FormParam("lead_source") String lead_source,
			@FormParam("remark") String remark){
		try {
			Enquiry enquiry=new Enquiry();
			enquiry.setSname(sname);
			enquiry.setLname(lname);
			enquiry.setFname(fname);
			enquiry.setMname(mname);
			enquiry.setUid(uid);
			enquiry.setDob(dob);
			enquiry.setGender(gender);
			enquiry.setCaste(caste);
			enquiry.setCategory(category);
			enquiry.setLang(lang);
			enquiry.setStud_cont(stud_cont);
			enquiry.setFather_cont(father_cont);
			enquiry.setMother_cont(mother_cont);
			enquiry.setAddress(address);
			enquiry.setPin(pin);
			enquiry.setEmail(email);
			enquiry.setW_app_no(w_app_no);
			enquiry.setEnq_date(enq_date);
			enquiry.setEnq_no(enq_no);
			enquiry.setEnq_taken_by(enq_taken_by);;
			enquiry.setFees_pack(fees_pack);
			enquiry.setLead_source(lead_source);
			enquiry.setRemark(remark);
			//System.out.println(enquiry.getCaste());
			EnquiryController controller=new EnquiryController();
			controller.EnquiryData(enquiry);
			return Response.status(Status.OK).build();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Util.generateErrorResponse(Status.NOT_ACCEPTABLE,"Data Not Accepted.").build();
	}

}
