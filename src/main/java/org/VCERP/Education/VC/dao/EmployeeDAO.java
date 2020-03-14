package org.VCERP.Education.VC.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;

import org.VCERP.Education.VC.model.Employee;
import org.VCERP.Education.VC.utility.Util;

public class EmployeeDAO {

	public Employee addEmployee(Employee emp) {
		Connection con=null;
		PreparedStatement ps=null;
		try {
			con=Util.getDBConnection();
			String query="insert into employee(`emp_type`,`branch`,`emp_name`,`emp_unq_code`,"
					+ "`address`,`contact`,`dob`,`join_date`,`design`)values(?,?,?,?,?,?,?,?,?)";
			ps=con.prepareStatement(query);
			ps.setString(1, emp.getEmp_type());
			ps.setString(2, emp.getBranch());
			ps.setString(3, emp.getEmp_name());
			ps.setString(4, emp.getEmp_unq_code());
			ps.setString(5, emp.getAddress());
			ps.setString(6, emp.getContact());
			ps.setString(7, emp.getDob());
			ps.setString(8, emp.getJoin_date());
			ps.setString(9, emp.getDesign());
			ps.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		finally {
			Util.closeConnection(null, ps, con);
		}
		return emp;
	}

}
