package org.VCERP.Education.VC.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import org.VCERP.Education.VC.model.Employee;
import org.VCERP.Education.VC.model.Subject;
import org.VCERP.Education.VC.model.Designation;
import org.VCERP.Education.VC.utility.Util;

public class DesignationDAO{
	
	public Designation addDesignation(Designation des){
		Connection con=null;
		PreparedStatement ps=null;
		try{
		con=Util.getDBConnection();
		String query="insert into designation(`desg`,`created_date`,`branch`)values(?,?,?)";
		ps=con.prepareStatement(query);
		ps.setString(1, des.getDesg());
		ps.setString(2, Util.currentDate());
		ps.setString(3, des.getBranch());
		ps.executeUpdate();
		}
		catch(Exception e){
			e.printStackTrace();
			System.out.println(e);
		}
		finally {
			Util.closeConnection(null, ps, con);
		}
		return des;
	}
	public ArrayList<Designation> FetchAllDesignation(String branch) {
		Connection con=null;
		PreparedStatement st=null;
		ResultSet rs=null;
		ArrayList<Designation> des_list=new ArrayList<>();
		try {
			con=Util.getDBConnection();
			String query="select `id`,`desg`,`created_date` from designation where branch=?";
			st=con.prepareStatement(query);
			st.setString(1, branch);
			rs=st.executeQuery();
			while(rs.next())
			{
				Designation des=new Designation();
				des.setId(rs.getLong(1));
				des.setDesg(rs.getString(2));
				des.setCreated_date(rs.getString(3));
				
				des_list.add(des);
			}
		}
		catch(Exception e){
			e.printStackTrace();
			System.out.println(e);
		}
		finally{
			Util.closeConnection(rs, st, con);
		}
		return des_list;
	}
}