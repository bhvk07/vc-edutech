package org.VCERP.Education.VC.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import org.VCERP.Education.VC.model.Employee;
import org.VCERP.Education.VC.utility.Util;

public class EmployeeAttendanceDAO {

	public ArrayList<Employee> getEmployeeAttendanceList() {
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		Employee em=null;
		ArrayList<Employee> employee=new ArrayList<>();
		try {
			con=Util.getDBConnection();
			String query="select id,emp_name,emp_unq_code from employee";
			ps=con.prepareStatement(query);
		//	ps.setString(1, acad_year);
		//	ps.setString(2, courses);
			rs=ps.executeQuery();
			while(rs.next())
			{
				em=new Employee();
				em.setId(rs.getLong(1));
				em.setEmp_name(rs.getString(2));
				em.setEmp_unq_code(rs.getString(3));
				//at.setDate(Util.currentDate());
				employee.add(em);
			}
			
		}catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		finally {
			Util.closeConnection(rs, ps, con);
		}
		return employee;
	}

	public void employeeAttendance(ArrayList<String> empcode, ArrayList<String> intime, ArrayList<String> outtime,
			ArrayList<String> attend) {
		Connection con=null;
		PreparedStatement ps=null;
		try {
			con=Util.getDBConnection();
			String query="insert into empattendance(`emp_code`,`attendance`,`start_time`,`end_time`,`date`)"
					+ "values(?,?,?,?,?)";
			ps=con.prepareStatement(query);
			for(int i=0;i<empcode.size();i++){
			ps.setString(1, empcode.get(i));
			ps.setString(2, attend.get(i));
			ps.setString(3, intime.get(i));
			ps.setString(4, outtime.get(i));
			ps.setString(5, Util.currentDate());
			ps.executeUpdate();
			}
		}catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		finally {
			Util.closeConnection(null, ps, con);
		}
	
	}
}