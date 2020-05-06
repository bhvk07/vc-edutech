$(document).ready(function(){
	var table = $("#admissin_table").DataTable();
});

      	
    	   
          function BuildChart(labels,values,chartTitle){
        	  alert("l"+labels);
        	  var ctx = document.getElementById("mychart1").getContext('2d');
        	  var mychart = new Chart(ctx,{
        		  type: 'bar',
        		  data:{
        			  labels:labels,
        			  datasets: [{
        				  label: chartTitle, /*  Name the series */
        			        data: values,  /* Our values */
        			        backgroundColor: [  /* Specify custom colors */
        			          'rgba(255, 99, 132, 0.2)',
        			          'rgba(54, 162, 235, 0.2)',
        			          'rgba(255, 206, 86, 0.2)',
        			          'rgba(75, 192, 192, 0.2)',
        			          'rgba(153, 102, 255, 0.2)',
        			          'rgba(255, 159, 64, 0.2)'
        			        ],
        			        borderColor: [  /* Add custom color borders */
        			            'rgba(255,99,132,1)',
        			            'rgba(54, 162, 235, 1)',
        			            'rgba(255, 206, 86, 1)',
        			            'rgba(75, 192, 192, 1)',
        			            'rgba(153, 102, 255, 1)',
        			            'rgba(255, 159, 64, 1)'
        			        ],
        			        borderWidth: 1  /* Specify bar border width */
        			  }]
        		  },
        		  options:{
        			  responsive:true,
        			  maintainAspectRatio: false,
        		  }
        		  
        	  });
        	  return mychart;
          }
          
 
      

/*$(document).ready(function(){
	//var table = $("#admission_table").DataTable();
	//var count = localStorage.getItem("count");
	//var arr = [];
	count.each(function(){
		arr.push(this);
	})
	var json = [];
	var headers = [];
	for (var i = 0; i < table.rows.cells.length; i++) {
		  headers[i] = table.rows.cells[i].innerHTML.toLowerCase().replace(/ /gi, '');
		}
	for (var i = 1; i < table.rows.length; i++) {
		  var tableRow = table.rows[i];
		  var rowData = {};
		  for (var j = 0; j < tableRow.cells.length; j++) {
		    rowData[headers[j]] = tableRow.cells[j].innerHTML;
		  }

		  json.push(rowData);
		}
	alert(json);
});

//count = table.rows*/