package org.VCERP.Education.VC.controller;

import java.util.ArrayList;


import org.VCERP.Education.VC.dao.ExpenseDAO;
import org.VCERP.Education.VC.model.Expense;
import org.VCERP.Education.VC.model.Vendor;
public class ExpenseController{
	
	public Expense addSubject(Expense exp) {
		ExpenseDAO dao=new ExpenseDAO();
		return dao.addExpense(exp);
	}
	public ArrayList<Expense> FetchAllExpense(String branch) {
		ExpenseDAO dao=new ExpenseDAO();
		return dao.FetchAllExpense(branch);
	}
	public Vendor addVendor(Vendor ven) {
		ExpenseDAO dao=new ExpenseDAO();
		return dao.addVendor(ven);
	}
	
	public ArrayList<Vendor> LoadVendor() {
		ExpenseDAO dao=new ExpenseDAO();
		return dao.LoadVendor();
	}
}