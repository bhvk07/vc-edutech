package org.VCERP.Education.VC.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;

import org.VCERP.Education.VC.model.ReceiptDetails;
import org.VCERP.Education.VC.utility.Util;

public class ReceiptDetailsDAO {

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

}
