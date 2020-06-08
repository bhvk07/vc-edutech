package org.VCERP.Education.VC.dao;

import java.io.Console;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import org.VCERP.Education.VC.model.LeadSource;
import org.VCERP.Education.VC.utility.Util;

public class LeadSourceDAO {
	public LeadSource addLeadSource(LeadSource lead){
		Connection con = null;
		PreparedStatement ps = null;
		try{
			con = Util.getDBConnection();
			String query = "insert into lead_source(`source`,`created_date`) values(?,?)";
			ps = con.prepareStatement(query);
			ps.setString(1, lead.getSource());
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
		return lead;
	}
	
	public ArrayList<LeadSource> FetchAllSource(){
		Connection con = null;
		PreparedStatement st = null;
		ResultSet rs = null;
		ArrayList<LeadSource> sourceList = new ArrayList<LeadSource>();
		try{
			
			con = Util.getDBConnection();
			String query = "select * from lead_source";
			st = con.prepareStatement(query);
			rs = st.executeQuery();
			while(rs.next()){
				LeadSource ls = new LeadSource();
			  ls.setSource(rs.getString(2));
			  ls.setCreated_date(rs.getString(3));
			  sourceList.add(ls);
			}
		}
		catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		finally {
			Util.closeConnection(null, st, con);
		}
		return sourceList;
	}
}