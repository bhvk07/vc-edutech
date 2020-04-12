package org.VCERP.Education.VC.controller;

import org.VCERP.Education.VC.dao.UserDAO;
import org.VCERP.Education.VC.model.Employee;
import org.VCERP.Education.VC.model.User;

public class UserController {

	public Employee authenticateUser(String userid, String password) {
		UserDAO dao=new UserDAO();
		return dao.authenticateUser(userid,password);
	}

}
