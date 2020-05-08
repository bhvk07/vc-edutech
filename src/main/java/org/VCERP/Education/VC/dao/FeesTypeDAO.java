package org.VCERP.Education.VC.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import org.VCERP.Education.VC.model.FeesType;
import org.VCERP.Education.VC.utility.Util;

public class FeesTypeDAO {

	public void addNewFeesType(FeesType type) {
		Connection con = null;
		PreparedStatement ps = null;
		try {
			con = Util.getDBConnection();
			String query = "insert into feestype(`created_date`,`feestype`) values(?,?)";
			ps = con.prepareStatement(query);
			ps.setString(1, type.getCreatedDate());
			ps.setString(2, type.getFeesType());
			ps.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public ArrayList<FeesType> getFeesType() {
		Connection con = null;
		PreparedStatement ps = null;
		ResultSet rs=null;
		ArrayList<FeesType> type=new ArrayList<>();
		try {
			con = Util.getDBConnection();
			String query = "select * from feestype";
			ps = con.prepareStatement(query);
			rs=ps.executeQuery();
			while(rs.next())
			{
				FeesType fees=new FeesType();
				fees.setId(rs.getLong(1));
				fees.setCreatedDate(rs.getString(2));
				fees.setFeesType(rs.getString(3));
				type.add(fees);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return type;
	}

}
