package org.VCERP.Education.VC.dao;

import java.sql.Array;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import org.VCERP.Education.VC.model.FeesPackage;
import org.VCERP.Education.VC.utility.Util;

public class FeesPackageDAO {

	public void addNewFeesPackage(FeesPackage pack) {
		Connection con=null;
		PreparedStatement ps=null;
		try {
			con=Util.getDBConnection();
			String query="insert into fees_package(`fees_pack`,`standard`,`branch`,`fees_details`,`total_amount`,`created_date`)"
					+ "values(?,?,?,?,?,?)";
			ps=con.prepareStatement(query);
			ps.setString(1, pack.getFeesPackage());
			ps.setString(2, pack.getStandard());
			ps.setString(3, pack.getBranch());
			ps.setString(4, pack.getFees_details());
			ps.setString(5, pack.getTotal_amt());
			ps.setString(6, Util.currentDate());
			ps.executeUpdate();
		}catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		finally {
			Util.closeConnection(null, ps, con);
		}
	}

	public ArrayList<FeesPackage> getFeesPackage(String branch) {
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		ArrayList<FeesPackage> pack=new ArrayList<>();
		try {
			con=Util.getDBConnection();
			String query="select * from fees_package where branch=?";
			ps=con.prepareStatement(query);
			ps.setString(1, branch);
			rs=ps.executeQuery();
			while(rs.next()){
			FeesPackage fees=new FeesPackage();
			fees.setId(rs.getLong(1));
			fees.setFeesPackage(rs.getString(2));
			fees.setStandard(rs.getString(3));
			fees.setBranch(rs.getString(4));
			fees.setFees_details(rs.getString(5));
			fees.setTotal_amt(rs.getString(6));
			fees.setCreated_by(rs.getString(7));
			fees.setCreated_date(rs.getString(8));
			pack.add(fees);
			}
		}catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		finally {
			Util.closeConnection(null, ps, con);
		}
		return pack;
	}

	public ArrayList<String> getBranchSpecificStandard(String branch) {
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		ArrayList<String> std=new ArrayList<>();
		try {
			con=Util.getDBConnection();
			String query="select `standard`,`standard_fees` from standard_master where branch=?";
			ps=con.prepareStatement(query);
			ps.setString(1, branch);
			rs=ps.executeQuery();
			while(rs.next()){
			String standard=rs.getString(1)+"|"+rs.getString(2);
			std.add(standard);
			}
		}catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		finally {
			Util.closeConnection(null, ps, con);
		}
		return std;
	}

	public ArrayList<String> loadBranch(String std) {
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		ArrayList<String> branch=new ArrayList<>();
		try {
			con=Util.getDBConnection();
			String query="select `branch` from standard_master where standard=?";
			ps=con.prepareStatement(query);
			ps.setString(1, std);
			rs=ps.executeQuery();
			while(rs.next()){
			String standard=rs.getString(1);
			branch.add(standard);
			}
		}catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		finally {
			Util.closeConnection(null, ps, con);
		}
		return branch;
	}
}
