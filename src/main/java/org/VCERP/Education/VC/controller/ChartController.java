package org.VCERP.Education.VC.controller;

import java.util.ArrayList;

import org.VCERP.Education.VC.dao.ChartDAO;
import org.VCERP.Education.VC.model.Chart;

public class ChartController {

	public ArrayList<Chart> getChartData() {
		ChartDAO dao=new ChartDAO();
		return dao.getChartData();
	}

}
