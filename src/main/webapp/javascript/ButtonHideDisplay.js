 $(document).ready(function() {
					        var chk = 'input[id="checkbox"]';
					        var $edit = $("#editBtn").hide();
					        var $del = $("#deleteBtn").hide();
					        
					      
					          
					          $(document).on('change','#feestypetable input:checkbox',function () {
						  		    if($('#feestypetable input:checkbox:checked').length > 1 ){
						  		    	$('#editBtn').hide();
						  		    	 $('#deleteBtn').show();
						  		    	
						  		    }
						  		    else  if($('#feestypetable input:checkbox:checked').length == 0) {
						  		    
						  		    	$('#deleteBtn').hide();
						  		    	$('#editBtn').hide();
						  		    	
						  		    }
						  		    else  {
						  		    	$('#editBtn').show();
						  		    	 $('#deleteBtn').show();
						  		    	
						  		    }

						  		   
						  		});
					          
					          
					   
					  		
					  		
					  		
					      });
