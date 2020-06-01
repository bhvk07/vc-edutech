package org.VCERP.Education.VC.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import org.VCERP.Education.VC.model.Admission;
import org.VCERP.Education.VC.model.Enquiry;
import org.VCERP.Education.VC.model.Installment;
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
			String query="insert into receipt_details(`stud_name`,`RollNO`,`contact`,`receipt_date`,`receipt_no`,"
					+ "`pay_mode`,`trans_status`,`trans_date`,`received_by`,`total_fees`,`payment`,`amount`,`branch`)"
					+ "values(?,?,?,?,?,?,?,?,?,?,?,?,?)";
			ps=con.prepareStatement(query);
			ps.setString(1, details.getStud_name());
			ps.setString(2, details.getRollno());
			ps.setString(3, details.getContact());
			ps.setString(4, details.getReceipt_date());
			ps.setString(5, details.getReceipt_no());
			ps.setString(6, details.getPay_mode());
			ps.setString(7, details.getTrans_status());
			ps.setString(8, details.getTrans_date());
			ps.setString(9, details.getReceived_by());
			ps.setLong(10, details.getTotal_amt());
			ps.setLong(11, details.getReceived_amt());
			ps.setLong(12, details.getAmount());
			ps.setString(13,details.getBranch());
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

	public Admission searchStudent(String enq_stud, String branch) {
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		Admission admission=null;
		Installment install=new Installment();
		try {
			con=Util.getDBConnection();
			String query="select Rollno,student_name,contact,fees,invoice_no from "
					+ "admission where Rollno=? and branch=?";
			ps=con.prepareStatement(query);
			ps.setString(1, enq_stud);
			ps.setString(2, branch);
			rs=ps.executeQuery();
			while(rs.next())
			{
				admission=new Admission();
				admission.setRollno(rs.getString(1));
				admission.setStudent_name(rs.getString(2));
				admission.setContact(rs.getString(3));
				admission.setFees(rs.getLong(4));
				admission.setInvoice_no(rs.getString(5));
			}
			install=getInstallmentDetails(enq_stud, branch);
			if(install!=null){
			admission.setInstallment(install);
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
	public Installment getInstallmentDetails(String enq_stud, String branch) {
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		Installment install=new Installment();
		ArrayList<Integer> id=new ArrayList<>();
		ArrayList<String> title=new ArrayList<>();
		ArrayList<Integer> payment=new ArrayList<>();
		ArrayList<String> date=new ArrayList<>();
		try {
			con=Util.getDBConnection();
			String query="select id,fees_title,monthly_payment,due_date from "
					+ "installment where rollno=? and paid_status='0' and branch=?";
			ps=con.prepareStatement(query);
			ps.setString(1, enq_stud);
			ps.setString(2, branch);
			rs=ps.executeQuery();
			while(rs.next())
			{
				id.add(rs.getInt(1));
				title.add(rs.getString(2));
				payment.add(rs.getInt(3));
				date.add(rs.getString(4));
			}
			install.setId(id);
			install.setFees_title(title);
			install.setMonthly_pay(payment);
			install.setDue_date(date);
			
		}catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		finally {
			Util.closeConnection(rs, ps, con);
		}
		return install;
	}


	public ArrayList<ReceiptDetails> FetchAllReceiptDetails(String branch) {
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		ReceiptDetails rec=null;
		ArrayList<ReceiptDetails> receipt=new ArrayList<>();
		try {
			con=Util.getDBConnection();
			String query="select * from receipt_details where branch=?";
			ps=con.prepareStatement(query);
			ps.setString(1, branch);
			rs=ps.executeQuery();
			while(rs.next())
			{
				rec=new ReceiptDetails();
				rec.setId(rs.getLong(1));
				rec.setStud_name(rs.getString(2));
				rec.setRollno(rs.getString(3));
				rec.setContact(rs.getString(4));
				rec.setReceipt_date(rs.getString(5));
				rec.setReceipt_no(rs.getString(6));
				rec.setPay_mode(rs.getString(7));
				rec.setTrans_status(rs.getString(8));
				rec.setTrans_date(rs.getString(9));
				rec.setReceived_by(rs.getString(10));
				rec.setTotal_amt(rs.getLong(11));
				rec.setReceived_amt(rs.getLong(12));
				rec.setAmount(rs.getLong(13));
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

	public ReceiptDetails updateRemainingAmount(String id) {
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		ReceiptDetails remainAmount=null;
		try {
			con=Util.getDBConnection();
			String query="select amount from receipt_details where RollNO=?";
			ps=con.prepareStatement(query);
			ps.setString(1, id);
			rs=ps.executeQuery();
			while(rs.next())
			{
				remainAmount=new ReceiptDetails();
				remainAmount.setAmount(rs.getLong(1));
			}
		}catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		finally {
			Util.closeConnection(rs, ps, con);
		}
		return remainAmount;

	}

	public long calculateTotalFeesPaid(String rollno, String name) {
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		long paid_amount=0;
		try {
			con=Util.getDBConnection();
			String query="select payment from receipt_details where RollNO=?";
			ps=con.prepareStatement(query);
			ps.setString(1, rollno);
			rs=ps.executeQuery();
			while(rs.next())
			{
				paid_amount+=rs.getLong(1);
			}
		}catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		finally {
			Util.closeConnection(rs, ps, con);
		}
		return paid_amount;
	}

	public ArrayList<ReceiptDetails> getReceiptAdmissionData(long rollno, String receiptno) {
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		ReceiptDetails receipt=null;
		Admission ad=null;
		ArrayList<ReceiptDetails> receiptData=new ArrayList<>();
		try {
			con=Util.getDBConnection();
			String query="select * from receipt_details where RollNO=? and receipt_no=?";
			ps=con.prepareStatement(query);
			ps.setLong(1, rollno);
			ps.setString(2, receiptno);
			rs=ps.executeQuery();
			while(rs.next())
			{
				receipt=new ReceiptDetails();
				receipt.setId(rs.getLong(1));
				receipt.setStud_name(rs.getString(2));
				receipt.setRollno(rs.getString(3));
				receipt.setContact(rs.getString(4));
				receipt.setReceipt_date(rs.getString(5));
				receipt.setReceipt_no(rs.getString(6));
				receipt.setPay_mode(rs.getString(7));
				receipt.setTrans_status(rs.getString(8));
				receipt.setTrans_date(rs.getString(9));
				receipt.setReceived_by(rs.getString(10));
				receipt.setTotal_amt(rs.getLong(11));
				receipt.setReceived_amt(rs.getLong(12));
				receipt.setAmount(rs.getLong(13));
				
				ad=getAdmissionData(rollno);
				receipt.setAdmission(ad);
				receiptData.add(receipt);
			}
		}catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		finally {
			Util.closeConnection(rs, ps, con);
		}
		return receiptData;
	}	
	
	private Admission getAdmissionData(long rollno) {
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		Admission ad=null;
		try {
			con=Util.getDBConnection();
			String query="select * from admission where RollNo=?";
			ps=con.prepareStatement(query);
			ps.setLong(1, rollno);
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
				ad.setPaid_fees(rs.getLong(15));
				ad.setRemain_fees(rs.getLong(16));
			}
		}catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		finally {
			Util.closeConnection(rs, ps, con);
		}
		return ad;
	}

	public void updateInstallment(String rollno, String due_date, String branch, long received_amt) {
		Connection con=null;
		PreparedStatement ps=null;
		try {
			con=Util.getDBConnection();
			String query="update installment set paid_amount=?,paid_status='1' where rollno=? and due_date=? and branch=?";
			ps=con.prepareStatement(query);
			ps.setLong(1, received_amt);
			ps.setString(2, rollno);
			ps.setString(3, due_date);
			ps.setString(4, branch);
			ps.executeUpdate();
		}catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		finally {
			Util.closeConnection(null, ps, con);
		}

	}
}
