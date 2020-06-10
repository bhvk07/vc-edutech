package org.VCERP.Education.VC.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;


import org.VCERP.Education.VC.model.TimeTable;
import org.VCERP.Education.VC.utility.Util;

public class TimeTableDAO{
	public TimeTable addTimeTable(TimeTable tt){
		Connection con=null;
		PreparedStatement ps=null;
		try{
		con=Util.getDBConnection();
		String query="insert into time_table(`tt_title`,`aca_year`,`divi`,`subject`,`standard`,`created_date`)values(?,?,?,?,?,?)";
		ps=con.prepareStatement(query);
		ps.setString(1, tt.getTitle());
		ps.setString(2, tt.getAca_year());
		ps.setString(3, tt.getDivision());
		ps.setString(4, tt.getSubject());
		ps.setString(5, tt.getStd());
		ps.setString(6, Util.currentDate());
		ps.executeUpdate();
		}
		catch(Exception e){
			e.printStackTrace();
			System.out.println(e);
		}
		finally {
			Util.closeConnection(null, ps, con);
		}
		return tt;
	}
	
	public ArrayList<TimeTable> FetchTimeTable() {
		Connection con=null;
		PreparedStatement st=null;
		ResultSet rs=null;
		ArrayList<TimeTable> tt=new ArrayList<>();
		try {
			con=Util.getDBConnection();
			String query="select `id`,`divi`,`subject`,`aca_year`,`created_date`,`standard`,`tt_title` from time_table";
			st=con.prepareStatement(query);
			//st.setString(1, branch);
			rs=st.executeQuery();
			while(rs.next())
			{
				TimeTable ttable=new TimeTable();
				ttable.setId(rs.getLong(1));
				ttable.setDivision(rs.getString(2));
				ttable.setSubject(rs.getString(3));
				ttable.setAca_year(rs.getString(4));
				ttable.setCreated_date(rs.getString(5));
				ttable.setStd(rs.getString(6));
				ttable.setTitle(rs.getString(7));
				
				
				tt.add(ttable);
			}
		}
		catch(Exception e){
			e.printStackTrace();
			System.out.println(e);
		}
		finally{
			Util.closeConnection(rs, st, con);
		}
		return tt;
	}
}