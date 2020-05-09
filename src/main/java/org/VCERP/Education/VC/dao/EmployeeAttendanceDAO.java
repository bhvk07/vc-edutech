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
}