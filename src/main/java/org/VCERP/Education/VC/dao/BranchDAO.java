package org.VCERP.Education.VC.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import org.VCERP.Education.VC.model.Branch;
import org.VCERP.Education.VC.utility.Util;

public class BranchDAO {

	public void addNewBranch(Branch branch) {
		
		Connection con=null;
		PreparedStatement ps=null;
		try {
			con=Util.getDBConnection();
			String query="insert into branch(`branch_name`,`institute_type`,`title`,`subtitle`,`branchCode`,`address`,`email`,"
					+ "`contact`,`telno`,`GSTIN`,`panno`,`country`,`state`,`branch_distinct`,`tehsil`,`created_by`,`created_date`)"
					+ " values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
			
			ps=con.prepareStatement(query);
			ps.setString(1, branch.getBranch());
			ps.setString(2, branch.getInstituteType());
			ps.setString(3, branch.getTitle());
			ps.setString(4, branch.getSubTitle());
			ps.setString(5, branch.getBranchCode());
			ps.setString(6, branch.getAddress());
			ps.setString(7, branch.getEmail());
			ps.setString(8, branch.getContact());
			ps.setString(9, branch.getTelno());
			ps.setString(10, branch.getGSTIN());
			ps.setString(11, branch.getPanNo());
			ps.setString(12, branch.getCountry());
			ps.setString(13, branch.getState());
			ps.setString(14, branch.getDistinct());
			ps.setString(15, branch.getTehsil());
			ps.setString(16, branch.getCreatedBy());
			ps.setString(17, Util.currentDate());
			ps.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
		finally {
			Util.closeConnection(null, ps, con);
		}
	}

	public Branch getBranchDetails(String input) {
		Connection conn=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		Branch branch=null;
		try {
			conn=Util.getDBConnection();
			String query="select * from Branch where branch_name=?";
			ps=conn.prepareStatement(query);
			ps.setString(1, input);
			rs=ps.executeQuery();
			while(rs.next())
			{
				branch=new Branch();
				branch.setId(rs.getLong(1));
				branch.setBranch(rs.getString(2));
				branch.setInstituteType(rs.getString(3));
				branch.setTitle(rs.getString(4));
				branch.setSubTitle(rs.getString(5));
				branch.setBranchCode(rs.getString(6));
				branch.setAddress(rs.getString(7));
				branch.setEmail(rs.getString(8));
				branch.setContact(rs.getString(9));
				branch.setTelno(rs.getString(10));
				branch.setGSTIN(rs.getString(11));
				branch.setPanNo(rs.getString(12));
				branch.setCountry(rs.getString(13));
				branch.setState(rs.getString(14));
				branch.setDistinct(rs.getString(15));
				branch.setTehsil(rs.getString(16));
				branch.setCreatedBy(rs.getString(17));
				branch.setCreated_Date(rs.getString(18));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		finally {
			Util.closeConnection(rs, ps, conn);
		}
		return branch;
	}

	public ArrayList<Branch> getAllBranchDetails() {
		Connection conn=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		Branch branch=null;
		ArrayList<Branch> b=new ArrayList<>();
		try {
			conn=Util.getDBConnection();
			String query="select * from Branch";
			ps=conn.prepareStatement(query);
			rs=ps.executeQuery();
			while(rs.next())
			{
				branch=new Branch();
				branch.setId(rs.getLong(1));
				branch.setBranch(rs.getString(2));
				branch.setInstituteType(rs.getString(3));
				branch.setTitle(rs.getString(4));
				branch.setSubTitle(rs.getString(5));
				branch.setBranchCode(rs.getString(6));
				branch.setAddress(rs.getString(7));
				branch.setEmail(rs.getString(8));
				branch.setContact(rs.getString(9));
				branch.setTelno(rs.getString(10));
				branch.setGSTIN(rs.getString(11));
				branch.setPanNo(rs.getString(12));
				branch.setCountry(rs.getString(13));
				branch.setState(rs.getString(14));
				branch.setDistinct(rs.getString(15));
				branch.setTehsil(rs.getString(16));
				branch.setCreatedBy(rs.getString(17));
				branch.setCreated_Date(rs.getString(18));
				b.add(branch);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		finally {
			Util.closeConnection(rs, ps, conn);
		}
		return b;

	}

}
