package org.VCERP.Education.VC.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import org.VCERP.Education.VC.model.Admission;
import org.VCERP.Education.VC.model.Enquiry;
import org.VCERP.Education.VC.model.FeesPackage;
import org.VCERP.Education.VC.model.Installment;
import org.VCERP.Education.VC.model.ReceiptDetails;
import org.VCERP.Education.VC.utility.Util;

public class AdmissionDAO {

	public Admission StudentAdmission(Admission admission) {
		Connection con=null;
		PreparedStatement ps=null;
		try {
			con=Util.getDBConnection();
			String query="insert into admission(`student_name`,`lname`,`fname`,`mname`,`uid`,`dob`,`gender`,`caste`"
					+ ",`category`,`language`,"
					+ "`contact`,`father_cont`,`mother_cont`,`address`,`pin`"
					+ ",`email`,`w_app_no`,`enq_taken_by`,`adm_fees_pack`,"
					+ "`status`,`date`,`Rollno`,`regno`,`invoice_no`,`standard`,`division`,`admission_date`,`acad_year`,`join_date`,`fees`,"
					+ "`discount`,`paid_fees`,`remain_fees`,`created_date`,`branch`)"
					+ "values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,0,0,?,?)";
			ps=con.prepareStatement(query);
			ps.setString(1, admission.getStudent_name());
			ps.setString(2, admission.getLname());
			ps.setString(3, admission.getFname());
			ps.setString(4, admission.getMname());
			ps.setString(5, admission.getUid());
			ps.setString(6, admission.getDob());
			ps.setString(7, admission.getGender());
			ps.setString(8, admission.getCaste());
			ps.setString(9, admission.getCategory());
			ps.setString(10, admission.getLanguage());
			ps.setString(11, admission.getContact());
			ps.setString(12, admission.getFather_cont());
			ps.setString(13, admission.getMother_cont());
			ps.setString(14, admission.getAddress());
			ps.setString(15, admission.getPin());
			ps.setString(16, admission.getEmail());
			ps.setString(17, admission.getW_app_no());
			ps.setString(18, admission.getEnq_taken_by());
			ps.setString(19, admission.getAdm_fees_pack());
			ps.setString(20, admission.getStatus());
			ps.setString(21, admission.getDate());
			ps.setString(22, admission.getRollno());
			ps.setString(23, admission.getRegno());
			ps.setString(24, admission.getInvoice_no());
			ps.setString(25, admission.getStandard());
			ps.setString(26, admission.getDivision());
			ps.setString(27, admission.getAdmission_date());
			ps.setString(28, admission.getAcad_year());
			ps.setString(29, admission.getJoin_date());
			ps.setLong(30, admission.getFees());
			ps.setLong(31, admission.getDisccount());
			ps.setString(32, Util.currentDate());
			ps.setString(33, admission.getBranch());
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

	public ArrayList<Admission> fetchAllAdmittedStudent(ArrayList<Admission> admission, String branch) {
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		Admission ad=null;
		try {
			con=Util.getDBConnection();
			String query="select `id`,`student_name`,`contact`,`address`,`enq_taken_by`,`adm_fees_pack`,`status`,`date`"
					+ ",`Rollno`,`regno`,`invoice_no`,`admission_date`,`acad_year`,`join_date`,`fees`,`paid_fees`"
					+ ",`remain_fees` from admission where branch=?";
			ps=con.prepareStatement(query);
			ps.setString(1,branch);
			rs=ps.executeQuery();
			while(rs.next())
			{
				ad=new Admission();
				ad.setId(rs.getLong(1));
				ad.setStudent_name(rs.getString(2));
				ad.setContact(rs.getString(3));
				ad.setAddress(rs.getString(4));
				ad.setEnq_taken_by(rs.getString(5));
				ad.setAdm_fees_pack(rs.getString(6));
				ad.setStatus(rs.getString(7));
				ad.setDate(rs.getString(8));
				ad.setRollno(rs.getString(9));
				ad.setRegno(rs.getString(10));
				ad.setInvoice_no(rs.getString(11));
				ad.setAdmission_date(rs.getString(12));
				ad.setAcad_year(rs.getString(13));
				ad.setJoin_date(rs.getString(14));
				ad.setFees(rs.getLong(15));
				ad.setPaid_fees(rs.getLong(16));
				ad.setRemain_fees(rs.getLong(17));
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

	public Enquiry searchStudent(String enq_stud,String branch) {
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		Enquiry eq=null;
		String query="";
		try {
			con=Util.getDBConnection();
			query="select * from enquiry "
					+ "where enq_no=? or sname=? or lname=? or fname=? and branch=?";
			/*query="select `id`,`sname`,`lname`,`fname`,`mname`,`uid`,`dob`,`gender`"
					+ ",`caste`,`category`,`lang`,`stud_cont`,`father_cont`,`mother_cont`"
					+ ",`address`,`pin`,`email`,`w_app_no`,`fees_pack`,`status` from enquiry "
					+ "where id=? or sname=? or lname=? or fname=? and branch=?";*/
			ps=con.prepareStatement(query);
			ps.setString(1, enq_stud);
			ps.setString(2, enq_stud);
			ps.setString(3, enq_stud);
			ps.setString(4, enq_stud);
			ps.setString(5, branch);
			rs=ps.executeQuery();
			while(rs.next())
			{
				eq=new Enquiry();
				eq.setId(rs.getLong(1));
				eq.setSname(rs.getString(2));
				eq.setLname(rs.getString(3));
				eq.setFname(rs.getString(4));
				eq.setMname(rs.getString(5));
				eq.setUid(rs.getString(6));
				eq.setDob(rs.getString(7));
				eq.setGender(rs.getString(8));
				eq.setCaste(rs.getString(9));
				eq.setCategory(rs.getString(10));
				eq.setLang(rs.getString(11));
				eq.setStud_cont(rs.getString(12));
				eq.setFather_cont(rs.getString(13));
				eq.setMother_cont(rs.getString(14));
				eq.setAddress(rs.getString(15));
				eq.setPin(rs.getString(16));
				eq.setEmail(rs.getString(17));
				eq.setW_app_no(rs.getString(18));
				eq.setEnq_date(rs.getString(19));
				eq.setEnq_no(rs.getString(20));
				eq.setEnq_taken_by(rs.getString(21));
				eq.setFees_pack(rs.getString(22));
				eq.setLead_source(rs.getString(23));
				eq.setRemark(rs.getString(24));
				eq.setStatus(rs.getString(25));
				eq.setBranch(rs.getString(26));
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
	public Enquiry searchStudentFromAdmission(String enq_stud,String branch) {
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		Enquiry admission=null;
		String query="";
		System.out.println(enq_stud);
		try {
			con=Util.getDBConnection();
			query="select `id`,`student_name`,`lname`,`fname`,`mname`,`uid`,`dob`,`gender`"
					+ ",`caste`,`category`,`language`,`contact`,`father_cont`,`mother_cont`"
					+ ",`address`,`pin`,`email`,`w_app_no`,`adm_fees_pack`,`status` from"
					+ " admission where id=? and branch=?";
			ps=con.prepareStatement(query);
			ps.setString(1, enq_stud);
			ps.setString(2, branch);
			rs=ps.executeQuery();
			while(rs.next())
			{
				admission=new Enquiry();
				admission.setId(rs.getLong(1));
				admission.setSname(rs.getString(2));
				admission.setLname(rs.getString(3));
				admission.setFname(rs.getString(4));
				admission.setMname(rs.getString(5));
				admission.setUid(rs.getString(6));
				admission.setDob(rs.getString(7));
				admission.setGender(rs.getString(8));
				admission.setCaste(rs.getString(9));
				admission.setCategory(rs.getString(10));
				admission.setLang(rs.getString(11));
				admission.setStud_cont(rs.getString(12));
				admission.setFather_cont(rs.getString(13));
				admission.setMother_cont(rs.getString(14));
				admission.setAddress(rs.getString(15));
				admission.setPin(rs.getString(16));
				admission.setEmail(rs.getString(17));
				admission.setW_app_no(rs.getString(18));
				admission.setFees_pack(rs.getString(19));
				admission.setStatus(rs.getString(20));
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

	public void updateTotalFeesPaid(String rollno, long fees_paid, long fees_remain) {
		Connection con=null;
		PreparedStatement ps=null;
		try {
			con=Util.getDBConnection();
			String query="update admission set paid_fees=? , remain_fees=? where Rollno=?";
			ps=con.prepareStatement(query);
			ps.setLong(1, fees_paid);
			ps.setLong(2, fees_remain);
			ps.setString(3, rollno);
			ps.executeUpdate();
		}catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		finally {
			Util.closeConnection(null, ps, con);
		}
	}

	public Installment saveInstallment(Installment installment, String branch) {
		Connection con=null;
		PreparedStatement ps=null;
		try {
			con=Util.getDBConnection();
			String query="insert into installment(`rollno`,`stud_name`,`total_fees`,`monthly_payment`,"
					+ "`due_date`,`fees_title`,`paid_amount`,`paid_status`,`branch`)"
					+ "values(?,?,?,?,?,?,0,0,?)";
			ps=con.prepareStatement(query);
			for(int i=0;i<installment.getDue_date().size();i++){
			ps.setString(1, installment.getRollno());
			ps.setString(2, installment.getStud_name());
			ps.setLong(3, installment.getTotal_fees());
			ps.setLong(4, installment.getMonthly_pay().get(i));
			ps.setString(5, installment.getDue_date().get(i));
			ps.setString(6, installment.getFees_title().get(i));
			ps.setString(7, branch);
			ps.executeUpdate();
			}
		}catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		finally {
			Util.closeConnection(null, ps, con);
		}
		return installment;
	}

	public ArrayList<Admission> getPromotionData(Admission admission) {
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		ArrayList<Admission> admissionList=new ArrayList<>();
		Admission ad=new Admission();
		
		try {
			con=Util.getDBConnection();
			String query="select `id`,`student_name`,`fname`,`lname`,`standard`,`division`,`acad_year` from admission where "
					+ "acad_year=? and standard=? and division=? and status=? and branch=?";
			ps=con.prepareStatement(query);
			ps.setString(1,admission.getAcad_year());
			ps.setString(2,admission.getStandard());
			ps.setString(3,admission.getDivision());
			ps.setString(4,admission.getStatus());
			ps.setString(5,admission.getBranch());
			rs=ps.executeQuery();
			while(rs.next())
			{
				ad=new Admission();
				ad.setId(rs.getLong(1));
				ad.setStudent_name(rs.getString(2));
				ad.setLname(rs.getString(3));
				ad.setFname(rs.getString(4));
				ad.setStandard(rs.getString(5));
				ad.setDivision(rs.getString(6));
				ad.setAcad_year(rs.getString(7));
				admissionList.add(ad);
			}
			
		}catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		finally {
			Util.closeConnection(rs, ps, con);
		}
		return admissionList;
	}
		
}
