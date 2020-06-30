
package org.VCERP.Education.VC.controller;

import java.util.ArrayList;

import org.VCERP.Education.VC.dao.ChartDAO;
import org.VCERP.Education.VC.model.Chart;

public class ChartController {

	
	public ArrayList<Chart> getExpenseData(Chart ch, ArrayList<Chart> exp_chart) {
		ChartDAO dao=new ChartDAO();
		return dao.getExpenseData(ch, exp_chart);
	}
	public ArrayList<Chart> getReceiptData(Chart ch, ArrayList<Chart> rec_chart) {
		ChartDAO dao=new ChartDAO();
		return dao.getReceiptData(ch, rec_chart);
	}
	
	public ArrayList<Chart> getAdmissionData(Chart ch, ArrayList<Chart> adm_chart) {
		ChartDAO dao=new ChartDAO();
		return dao.getAdmissionData(ch, adm_chart);
	}
	public Integer getConversionData(Chart ch) {
		ChartDAO dao=new ChartDAO();
		return dao.getConversionData(ch);
	}
	
	
	public Integer getSalesCard(Chart ch) {
		ChartDAO dao=new ChartDAO();
		return dao.getSalesCard(ch);
	}
	public Integer getReceivedCard(Chart ch) {
		ChartDAO dao=new ChartDAO();
		return dao.getReceivedCard(ch);
	}
	
	public Integer getReceivableCard(Chart ch) {
		ChartDAO dao=new ChartDAO();
		return dao.getReceivableCard(ch);
	}
	
	public Integer getNetIncomeCard(Chart ch) {
		ChartDAO dao=new ChartDAO();
		return dao.getNetIncomeCard(ch);
	}

}
