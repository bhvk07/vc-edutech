package org.VCERP.Education.VC.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import org.VCERP.Education.VC.model.Standard;
import org.VCERP.Education.VC.utility.Util;


public class StandardDAO {

	public ArrayList<Standard> getAllStandard(String branch) {
			Connection conn=null;
			PreparedStatement ps=null;
			ResultSet rs=null;
			ArrayList<Standard> std=new ArrayList<>();
			Standard standard=null;
			try {
				conn=Util.getDBConnection();
				String query="select * from standard_master where branch=?";
				ps=conn.prepareStatement(query);
				ps.setString(1, branch);
				rs=ps.executeQuery();
				while(rs.next())
				{
					standard=new Standard();
					standard.setId(rs.getLong(1));
					standard.setStandard(rs.getString(2));
					standard.setStd_fees(rs.getString(3));
					standard.setSubject(rs.getString(4));
					standard.setBranch(rs.getString(5));
					standard.setCreated_date(rs.getString(6));
					std.add(standard);
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
			finally {
				Util.closeConnection(rs, ps, conn);
			}
		return std;
	}

	
	public void addStandard(Standard std, ArrayList<String> branch) {
		Connection conn=null;
		PreparedStatement ps=null;
		try{
			conn=Util.getDBConnection();
			String query="insert into standard_master(`standard`,`standard_fees`,`subject`,`branch`,`created_date`)values(?,?,?,?,?)";
			ps=conn.prepareStatement(query);
			for(int i=0;i<branch.size();i++)
			{
			ps.setString(1, std.getStandard());
			ps.setString(2, std.getStd_fees());
			ps.setString(3, std.getSubject());
			ps.setString(4, branch.get(i));
			ps.setString(5, Util.currentDate());
			ps.executeUpdate();
			}
		}catch (Exception e) {
			e.printStackTrace();
		}
		finally {
			Util.closeConnection(null, ps, conn);
		}
	}

	
}
