package org.VCERP.Education.VC.dao;

import java.io.Console;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import org.VCERP.Education.VC.model.AcademicYear;
import org.VCERP.Education.VC.model.Division;
import org.VCERP.Education.VC.utility.Util;

public class DivisionDAO {
	public Division addDivision(Division div){
		Connection con = null;
		PreparedStatement ps = null;
		try{
			con = Util.getDBConnection();
			
			String query = "insert into division_master(`division`,`created_date`)values(?,?)";
			ps = con.prepareStatement(query);
			ps.setString(1, div.getDivision());
			ps.setString(2, Util.currentDate());
			ps.executeUpdate();
			
			
		}
		catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		finally {
			Util.closeConnection(null, ps, con);
		}
		return div;
		
	}
	public ArrayList<Division> FetchAllDivision(){
		Connection con = null;
		PreparedStatement st = null;
		ResultSet rs = null;
		ArrayList<Division> divisionList = new ArrayList<>();
	   try{
		   con = Util.getDBConnection();
		   String query =  "select * from division_master";
		   st = con.prepareStatement(query);
		   rs = st.executeQuery();
		   while(rs.next()){
			   Division div = new Division();
			   div.setId(rs.getLong(1));
			   div.setDivision(rs.getString(2));
			   div.setCreated_date(rs.getString(3));
			   divisionList.add(div);
		   }
	   }
	   catch (Exception e) {
		   e.printStackTrace();
			System.out.println(e);
	}
	   finally {
			Util.closeConnection(rs, st, con);
		}
		return divisionList;
		
	}
}