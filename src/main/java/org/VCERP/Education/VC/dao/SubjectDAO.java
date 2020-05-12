package org.VCERP.Education.VC.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import org.VCERP.Education.VC.model.Subject;
import org.VCERP.Education.VC.utility.Util;

public class SubjectDAO{
	
	public Subject addSubject(Subject sub){
		Connection con=null;
		PreparedStatement ps=null;
		try{
		con=Util.getDBConnection();
		String query="insert into subject_master(`subject`,`time_hrs`,`created_date`)values(?,?,?)";
		ps=con.prepareStatement(query);
		ps.setString(1, sub.getSubject());
		ps.setString(2, sub.getTimeline());
		ps.setString(3, Util.currentDate());
		ps.executeUpdate();
		}
		catch(Exception e){
			e.printStackTrace();
			System.out.println(e);
		}
		finally {
			Util.closeConnection(null, ps, con);
		}
		return sub;
	}
	
	
}