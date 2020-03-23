package org.VCERP.Education.VC.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import org.VCERP.Education.VC.model.Admission;
import org.VCERP.Education.VC.model.Enquiry;
import org.VCERP.Education.VC.model.ReceiptDetails;
import org.VCERP.Education.VC.utility.Util;

public class ReceiptDetailsDAO {

	public ReceiptDetails StudentDetails(ReceiptDetails receipt) {
		Connection con=null;
		PreparedStatement ps=null;
		try {
			con=Util.getDBConnection();
			String query="insert into receipt_details(`stud_name`) values(?)";
			ps=con.prepareStatement(query);
			ps.setString(1, receipt.getStud_name());
			ps.executeUpdate();
		}catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		finally {
			Util.closeConnection(null, ps, con);
		}
		return receipt;
	}
	
	public ReceiptDetails ReceiptDetailsForm(ReceiptDetails details) {
		Connection con=null;
		PreparedStatement ps=null;
		try {
			con=Util.getDBConnection();
			String query="insert into receipt_details(`stud_name`,`receipt_date`,`receipt_no`,"
					+ "`received_amt`,`pay_mode`,`trans_status`,`trans_date`,`trans_no`,`received_by`)"
					+ "values(?,?,?,?,?,?,?,?,?)";
			ps=con.prepareStatement(query);
			ps.setString(1, details.getStud_name());
			ps.setString(2, details.getReceipt_date());
			ps.setString(3, details.getReceipt_no());
			ps.setLong(4, details.getReceived_amt());
			ps.setString(5, details.getPay_mode());
			ps.setString(6, details.getTrans_status());
			ps.setString(7, details.getTrans_date());
			ps.setString(8, details.getTrans_no());
			ps.setString(9, details.getReceived_by());
			ps.executeUpdate();
		}catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		finally {
			Util.closeConnection(null, ps, con);
		}
		return details;
	}

	public Admission searchStudent(long enq_stud) {
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		Admission admission=null;
		try {
			con=Util.getDBConnection();
			String query="select id,student_name,contact,fees from receipt_details where id=?";
			ps=con.prepareStatement(query);
			ps.setLong(1, enq_stud);
			rs=ps.executeQuery();
			while(rs.next())
			{
				admission=new Admission();
				admission.setId(rs.getLong(1));
				admission.setStudent_name(rs.getString(2));
				admission.setContact(rs.getString(3));
				admission.setFees(rs.getLong(4));
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

	public ArrayList<ReceiptDetails> FetchAllReceiptDetails(ArrayList<ReceiptDetails> receipt) {
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		ReceiptDetails rec=null;
		try {
			con=Util.getDBConnection();
			String query="select * from receipt_details";
			ps=con.prepareStatement(query);
			rs=ps.executeQuery();
			while(rs.next())
			{
				rec=new ReceiptDetails();
				rec.setId(rs.getLong(1));
				rec.setStud_name(rs.getString(2));
				rec.setReceipt_date(rs.getString(3));
				rec.setReceipt_no(rs.getString(4));
				rec.setReceived_amt(rs.getLong(5));
				rec.setPay_mode(rs.getString(6));
				rec.setTrans_status(rs.getString(7));
				rec.setTrans_date(rs.getString(8));
				rec.setTrans_no(rs.getString(9));
				rec.setReceived_by(rs.getString(10));
				receipt.add(rec);
			}
			
		}catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		finally {
			Util.closeConnection(rs, ps, con);
		}
		return receipt;
	}

	

}
