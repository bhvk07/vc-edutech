package org.VCERP.Education.VC.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import org.VCERP.Education.VC.model.Employee;
import org.VCERP.Education.VC.model.Enquiry;
import org.VCERP.Education.VC.model.User;
import org.VCERP.Education.VC.utility.Util;

public class EmployeeDAO {

	public Employee addEmployee(Employee emp) {
		Connection con=null;
		PreparedStatement ps=null;
		try {
			con=Util.getDBConnection();
			String query="insert into employee(`emp_type`,`branch`,`emp_name`,`emp_unq_code`,"
					+ "`email`,`address`,`contact`,`dob`,`join_date`,`design`,`created_date`)values(?,?,?,?,?,?,?,?,?,?,?)";
			ps=con.prepareStatement(query);
			ps.setString(1, emp.getEmp_type());
			ps.setString(2, emp.getBranch());
			ps.setString(3, emp.getEmp_name());
			ps.setString(4, emp.getEmp_unq_code());
			ps.setString(5, emp.getEmail());
			ps.setString(6, emp.getAddress());
			ps.setString(7, emp.getContact());
			ps.setString(8, emp.getDob());
			ps.setString(9, emp.getJoin_date());
			ps.setString(10, emp.getDesign());
			ps.setString(11, Util.currentDate());
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

	public ArrayList<Employee> FetchAllEmployee(String branch) {
			Connection con=null;
			PreparedStatement st=null;
			ResultSet rs=null;
			ArrayList<Employee> employee=new ArrayList<>();
			try {
				con=Util.getDBConnection();
				String query="select `id`,`emp_name`,`branch`,`created_date` from employee where branch=?";
				st=con.prepareStatement(query);
				st.setString(1, branch);
				rs=st.executeQuery();
				while(rs.next())
				{
					Employee emp=new Employee();
					emp.setId(rs.getLong(1));
					emp.setEmp_name(rs.getString(2));
					emp.setBranch(rs.getString(3));
					emp.setCreated_date(rs.getString(4));
					employee.add(emp);
				}
			}catch(Exception e){
				e.printStackTrace();
				System.out.println(e);
			}
			finally {
				Util.closeConnection(rs, st, con);
			}
			return employee;
	}

	

}
