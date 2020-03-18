package org.VCERP.Education.VC.model;

public class ReceiptDetails {

	private long id;
	private String stud_name;
	private String receipt_date;
	private String receipt_no;
	private long received_amt;
	private String pay_mode;
	private String trans_status;
	private String trans_date;
	private String trans_no;
	private String received_by;
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getStud_name() {
		return stud_name;
	}
	public void setStud_name(String stud_name) {
		this.stud_name = stud_name;
	}
	public String getReceipt_date() {
		return receipt_date;
	}
	public void setReceipt_date(String receipt_date) {
		this.receipt_date = receipt_date;
	}
	public String getReceipt_no() {
		return receipt_no;
	}
	public void setReceipt_no(String receipt_no) {
		this.receipt_no = receipt_no;
	}
	public long getReceived_amt() {
		return received_amt;
	}
	public void setReceived_amt(long received_amt) {
		this.received_amt = received_amt;
	}
	public String getPay_mode() {
		return pay_mode;
	}
	public void setPay_mode(String pay_mode) {
		this.pay_mode = pay_mode;
	}
	public String getTrans_status() {
		return trans_status;
	}
	public void setTrans_status(String trans_status) {
		this.trans_status = trans_status;
	}
	public String getTrans_date() {
		return trans_date;
	}
	public void setTrans_date(String trans_date) {
		this.trans_date = trans_date;
	}
	public String getTrans_no() {
		return trans_no;
	}
	public void setTrans_no(String trans_no) {
		this.trans_no = trans_no;
	}
	public String getReceived_by() {
		return received_by;
	}
	public void setReceived_by(String received_by) {
		this.received_by = received_by;
	}
	
	
}
