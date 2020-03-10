package org.VCERP.Education.VC.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import org.VCERP.Education.VC.model.User;
import org.VCERP.Education.VC.utility.Util;

public class UserDAO {

	public User authenticateUser(String userid, String password) {
		Connection con=null;
		PreparedStatement st=null;
		ResultSet rs=null;
		User user=null;
		try {
			con=Util.getDBConnection();
			String query="select * from user_db where username=? and password=?";
			st=con.prepareStatement(query);
			st.setString(1, userid);
			st.setString(2, password);
			rs=st.executeQuery();
			while(rs.next())
			{
				user=new User();
				user.setId(rs.getLong(1));
				user.setName(rs.getString(2));
				user.setCont_no(rs.getString(3));
				user.setDob(rs.getString(4));
				user.setEmail(rs.getString(5));
				user.setUserid(rs.getString(6));
				user.setPassword("");
				user.setRole(rs.getString(8));			
			}
			
		} catch (Exception e) {
			System.out.println(e);
			e.printStackTrace();
		}
		finally {
			Util.closeConnection(rs, st, con);
		}
			return user;
		}
}
