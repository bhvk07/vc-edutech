
var payDate=new Array();
var expDate;
var exp_amt;
var rec_date;
var conversion;
var rec_amt;
var adm_date;
var adm_amt;
var paymentValue=new Array();
var title="payment";
var dates;
var splitted_start_date;
var splitted_end_date;
$(document).ready(function(){
	 	var start = moment().startOf('month');
	    var end = moment().endOf('month');
	    /*const Yesterday = [moment().subtract(1, 'days'), moment().subtract(1, 'days')];
	    alert("yes"+Yesterday);*/
	    function cb(start, end) {
	        $('#e2').val(start.format('YYYY/MM/DD') + ' - ' + end.format('YYYY/MM/DD')).trigger('change');
	        
	    }
	    $('#e2').daterangepicker({
	        startDate: start,
	        
	        
	        endDate: end,
	        locale: {
                format: 'YYYY/MM/DD'
              },
	        ranges: {
	           'Today': [moment(), moment()],
	           'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
	           'Last 7 Days': [moment().subtract(6, 'days'), moment()],
	           'Last 30 Days': [moment().subtract(29, 'days'), moment()],
	           'This Month': [moment().startOf('month'), moment().endOf('month')],
	           'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
	        }
	    }, cb);

	    //cb(start, end);

	
/*	$("#e2").daterangepicker({
	     datepickerOptions : {
	         numberOfMonths : 2
	     },
	     
	    
	     presetRanges: [{
	         text: 'Today',
	         dateStart: function() { return moment() },
	         dateEnd: function() { return moment() }
	     }]
	    
	 });*/
	//getSalesCard();
	
	$('#e2').change(function()
	{ 
		alert("hie");
		expDate = new Array();
		exp_amt = new Array(); 
		rec_date = new Array();
		rec_amt =  new Array();
		adm_date = new Array();
		adm_amt =  new Array();
		
		var d_val = $(this).val().split('-');
		//var d_val = $(this).val().split(',');
		alert("date="+d_val);
		var start = d_val[0];
		alert("start"+start);
		var end = d_val[1];
		alert("end"+end);
		const search = '/';
		const replaceWith = '-';
		
				var splitted_start_date = start.split(search).join(replaceWith);
				alert("splitted_start_date"+splitted_start_date);
				var splitted_end_date = end.split(search).join(replaceWith);
				alert("splitted_end_date"+splitted_end_date);
				getExpenseChart(splitted_start_date, splitted_end_date);
				getReceiptChart(splitted_start_date, splitted_end_date);
				getAdmissionChart(splitted_start_date, splitted_end_date);
				getConversionChart(splitted_start_date,splitted_end_date);
				getSalesCard();
	});
	
	
	
   
});

function Expense_chart() {
	  var ctx, data, myBarChart, option_bars;
	  Chart.defaults.global.responsive = true;
	  ctx = $('#Exp_chart').get(0).getContext('2d'); //done
	  option_bars = {
	    scaleBeginAtZero: true,
	    scaleShowGridLines: false,
	    scaleGridLineColor: "rgba(0,0,0,.05)",
	    scaleGridLineWidth: 1,
	    scaleShowHorizontalLines: true,
	    scaleShowVerticalLines: false,
	    barShowStroke: true,
	    barStrokeWidth: 1,
	    barValueSpacing: 5,
	    barDatasetSpacing: 3,
	    
	  };
	  data = {
		
	    labels: expDate,
	    datasets: [
	      {
	    	  
	    	
	        label: "My First dataset",
	        fillColor: "rgba(26, 188, 156,0.6)",
	        strokeColor: "#1ABC9C",
	        pointColor: "#1ABC9C",
	        pointStrokeColor: "#fff",
	        pointHighlightFill: "#fff",
	        pointHighlightStroke: "#1ABC9C",
	        data: exp_amt
	      } 
	     
	    ]
	  
	  };
	 
	  myBarChart = new Chart(ctx).Bar(data, option_bars);
	  
	}



