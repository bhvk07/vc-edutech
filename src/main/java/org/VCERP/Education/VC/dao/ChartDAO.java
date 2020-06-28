
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
	public ArrayList<Chart> getExpenseData(Chart ch, ArrayList<Chart> exp_chart) {
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		
		try {
			con=Util.getDBConnection();
			String query="select exp_date, SUM(amount) from expenses where exp_date BETWEEN ? AND ? AND branch=? GROUP BY exp_date";
			ps=con.prepareStatement(query);
			ps.setString(1, ch.getS_date());
			ps.setString(2, ch.getE_date());
			ps.setString(3, ch.getBranch());
			rs=ps.executeQuery();
			while(rs.next())
			{
				Chart chart=new Chart();
				chart.setDate(rs.getString(1));
				chart.setAmount(rs.getString(2));
				exp_chart.add(chart);
			}
		}catch(Exception e){
			e.printStackTrace();
			System.out.println(e);
		}
		finally {
			Util.closeConnection(rs, ps, con);
		}
		return exp_chart;
	}
	
	
	public ArrayList<Chart> getReceiptData(Chart ch, ArrayList<Chart> rec_chart) {
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		
		try {
			con=Util.getDBConnection();
			String query="select  receipt_date, SUM(payment) from receipt_details WHERE receipt_date BETWEEN ? AND ? AND branch=? GROUP BY receipt_date";
			ps=con.prepareStatement(query);
			ps.setString(1, ch.getS_date());
			ps.setString(2, ch.getE_date());
			ps.setString(3, ch.getBranch());
			rs=ps.executeQuery();
			while(rs.next())
			{
				Chart chart=new Chart();
				chart.setDate(rs.getString(1));
				chart.setAmount(rs.getString(2));
				
				
				rec_chart.add(chart);
			}
		}catch(Exception e){
			e.printStackTrace();
			System.out.println(e);
		}
		finally {
			Util.closeConnection(rs, ps, con);
		}
		return rec_chart;
	}
	
	
	public ArrayList<Chart> getAdmissionData(Chart ch, ArrayList<Chart> adm_chart) {
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		
		try {
			con=Util.getDBConnection();
			String query="select  admission_date, SUM(fees) from admission WHERE admission_date BETWEEN ? AND ? AND branch=? GROUP BY admission_date";
			ps=con.prepareStatement(query);
			System.out.println("data="+ch.getS_date()+ch.getE_date()+ch.getBranch());
			ps.setString(1, ch.getS_date());
			ps.setString(2, ch.getE_date());
			ps.setString(3, ch.getBranch());
			rs=ps.executeQuery();
			while(rs.next())
			{
				Chart chart=new Chart();
				chart.setDate(rs.getString(1));
				chart.setAmount(rs.getString(2));
				
				
				adm_chart.add(chart);
			}
		}catch(Exception e){
			e.printStackTrace();
			System.out.println(e);
		}
		finally {
			Util.closeConnection(rs, ps, con);
		}
		return adm_chart;
	}
	
	
	
	
	public ArrayList<Chart> getConversionData(Chart ch, ArrayList<Chart> conv_chart) {
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		
		try {
			con=Util.getDBConnection();
			String query="select SUM(status = 'Admitted' ) * 100 / (SELECT COUNT(*) from enquiry WHERE branch=?) from enquiry WHERE enq_date BETWEEN ? AND ? AND branch=?";
			ps=con.prepareStatement(query);
			System.out.println(ch.getBranch()+ch.getS_date()+ch.getE_date()+ch.getBranch());
			ps.setString(1, ch.getBranch());
			
			ps.setString(2, ch.getS_date());
			ps.setString(3, ch.getE_date());
			ps.setString(4, ch.getBranch());
			rs=ps.executeQuery();
			while(rs.next())
			{
				Chart chart=new Chart();
				chart.setConv_percent(rs.getString(1));
				conv_chart.add(chart);
			}
		}catch(Exception e){
			e.printStackTrace();
			System.out.println(e);
		}
		finally {
			Util.closeConnection(rs, ps, con);
		}
		return conv_chart;
	}
	
	
	
	public ArrayList<Chart> getSalesCard(String branch) {
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		ArrayList<Chart> SalesData=new ArrayList<>();
		try {
			con=Util.getDBConnection();
			String query="SELECT SUM(fees) FROM `admission` WHERE branch=?";
			
			ps=con.prepareStatement(query);
			ps.setString(1,branch);
			rs=ps.executeQuery();
			while(rs.next())
			{
				Chart chart=new Chart();
				chart.setAmount(rs.getString(1));
				SalesData.add(chart);
			}
		}catch(Exception e){
			e.printStackTrace();
			System.out.println(e);
		}
		finally {
			Util.closeConnection(rs, ps, con);
		}
		return SalesData;
	}
}
