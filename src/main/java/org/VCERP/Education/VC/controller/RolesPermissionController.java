package org.VCERP.Education.VC.controller;

import org.VCERP.Education.VC.dao.RolesPermissionDAO;
import org.VCERP.Education.VC.model.RolesPermission;

public class RolesPermissionController {

	public void saveRolesPermission(RolesPermission rolepermission) {
		RolesPermissionDAO dao=new RolesPermissionDAO();
		dao.saveRolesPermission(rolepermission);
		
	}

}
