 $(document).ready(function() {
					        var chk = 'input[id="checkbox"]';
					        var $edit = $("#editBtn").hide();
					        var $del = $("#deleteBtn").hide();
					        var $view = $("#btn-view").hide();
					        var $pdf = $(".btn-secondary").hide();
					        

					          $(document).on('change','.TableClass input:checkbox',function () {
						  		    if($('.TableClass input:checkbox:checked').length > 1 ){
						  		    	$('#editBtn').hide();
						  		    	$('#btn-view').hide();
						  		    	$(".btn-secondary").hide();
						  		    	 $('#deleteBtn').show();
						  		    	
						  		    }
						  		    else  if($('.TableClass input:checkbox:checked').length == 0) {
						  		    
						  		    	$('#deleteBtn').hide();
						  		    	$('#editBtn').hide();
						  		    	$('#btn-view').hide();
						  		    	$(".btn-secondary").hide();
						  		    	
						  		    }
						  		    else  {
						  		    	$('#editBtn').show();
						  		    	 $('#deleteBtn').show();
						  		    	$('#btn-view').show();
						  		    	$(".btn-secondary").hide();
						  		    	
						  		    }
				  		   
						  		});

					      });
