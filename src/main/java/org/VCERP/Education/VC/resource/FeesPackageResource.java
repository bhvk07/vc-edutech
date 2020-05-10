package org.VCERP.Education.VC.resource;

import java.util.ArrayList;

import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.VCERP.Education.VC.controller.FeesPackageController;
import org.VCERP.Education.VC.model.FeesPackage;
import org.VCERP.Education.VC.utility.Util;

@Path("FeesPackage")
public class FeesPackageResource {
	
	@Path("/addNewFeesPackage")
	@POST
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response addNewFeesPackage(@FormParam("fees-pack") String fees_pack,
	@FormParam("finalamt") String finalamt,@FormParam("standardData") String standardData,
	@FormParam("branchData") String branchData,@FormParam("fees_details") String fees_details)
	{
		/*String[] commaSeperatedFeesDetails=Util.commaSeperatedString(fees_details);
		for(int i=1;i<commaSeperatedFeesDetails.length;i++){
			//String a=commaSeperatedFeesDetails;
			String[] symbolSeperatedFeesDetails=Util.symbolSeperatedString(commaSeperatedFeesDetails[i]);
				feesType.add(symbolSeperatedFeesDetails[0]);
				amt.add(symbolSeperatedFeesDetails[1]);
				discount.add(symbolSeperatedFeesDetails[2]);
				totalFeesTypeAmt.add(symbolSeperatedFeesDetails[3]);		
		}*/
		try{
		FeesPackage pack=new FeesPackage();
		pack.setFeesPackage(fees_pack);
		pack.setStandard(standardData);
		pack.setBranch(branchData);
		pack.setTotal_amt(finalamt);
		pack.setFees_details(fees_details);
		FeesPackageController controller=new FeesPackageController();
		controller.addaddNewFeesPackage(pack);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	

}
