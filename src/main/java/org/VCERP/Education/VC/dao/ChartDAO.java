package org.VCERP.Education.VC.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import org.VCERP.Education.VC.model.Chart;
import org.VCERP.Education.VC.utility.Util;

public class ChartDAO {

	public ArrayList<Chart> getChartData() {
		Connection con=null;
		PreparedStatement st=null;
		ResultSet rs=null;
		ArrayList<Chart> chartData=new ArrayList<>();
		try {
			con=Util.getDBConnection();
			String query="select `date`,`paid_fees` from admission";
			st=con.prepareStatement(query);
			rs=st.executeQuery();
			while(rs.next())
			{
				Chart chart=new Chart();
				chart.setDate(rs.getString(1));
				chart.setPayment(rs.getString(2));
				chartData.add(chart);
			}
		}catch(Exception e){
			e.printStackTrace();
			System.out.println(e);
		}
		finally {
			Util.closeConnection(rs, st, con);
		}
		return chartData;
	}

}