function Receipt_chart() {
	  var ctx, data, myBarChart, option_bars;
	  Chart.defaults.global.responsive = true;
	  ctx = $('#Rec_chart').get(0).getContext('2d'); //done
	  option_bars = {
	    scaleBeginAtZero: true,
	    scaleShowGridLines: false,
	    scaleGridLineColor: "rgba(0,0,0,.05)",
	    scaleGridLineWidth: 1,
	    scaleShowHorizontalLines: true,
	    scaleShowVerticalLines: false,
	    barShowStroke: true,
	    barStrokeWidth: 1,
	    barValueSpacing: 5,
	    barDatasetSpacing: 3,
	    
	  };
	  data = {
		
	    labels: rec_date,
	    datasets: [
	      {
	    	  
	    	
	        label: "My First dataset",
	        fillColor: "rgba(26, 188, 156,0.6)",
	        strokeColor: "#1ABC9C",
	        pointColor: "#1ABC9C",
	        pointStrokeColor: "#fff",
	        pointHighlightFill: "#fff",
	        pointHighlightStroke: "#1ABC9C",
	        data: rec_amt
	      } 
	     
	    ]
	  
	  };
	 
	  myBarChart = new Chart(ctx).Bar(data, option_bars);
	  
	}

function Admission_chart() {
	  var ctx, data, myBarChart, option_bars;
	  Chart.defaults.global.responsive = true;
	  ctx = $('#Adm_chart').get(0).getContext('2d'); //done
	  option_bars = {
	    scaleBeginAtZero: true,
	    scaleShowGridLines: false,
	    scaleGridLineColor: "rgba(0,0,0,.05)",
	    scaleGridLineWidth: 1,
	    scaleShowHorizontalLines: true,
	    scaleShowVerticalLines: false,
	    barShowStroke: true,
	    barStrokeWidth: 1,
	    barValueSpacing: 5,
	    barDatasetSpacing: 3,
	    
	  };
	  data = {
		
	    labels: adm_date,
	    datasets: [
	      {
	    	  
	    	
	        label: "My First dataset",
	        fillColor: "rgba(26, 188, 156,0.6)",
	        strokeColor: "#1ABC9C",
	        pointColor: "#1ABC9C",
	        pointStrokeColor: "#fff",
	        pointHighlightFill: "#fff",
	        pointHighlightStroke: "#1ABC9C",
	        data: adm_amt
	      } 
	     
	    ]
	  
	  };
	 
	  myBarChart = new Chart(ctx).Bar(data, option_bars);
	  
	}







function getConversionChart(splitted_start_date, splitted_end_date){
	function callback(responseData, textStatus, request){
		
		alert("len"+responseData.length);
		for ( var i in responseData) {
			
			alert("percentage = "+responseData[i].conv_percent);
			conversion = parseInt(responseData[i].conv_percent);
			alert("succ"+ typeof(conversion));
			
			
		}
		
		conversion_chart();
	}
	function errorCallback(responseData, textStatus, request){
		
	}
	var httpMethod = "POST";
	var formData = {
			start_date : splitted_start_date,
			end_date :	splitted_end_date,
			branch : branchSession
	}
	
	var relativeUrl = "/chart/getConversionChart";

	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}



function getAdmissionChart(splitted_start_date, splitted_end_date){
	function callback(responseData, textStatus, request){
		
		alert("len"+responseData.length);
		for ( var i in responseData) {
			
			//alert("date = "+responseData[i].date + responseData[i].amount);
			adm_date.push(responseData[i].date);
			adm_amt.push(responseData[i].amount);
			
			
		}
		
		Admission_chart();
	}
	function errorCallback(responseData, textStatus, request){
		
	}
	var httpMethod = "POST";
	var formData = {
			start_date : splitted_start_date,
			end_date :	splitted_end_date,
			branch : branchSession
	}
	
	var relativeUrl = "/chart/getAdmissionChart";

	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}
function getExpenseChart(splitted_start_date, splitted_end_date){
	function callback(responseData, textStatus, request){
		
		alert("len"+responseData.length);
		for ( var i in responseData) {
			
			
			expDate.push(responseData[i].date);
			exp_amt.push(responseData[i].amount);
			
			//alert("date = "+responseData[i].date + responseData[i].amount)
		}
		
		 Expense_chart();
	}
	function errorCallback(responseData, textStatus, request){
		
	}
	var httpMethod = "POST";
	var formData = {
			start_date : splitted_start_date,
			end_date :	splitted_end_date,
			branch : branchSession
	}
	alert("data"+splitted_start_date+ splitted_end_date+branchSession);
	var relativeUrl = "/chart/getExpenseChart";

	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}

