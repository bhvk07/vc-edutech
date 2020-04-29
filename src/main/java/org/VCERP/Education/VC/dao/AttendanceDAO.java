package org.VCERP.Education.VC.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import org.VCERP.Education.VC.model.Attendance;
import org.VCERP.Education.VC.utility.Util;

public class AttendanceDAO {

	public ArrayList<Attendance> getAttendanceList(String acad_year, String courses) {
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		Attendance at=null;
		ArrayList<Attendance> attendance=new ArrayList<>();
		try {
			con=Util.getDBConnection();
			String query="select id,Rollno,student_name from admission where acad_year=? and adm_fees_pack=?";
			ps=con.prepareStatement(query);
			ps.setString(1, acad_year);
			ps.setString(2, courses);
			rs=ps.executeQuery();
			while(rs.next())
			{
				at=new Attendance();
				at.setId(rs.getLong(1));
				at.setRollNo(rs.getString(2));
				at.setName(rs.getString(3));
				at.setDate(Util.currentDate());
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

}
