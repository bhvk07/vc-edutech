$(document)
		.ready(
				function() {
					document.getElementById("add_installment")
							.addEventListener("click", add, false);

					var html1 = '<tr><td><div class="form-group"><div class="input-group"><span class="input-group-addon"> <button type="button" id="remove-row"><i class="glyphicon glyphicon-trash"></i></button></span><input type="date" class="form-control" id="datetimepicker4" style=" width:"30px" "/></div></div></td><td><div class="form-group"><div class="input-group"><select name="feestype" class="form-control" id="feestype"><option value="ActivityFees">Activity Fees</option> <option value="AdmissionForm">Admission Form</option> <option value="AnnualDayFees">AnnualDayFees</option><option value="BoardExamFees">BoardExamFees</option><option value="BooksFees">BooksFees</option> <option value="ComputerFees">ComputerFees</option><option value="DonationFees">DonationFees</option><option value="Downpayment">Downpayment</option><option value="EducationalTripFees">EducationalTripFees</option> <option value="ExamFees">ExamFees</option> <option value="ID_Calendar_Form">ID_Calendar_Form</option> <option value="Installments">Installments</option> <option value="LateFees">LateFees</option><option value="LumpsumForm">LumpsumForm</option><option value="MiscellaneousFees">MiscellaneousFees</option><option value="MonthlyFees">MonthlyFees</option><option value="NewAdmission">NewAdmission</option><option value="PartyCharges">PartyCharges</option><option value="Re-AdmissionFees">Re-AdmissionFees</option><option value="StudentKit">StudentKit</option><option value="TermFees">TermFees</option><option value="TransportationFees">TransportationFees</option><option value="TutionFees">TutionFees</option></select><span class="input-group-addon" id="bhvk"></span></div></div></td><td><input type="text" class="form-control" id="amt_installment" name="amt_installment"></td><td><input type="text" class="form-control" id="r_installment" name="r_installment" disabled></td></tr>';

					$(".form_date").datetimepicker("setDate", new Date()); // sets
																			// current
																			// date
					// var curr = document.getElementById("dtp_input2").value;
					var dt = $("#demo").datetimepicker('getDate', new Date());
					// alert(dt);
					// var dt = $("#demo").datetimepicker('getDate',new Date());

					function add() {
						//var fees=document.getElementById("fees").value;
						
						dayValue = document.querySelector('#day');
						output1 = dayValue.value;

						noiValue = document.querySelector('#numofInstallment');
						output2 = noiValue.value;
						
						var fees;
						fees=document.getElementById("total-amt").value;
						console.log(fees);
						if(fees=="0.00")
							{
							fees=document.getElementById("fees").value;
							fees=fees.split("|");
							fees=fees[1];
							console.log(fees);
							}
						//var output3=fees.split("|");

						// dValue = document.querySelector('#datetimepicker4');
						// // var idate =
						// $("#datetimepicker4").datepicker("getDate");
						// output3 = dValue.value;

						amtValue = document.querySelector('#amt_installment');
						output4 = amtValue.value;

						var res = (fees- output4) / output2;

						// alert(output4);

						for (i = 0; i < output2; i++) {

							// $("#add_installment").on("click",function(){
							$("table #i-details")
									.append(
											'<tr><td><div class="form-group"><div class="input-group date form_date" id="demo" data-date="" data-date-format="dd/mm/yyyy" data-link-field="dtp_input2"><input class="form-control display-date" size="16" id="display" type="text" value="" readonly><span class="input-group-addon"><span class="fa fa-remove"></span></span><span class="input-group-addon"><span class="fa fa-calendar"></span></span></div><input type="hidden" id="dtp_input2" class="final" value="" /><br/></div></td><td><div class="form-group"><div class="input-group"><select name="feestype" class="form-control" id="feestype"><option value="ActivityFees">Activity Fees</option> <option value="AdmissionForm">Admission Form</option> <option value="AnnualDayFees">AnnualDayFees</option><option value="BoardExamFees">BoardExamFees</option><option value="BooksFees">BooksFees</option> <option value="ComputerFees">ComputerFees</option><option value="DonationFees">DonationFees</option><option value="Downpayment">Downpayment</option><option value="EducationalTripFees">EducationalTripFees</option> <option value="ExamFees">ExamFees</option> <option value="ID_Calendar_Form">ID_Calendar_Form</option> <option value="Installments">Installments</option> <option value="LateFees">LateFees</option><option value="LumpsumForm">LumpsumForm</option><option value="MiscellaneousFees">MiscellaneousFees</option><option value="MonthlyFees">MonthlyFees</option><option value="NewAdmission">NewAdmission</option><option value="PartyCharges">PartyCharges</option><option value="Re-AdmissionFees">Re-AdmissionFees</option><option value="StudentKit">StudentKit</option><option value="TermFees">TermFees</option><option value="TransportationFees">TransportationFees</option><option value="TutionFees">TutionFees</option></select><span class="input-group-addon" id="bhvk"></span></div></div></td><td><input type="number" class="form-control d-row" id="amt_installment_'
													+ i
													+ '" name="amt_installment" ></td><td><input type="text" class="form-control" id="r_installment" name="r_installment" disabled></td></tr>');

						}

						var r = document.getElementById('i-details');
						var no = r.rows.length - 1;
						var rest_rows;
						var arr = [];
						$("#i-details tr:nth-child(n + 2)").each(
								function() {
									rest_rows = $(this).find(
											'input[name^="amt_installment"]')
											.attr('id').toString();
									arr.push(rest_rows);
								});

						var day_res = output1.replace(/(\d+)(st|nd|rd|th)/,
								"$1");

						for (j = 1; j <= no; j++) {

							dt.setMonth(dt.getMonth() + 1, day_res);

							// alert(dt);
							document.getElementsByClassName("display-date")[j - 1]
									.setAttribute("value", dt
											.toLocaleDateString());
							var brk = document.getElementsByClassName("d-row")[j - 1]
									.setAttribute("value", res);

						}

					}
					// });
					/*
					 * function fetch(var x) { x=3; alert(x);
					 * 
					 *  }
					 */

					$(function() {
						$("#installment_table").on('click', '#remove-row1',
								function() {
									$(this).closest('tr').remove();
								});
					});

				});
