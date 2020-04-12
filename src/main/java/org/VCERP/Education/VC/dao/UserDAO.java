package org.VCERP.Education.VC.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import org.VCERP.Education.VC.model.Employee;
import org.VCERP.Education.VC.model.User;
import org.VCERP.Education.VC.utility.Util;

public class UserDAO {

	public Employee authenticateUser(String userid, String password) {
		Connection con=null;
		PreparedStatement st=null;
		ResultSet rs=null;
		Employee user=null;
		try {
			con=Util.getDBConnection();
			String query="select * from employee where username=? and password=password(?)";
			st=con.prepareStatement(query);
			st.setString(1, userid);
			st.setString(2, password);
			rs=st.executeQuery();
			while(rs.next())
			{
				user=new Employee();
				user.setId(rs.getLong(1));
				user.setEmp_type(rs.getString(2));
				user.setBranch(rs.getString(3));
				user.setEmp_name(rs.getString(4));
				user.setEmp_unq_code(rs.getString(5));
				user.setEmail(rs.getString(6));
				user.setAddress(rs.getString(7));
				user.setContact(rs.getString(8));
				user.setDob(rs.getString(9));
				user.setJoin_date(rs.getString(10));
				user.setRole(rs.getString(11));
				user.setUserid(rs.getString(12));
				user.setPassword("");
				user.setDesign(rs.getString(14));			
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
