package org.VCERP.Education.VC.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import org.VCERP.Education.VC.model.Admission;
import org.VCERP.Education.VC.model.Enquiry;
import org.VCERP.Education.VC.utility.Util;

public class AdmissionDAO {

	public Admission StudentAdmission(Admission admission) {
		Connection con=null;
		PreparedStatement ps=null;
		try {
			con=Util.getDBConnection();
			String query="insert into admission(`student_name`,`enq_taken_by`,`adm_fees_pack`,"
					+ "`status`,`date`,`Rollno`,`regno`,`invoice_no`,`admission_date`,`acad_year`,`join_date`)"
					+ "values(?,?,?,?,?,?,?,?,?,?,?)";
			ps=con.prepareStatement(query);
			ps.setString(1, admission.getStudent_name());
			ps.setString(2, admission.getEnq_taken_by());
			ps.setString(3, admission.getAdm_fees_pack());
			ps.setString(4, admission.getStatus());
			ps.setString(5, admission.getDate());
			ps.setString(6, admission.getRollno());
			ps.setString(7, admission.getRegno());
			ps.setString(8, admission.getInvoice_no());
			ps.setString(9, admission.getAdmission_date());
			ps.setString(10, admission.getAcad_year());
			ps.setString(11, admission.getJoin_date());
			ps.executeUpdate();
		}catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		finally {
			Util.closeConnection(null, ps, con);
		}
		return admission;
		
	}

	public ArrayList<Enquiry> getNonAdmittedStudent(ArrayList<Enquiry> admission) {
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		Enquiry eq=null;
		try {
			con=Util.getDBConnection();
			String query="select id,sname,lname,status from enquiry where status=0";
			ps=con.prepareStatement(query);
			rs=ps.executeQuery();
			while(rs.next())
			{
				eq=new Enquiry();
				eq.setId(rs.getLong(1));
				eq.setSname(rs.getString(2));
				eq.setLname(rs.getString(3));
				eq.setStatus(rs.getString(4));
				admission.add(eq);
			}
			
		}catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		finally {
			Util.closeConnection(rs, ps, con);
		}
		return admission;
	}

	public ArrayList<Admission> fetchAllAdmittedStudent(ArrayList<Admission> admission) {
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		Admission ad=null;
		try {
			con=Util.getDBConnection();
			String query="select * from admission";
			ps=con.prepareStatement(query);
			rs=ps.executeQuery();
			while(rs.next())
			{
				ad=new Admission();
				ad.setId(rs.getLong(1));
				ad.setStudent_name(rs.getString(2));
				ad.setEnq_taken_by(rs.getString(3));
				ad.setAdm_fees_pack(rs.getString(4));
				ad.setStatus(rs.getString(5));
				ad.setDate(rs.getString(6));
				ad.setRollno(rs.getString(7));
				ad.setRegno(rs.getString(8));
				ad.setInvoice_no(rs.getString(9));
				ad.setAdmission_date(rs.getString(10));
				ad.setAcad_year(rs.getString(11));
				ad.setJoin_date(rs.getString(12));
				admission.add(ad);
			}
			
		}catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		finally {
			Util.closeConnection(rs, ps, con);
		}
		return admission;
	}

}
