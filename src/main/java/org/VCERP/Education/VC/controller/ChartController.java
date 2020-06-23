
package org.VCERP.Education.VC.controller;

import java.util.ArrayList;

import org.VCERP.Education.VC.dao.ChartDAO;
import org.VCERP.Education.VC.model.Chart;

public class ChartController {

	public ArrayList<Chart> getChartData() {
		ChartDAO dao=new ChartDAO();
		return dao.getChartData();
	}
	public ArrayList<Chart> getExpenseData(Chart ch, ArrayList<Chart> exp_chart) {
		ChartDAO dao=new ChartDAO();
		return dao.getExpenseData(ch, exp_chart);
	}
	public ArrayList<Chart> getReceiptData(Chart ch, ArrayList<Chart> rec_chart) {
		ChartDAO dao=new ChartDAO();
		return dao.getReceiptData(ch, rec_chart);
	}
	

}
