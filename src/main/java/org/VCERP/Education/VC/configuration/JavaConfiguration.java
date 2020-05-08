package org.VCERP.Education.VC.configuration;

import org.VCERP.Education.VC.controller.AdmissionController;
import org.VCERP.Education.VC.controller.EmployeeController;
import org.VCERP.Education.VC.controller.EnquiryController;
import org.VCERP.Education.VC.controller.ReceiptDetailsController;
import org.VCERP.Education.VC.controller.UserController;
import org.VCERP.Education.VC.dao.AdmissionDAO;
import org.VCERP.Education.VC.dao.EmployeeDAO;
import org.VCERP.Education.VC.dao.EnquiryDAO;
import org.VCERP.Education.VC.dao.ReceiptDetailsDAO;
import org.VCERP.Education.VC.dao.UserDAO;
import org.VCERP.Education.VC.model.Employee;
import org.VCERP.Education.VC.model.ReceiptDetails;
import org.VCERP.Education.VC.resource.AdmissionResource;
import org.VCERP.Education.VC.resource.EmployeeResource;
import org.VCERP.Education.VC.resource.EnquiryResource;
import org.VCERP.Education.VC.resource.ReceiptDetailsResource;
import org.VCERP.Education.VC.resource.UserResource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JavaConfiguration {
	//Resources
	
	@Bean
	public UserResource userResource(){
		return new UserResource();
	}
	
	@Bean
	public AdmissionResource admissionResource(){
		return new AdmissionResource();
	}
	
	@Bean
	public EmployeeResource employeeResource(){
		return new EmployeeResource();
	}
	
	@Bean
	public EnquiryResource enquiryResource(){
		return new EnquiryResource();
	}
	
	@Bean
	public ReceiptDetailsResource receiptDetailsResource(){
		return new ReceiptDetailsResource();
	}
	
	//Controllers
	@Bean
	public UserController userController(){
		return new UserController();
	}
	
	@Bean
	public AdmissionController admissionController(){
		return new AdmissionController();
	}
	
	@Bean
	public EmployeeController employeeController(){
		return new EmployeeController();
	}
	
	@Bean
	public EnquiryController enquiryController(){
		return new EnquiryController();
	}
	
	@Bean
	public ReceiptDetailsController receiptDetailsController(){
		return new ReceiptDetailsController();
	}
	
	//DAO
	@Bean
	public UserDAO userDAO(){
		return new UserDAO();
	}
	
	@Bean
	public AdmissionDAO admissionDAO(){
		return new AdmissionDAO();
	}
	
	@Bean
	public EmployeeDAO employeeDAO(){
		return new EmployeeDAO();
	}
	
	@Bean
	public EnquiryDAO enquiryDAO(){
		return new EnquiryDAO();
	}
	
	@Bean
	public ReceiptDetailsDAO receiptDetailsDAO(){
		return new ReceiptDetailsDAO();
	}

}
