package org.VCERP.Education.VC.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;


import org.VCERP.Education.VC.model.TimeTable;
import org.VCERP.Education.VC.model.Employee;
import org.VCERP.Education.VC.utility.Util;

public class TimeTableDAO{
	public TimeTable addTimeTable(TimeTable tt, String tt_details){
		Connection con=null;
		PreparedStatement ps=null;
		String[] dollarSeperated=Util.dollarSeperatedString(tt_details);
		String createColumn="";
		String createIndex="?";
		int k=0;
		String lecturer="";
		try{
		con=Util.getDBConnection();
		for(int i=1;i<dollarSeperated.length;i++)
		{
			String[] pipeSeperated=Util.symbolSeperatedString(dollarSeperated[i]);
			createColumn+=",`"+pipeSeperated[0]+"`";
			createIndex+=",?";
			
		}
		String query="insert into time_table(`tt_title`,`aca_year`,`divi`,`subject`,`standard`,`created_date`"+createColumn+",`lecturer`,`branch`)values(?,?,?,?,?,"+createIndex+",?,?)";
		ps=con.prepareStatement(query);
		ps.setString(k+=1, tt.getTitle());
		ps.setString(k+=1, tt.getAca_year());
		ps.setString(k+=1, tt.getDivision());
		ps.setString(k+=1, tt.getSubject());
		ps.setString(k+=1, tt.getStd());
		ps.setString(k+=1, Util.currentDate());
		for(int i=1;i<dollarSeperated.length;i++)
		{
			String[] pipeSeperated=Util.symbolSeperatedString(dollarSeperated[i]);
				ps.setString(k+=1,pipeSeperated[1]+"|"+pipeSeperated[3]);
				lecturer=pipeSeperated[2];
		}
		ps.setString(k+=1,lecturer);
		ps.setString(k+=1,tt.getBranch());
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
	public ArrayList<Employee> FetchLecturer() {
		Connection con=null;
		PreparedStatement st=null;
		ResultSet rs=null;
		ArrayList<Employee> emp_des=new ArrayList<>();
		try {
			con=Util.getDBConnection();
			
			String query="select `emp_name` from employee where design=?";
			st=con.prepareStatement(query);
			st.setString(1, "lecturer");
			rs=st.executeQuery();
			while(rs.next())
			{
				Employee emp=new Employee();
				//emp.setId(rs.getLong(1));
				emp.setEmp_name(rs.getString(1));
//				emp.setSubject(rs.getString(3));
//				ttable.setAca_year(rs.getString(4));
//				ttable.setCreated_date(rs.getString(5));
//				ttable.setStd(rs.getString(6));
//				ttable.setTitle(rs.getString(7));
				
				
				emp_des.add(emp);
			}
		}
		catch(Exception e){
			e.printStackTrace();
			System.out.println(e);
		}
		finally{
			Util.closeConnection(rs, st, con);
		}
		return emp_des;
	}
	
}