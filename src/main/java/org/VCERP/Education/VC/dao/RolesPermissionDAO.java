package org.VCERP.Education.VC.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import org.VCERP.Education.VC.model.RolesPermission;
import org.VCERP.Education.VC.utility.Util;

public class RolesPermissionDAO {

	public void saveRolesPermission(RolesPermission rolepermission) {
		Connection con=null;
		PreparedStatement st=null;
		try {
			con=Util.getDBConnection();
			String query="insert into role_permission(`role`,`permission`,`branch`,`created_date`) values(?,?,?,?)";
			st=con.prepareStatement(query);
			st.setString(1, rolepermission.getRole());
			st.setString(2, rolepermission.getPermission());
			st.setString(3, rolepermission.getBranch());
			st.setString(4, Util.currentDate());
			st.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		finally {
			Util.closeConnection(null, st, con);
		}
		
	}

}
