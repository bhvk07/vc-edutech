package org.VCERP.Education.VC.dao;

import java.sql.Array;
import java.sql.Connection;
import java.sql.PreparedStatement;

import org.VCERP.Education.VC.model.FeesPackage;
import org.VCERP.Education.VC.utility.Util;

public class FeesPackageDAO {

	public void addNewFeesPackage(FeesPackage pack) {
		Connection con=null;
		PreparedStatement ps=null;
		try {
			con=Util.getDBConnection();
			String query="insert into fees_package(`fees_pack`,`standard`,`branch`,`total_amount`,`created_date`)"
					+ "values(?,?,?,?,?,?,?,?)";
			ps=con.prepareStatement(query);
			ps.setString(1, pack.getFeesPackage());
			ps.setString(2, pack.getStandard());
			ps.setString(3, pack.getBranch());
			ps.setString(4, pack.getTotal_amt());
			ps.setString(5, Util.currentDate());
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
