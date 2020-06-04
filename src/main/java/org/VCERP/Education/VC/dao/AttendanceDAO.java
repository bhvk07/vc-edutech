package org.VCERP.Education.VC.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import org.VCERP.Education.VC.model.Attendance;
import org.VCERP.Education.VC.utility.Util;

public class AttendanceDAO {

	public ArrayList<Attendance> getAttendanceList(Attendance at) {
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		ArrayList<Attendance> attendance=new ArrayList<>();
		try {
			con=Util.getDBConnection();
			String query="select id,Rollno,student_name from admission where standard=? and division=? and acad_year=? and branch=?";
			ps=con.prepareStatement(query);
			ps.setString(1, at.getStandard());
			ps.setString(2, at.getDivision());
			ps.setString(3, at.getAcad_year());
			ps.setString(4, at.getBranch());
			rs=ps.executeQuery();
			while(rs.next())
			{
				at=new Attendance();
				at.setId(rs.getLong(1));
				at.setRollNo(rs.getString(2));
				at.setName(rs.getString(3));
				at.setCurrentDate(Util.currentDate());
				attendance.add(at);
			}
			
		}catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		finally {
			Util.closeConnection(rs, ps, con);
		}
		return attendance;
	}

	public void studentAttendance(String standard,String division, String acad_year, String branch, ArrayList<String> rollno,
			ArrayList<String> attend) {
		Connection con=null;
		PreparedStatement ps=null;
		int index=0;
		String createColumnName="";/*"`"+rollno.indexOf(0)+"`";*/
		String createParameterList="?"; 
		try {
		con=Util.getDBConnection();
		for (int i=0;i<rollno.size();i++)
		{
		createColumnName+=",`"+rollno.get(i)+"`";
		createParameterList+=",?";
		}
		String query="insert into attendance(`date`,`acad_year`,`standard`,`division`"+createColumnName+",`branch`) values(?,?,?,"+createParameterList+",?)";
		ps=con.prepareStatement(query);
		ps.setString(index+=1, Util.currentDate());
		ps.setString(index+=1, acad_year);
		ps.setString(index+=1, standard);
		ps.setString(index+=1, division);
		for (int i=0;i<attend.size();i++)
		{
		ps.setString(index+=1, attend.get(i));
		}
		ps.setString(index+=1, branch);
		ps.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
