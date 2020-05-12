package org.VCERP.Education.VC.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import org.VCERP.Education.VC.model.Employee;
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
	
	public ArrayList<Subject> FetchAllSubject() {
		Connection con=null;
		PreparedStatement st=null;
		ResultSet rs=null;
		ArrayList<Subject> subject=new ArrayList<>();
		try {
			con=Util.getDBConnection();
			String query="select `id`,`subject`,`time_hrs`,`created_date` from subject_master";
			st=con.prepareStatement(query);
			rs=st.executeQuery();
			while(rs.next())
			{
				Subject sub=new Subject();
				sub.setId(rs.getLong(1));
				sub.setSubject(rs.getString(2));
				sub.setTimeline(rs.getString(3));
				sub.setCreated_date(rs.getString(4));
				
				subject.add(sub);
			}
		}
		catch(Exception e){
			e.printStackTrace();
			System.out.println(e);
		}
		finally{
			Util.closeConnection(rs, st, con);
		}
		return subject;
	}
	
	
}