function getReceiptChart(splitted_start_date, splitted_end_date){
	function callback(responseData, textStatus, request){
		
		alert("len"+responseData.length);
		for ( var i in responseData) {
			
			//alert("date = "+responseData[i].date + responseData[i].amount);
			rec_date.push(responseData[i].date);
			rec_amt.push(responseData[i].amount);
			
			
		}
		
		Receipt_chart();
	}
	function errorCallback(responseData, textStatus, request){
		
	}
	var httpMethod = "POST";
	var formData = {
			start_date : splitted_start_date,
			end_date :	splitted_end_date,
			branch : branchSession
	}
	
	var relativeUrl = "/chart/getReceiptChart";

	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}






//		trying speedo
function conversion_chart(){
/*var arr = '11';
var parr = parseInt(arr);
alert("val"+typeof(parr));*/
Highcharts.chart('container', {

    chart: {
        type: 'gauge',
        /*plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false*/
    },

    title: {
        text: 'Conversion Ratio'
    },
    pane: {
        startAngle: -150,
        endAngle: 150
    },

    pane: {
        startAngle: -150,
        endAngle: 150,
        background: [{
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#FFF'],
                    [1, '#333']
                ]
            },
            borderWidth: 0,
            outerRadius: '109%'
        }, {
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#333'],
                    [1, '#FFF']
                ]
            },
            borderWidth: 1,
            outerRadius: '107%'
        }, {
            // default background
        }, {
            backgroundColor: '#DDD',
            borderWidth: 0,
            outerRadius: '105%',
            innerRadius: '103%'
        }]
    },

    // the value axis
    yAxis: {
        min: 0,
        max: 100,

        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10,
        minorTickPosition: 'inside',
        minorTickColor: '#666',

        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
            step: 2,
            rotation: 'auto'
        },
        title: {
            text: '%'
        },
        plotBands: [{
            from: 0,
            to: 120,
            color: '#55BF3B' // green
        }, {
            from: 120,
            to: 160,
            color: '#DDDF0D' // yellow
        }, {
            from: 160,
            to: 200,
            color: '#DF5353' // red
        }]
    },
    /*plotOptions: {
        gauge: {
            dial: {
                radius: '100%',
                backgroundColor: 'silver',
                borderColor: 'black',
                borderWidth: 1,
                baseWidth: 10,
                topWidth: 1,
                baseLength: '90%', // of radius
                rearLength: '50%'
            }
        }
    },*/

    series: [{
        name: 'Percentage Conversion',
        data: [conversion]
        /*tooltip: {
            valueSuffix: '%'
        }*/
    }]

});
}



/*	Cards DATA */

function getSalesCard(){
	function callback(responseData, textStatus, request){
		
		alert("sales"+responseData.length);
		for ( var i in responseData) {
			
			alert("sales = "+responseData[i].amount);
			sales = responseData[i].amount;
			document.getElementById('sales_card').innerHTML = sales;
			
			
		}
		
		
	}
	function errorCallback(responseData, textStatus, request){
		
	}
	var httpMethod = "GET";
	var relativeUrl = "/chart/getSalesCard?branch="+branchSession;
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}

function getReceivedCard(){
	function callback(responseData, textStatus, request){
		
		alert("received"+responseData.length);
		for ( var i in responseData) {
			
			//alert("sales = "+responseData[i].amount);
			received = responseData[i].amount;
			document.getElementById('received_card').innerHTML = received;
			
			
		}
		
		
	}
	function errorCallback(responseData, textStatus, request){
		
	}
	var httpMethod = "POST";
	var formData = {
			start_date : splitted_start_date,
			end_date :	splitted_end_date,
			branch : branchSession
	}
	var relativeUrl = "/chart/getReceivedCard";
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}


/* END CARDS */


/*function Expense_chart(){
Highcharts.chart('Exp_chart', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Expense'
    },
    subtitle: {
        text: 'Source: WorldClimate.com'
    },
    xAxis: {
        categories: expDate,
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Rainfall (mm)'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [{
        name: 'Expense',
        data: exp_amt

    }]
});



}
*/


/*function getChartData(){
	function callback(responseData, textStatus, request){
		for ( var i in responseData) {
			payDate.push(responseData[i].date);
			paymentValue.push(responseData[i].payment);
		}
		
		mychart();
	}
	function errorCallback(responseData, textStatus, request){
		
	}
	var httpMethod = "GET";
	var relativeUrl = "/chart/getChartData";

	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}*/



