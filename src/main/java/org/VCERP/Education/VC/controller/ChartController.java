
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
	public ArrayList<Chart> getConversionData(Chart ch, ArrayList<Chart> conv_chart) {
		ChartDAO dao=new ChartDAO();
		return dao.getConversionData(ch, conv_chart);
	}
	
	
	public ArrayList<Chart> getSalesCard(Chart ch, ArrayList<Chart> sales_card) {
		ChartDAO dao=new ChartDAO();
		return dao.getSalesCard(ch, sales_card);
	}
	public ArrayList<Chart> getReceivedCard(Chart ch, ArrayList<Chart> received_card) {
		ChartDAO dao=new ChartDAO();
		return dao.getReceivedCard(ch, received_card);
	}
	
	public ArrayList<Chart> getReceivableCard(Chart ch, ArrayList<Chart> receivable_card) {
		ChartDAO dao=new ChartDAO();
		return dao.getReceivableCard(ch, receivable_card);
	}
	
	public ArrayList<Chart> getNetIncomeCard(Chart ch, ArrayList<Chart> income_card) {
		ChartDAO dao=new ChartDAO();
		return dao.getNetIncomeCard(ch, income_card);
	}

}
