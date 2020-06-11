package org.VCERP.Education.VC.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;


import org.VCERP.Education.VC.model.TimeSlot;
import org.VCERP.Education.VC.model.TimeTable;
import org.VCERP.Education.VC.utility.Util;

public class TimeSlotDAO{
	public TimeSlot InsertTimeSlot(TimeSlot ts){
		Connection con=null;
		PreparedStatement ps=null;
		try{
		con=Util.getDBConnection();
		String query="insert into time_slot(`slot`)values(?)";
		ps=con.prepareStatement(query);
		ps.setString(1, ts.getSlot());
		ps.executeUpdate();
		}
		catch(Exception e){
			e.printStackTrace();
			System.out.println(e);
		}
		finally {
			Util.closeConnection(null, ps, con);
		}
		return ts;
	}
	
	public ArrayList<TimeSlot> loadTime() {
		Connection con=null;
		PreparedStatement st=null;
		ResultSet rs=null;
		ArrayList<TimeSlot> ts=new ArrayList<>();
		try {
			con=Util.getDBConnection();
			String query="select * from time_slot";
			st=con.prepareStatement(query);
			//st.setString(1, branch);
			rs=st.executeQuery();
			while(rs.next())
			{
				TimeSlot tslot=new TimeSlot();
				tslot.setId(rs.getLong(1));
				tslot.setSlot(rs.getString(2));
				
				
				
				ts.add(tslot);
			}
		}
		catch(Exception e){
			e.printStackTrace();
			System.out.println(e);
		}
		finally{
			Util.closeConnection(rs, st, con);
		}
		return ts;
	}
}

	