package org.VCERP.Education.VC.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import org.VCERP.Education.VC.model.Admission;
import org.VCERP.Education.VC.model.Enquiry;
import org.VCERP.Education.VC.model.ReceiptDetails;
import org.VCERP.Education.VC.utility.Util;

public class AdmissionDAO {

	public Admission StudentAdmission(Admission admission) {
		Connection con=null;
		PreparedStatement ps=null;
		try {
			con=Util.getDBConnection();
			String query="insert into admission(`student_name`,`contact`,`enq_taken_by`,`adm_fees_pack`,"
					+ "`status`,`date`,`Rollno`,`regno`,`invoice_no`,`admission_date`,`acad_year`,`join_date`,`fees`)"
					+ "values(?,?,?,?,?,?,?,?,?,?,?,?,?)";
			ps=con.prepareStatement(query);
			ps.setString(1, admission.getStudent_name());
			ps.setString(2, admission.getContact());
			ps.setString(3, admission.getEnq_taken_by());
			ps.setString(4, admission.getAdm_fees_pack());
			ps.setString(5, admission.getStatus());
			ps.setString(6, admission.getDate());
			ps.setString(7, admission.getRollno());
			ps.setString(8, admission.getRegno());
			ps.setString(9, admission.getInvoice_no());
			ps.setString(10, admission.getAdmission_date());
			ps.setString(11, admission.getAcad_year());
			ps.setString(12, admission.getJoin_date());
			ps.setLong(13, admission.getFees());
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
				ad.setContact(rs.getString(3));
				ad.setEnq_taken_by(rs.getString(4));
				ad.setAdm_fees_pack(rs.getString(5));
				ad.setStatus(rs.getString(6));
				ad.setDate(rs.getString(7));
				ad.setRollno(rs.getString(8));
				ad.setRegno(rs.getString(9));
				ad.setInvoice_no(rs.getString(10));
				ad.setAdmission_date(rs.getString(11));
				ad.setAcad_year(rs.getString(12));
				ad.setJoin_date(rs.getString(13));
				ad.setFees(rs.getLong(14));
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

	public Enquiry searchStudent(long enq_stud) {
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		Enquiry eq=null;
		try {
			con=Util.getDBConnection();
			String query="select id,sname,lname,stud_cont,status from enquiry where id=?";
			ps=con.prepareStatement(query);
			ps.setLong(1, enq_stud);
			rs=ps.executeQuery();
			while(rs.next())
			{
				eq=new Enquiry();
				eq.setId(rs.getLong(1));
				eq.setSname(rs.getString(2));
				eq.setLname(rs.getString(3));
				eq.setStud_cont(rs.getString(4));
				eq.setStatus(rs.getString(5));
			}
			
		}catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		finally {
			Util.closeConnection(rs, ps, con);
		}
		return eq;
	}
		
}
