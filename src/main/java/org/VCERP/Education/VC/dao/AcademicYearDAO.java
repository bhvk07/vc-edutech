package org.VCERP.Education.VC.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import org.VCERP.Education.VC.model.AcademicYear;
import org.VCERP.Education.VC.model.Employee;
import org.VCERP.Education.VC.utility.Util;

public class AcademicYearDAO {
	public AcademicYear addAcademicYear(AcademicYear year){
		Connection con = null;
		PreparedStatement ps = null;
		try{
			con = Util.getDBConnection();
			String query = "insert into academic_year_master(`aca_year`,`aca_start`,`aca_end`,`created_date`)values(?,?,?,?)";
			ps = con.prepareStatement(query);
			ps.setString(1, year.getAca_year());
			ps.setString(2, year.getStart_date());
			ps.setString(3, year.getEnd_date());
			ps.setString(4,  Util.currentDate());
			ps.executeUpdate();
			
			
		}
		catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		finally {
			Util.closeConnection(null, ps, con);
		}
		return year;
		
	}
	
	public ArrayList<AcademicYear> FetchAllAcademic(){
		Connection con = null;
		PreparedStatement st = null;
		ResultSet rs = null;
		ArrayList<AcademicYear> academiclist = new ArrayList<>();
		try{
			con = Util.getDBConnection();
			String query = "select * from academic_year_master";
			st = con.prepareStatement(query);
			rs = st.executeQuery();
			while(rs.next()){
				AcademicYear year = new AcademicYear();
				year.setId(rs.getLong(1));
				year.setAca_year(rs.getString(2));
				year.setStart_date(rs.getString(3));
				year.setEnd_date(rs.getString(4));
				year.setCreated_date(rs.getString(5));
				academiclist.add(year);
			
				
			}
		}
		catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		finally {
			Util.closeConnection(rs, st, con);
		}
		return academiclist;
	}
}