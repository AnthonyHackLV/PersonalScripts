$(document).ready(function() {
    $(function() {
        $("#selector").on("change", function() {
            //When MLB is selected from the selector box thingy this will list the available game ID's  
           if ($("#selector").val() == "MLB"){	
		$.ajax({
                 	type: "POST",
                	url: "mlb.php",
                	data: "Id's", 
                	success: function(data) {
                	$('#identselection').html(data)
                	}
		});
		//Takes the PKID and sends it to mlb_wID.php which runs the chkchunk script for MLB in this instance with that ID (i.e. chkchunk PKID).
		$(document).ready(function() {
        		$("#CheckID").click(function() {
               		var idValue = $("#idVal").val();
                	$.ajax({
                        	type: "POST",
                        	url:  "mlb_wID.php",
                        	data: {'id':idValue},
                        	success: function(data) {
                                $('#centerselection').html(data);
                        	}
                	});
        	    });
		});
		
		//Refreshes Div containing the selected event ID, every 10 seconds.     
                $(document).ready(function() {  
                        var auto_refresh = setInterval(function(){
                                var idValue = $("#idVal").val();        
                                $.ajax({
                                        type: "POST",
                                        url:  "mlb_wID.php",   
                                        data: {'id':idValue},
                                        success: function(data) {
                                        $('#centerselection').html(data);
                                        }
                                });
                        }, 10000);      
                });     

		//Refreshes the DIV that contains the number of Game ID's for MLB, it is refreshed every 60 seconds (60000 milliseconds below).
                $(document).ready(function() {
                        $("#identselection").load("mlb.php");
                        var refreshID = setInterval(function() {
                                $("#identselection").load("mlb.php");
                        }, 60000);
                        $.ajax({ cache: false });
                });
		//Displays the number of MLB streams.
                $(document).ready(function() {
                $.ajax({
                              type: "POST",
                              url:  "mlb_streams.php",
                              data: "Streams",
                              success: function(data) {
                              $('#streams').html(data)
                              }
                       });
                });
                //Refreshes the DIV that contains the number of streams for MLB, it is refreshed every 60 seconds (60000 milliseconds below).
                $(document).ready(function() {
                        $("#streams").load("mlb_streams.php");
                        var refreshID = setInterval(function() {
                                $("#streams").load("mlb_streams.php");
                        }, 60000);
                        $.ajax({ cache: false });
                });   
		//Displays the discontinuities script and should display any discontinuities if they occur.
                $(document).ready(function() {
                      $.ajax({
                              type: "POST",
                              url:  "mlb_discon.php",
                              data: "Discontinuities",
                              success: function(data) {
                              $('#discons').html(data)
                              }
                       });
                });
                //Refreshes the DIV that contains the discontinuities for MLB, it is refreshed every 5 minutes (300000 milliseconds below).
                $(document).ready(function() {
                        $("#discons").load("mlb_discon.php");
                        var refreshID = setInterval(function() {
                                $("#discons").load("mlb_discon.php");
                        }, 300000);
                        $.ajax({ cache: false });
                });	
	   }
	   if ($("#selector").val() == "ESPN"){
		//Will run the chkchunk script for ESPN with the -a option giving a listing of the available PKID's
		$.ajax({
                        type: "POST",
                        url: "espn.php",
                        data: "Id's", 
                        success: function(data) {
                        $('#identselection').html(data)
                        }
		});	
		//When run with the correct id the chunking will be displayed in the center selection div.
		$(document).ready(function() {
                        $("#CheckID").click(function() {
			 var idValue = $("#idVal").val();
                        $.ajax({
                                type: "POST",
                        	url:  "espn_wID.php",    //change this back to espn_wID.php when done testing
                        	data: {'id':idValue},
                        	success: function(data) {
                                $('#centerselection').html(data);
                        	}
                	});
        	    });
		});
		//Refreshes Div containing the selected event ID, every 10 seconds.	
		$(document).ready(function() {
			var auto_refresh = setInterval(function(){
				var idValue = $("#idVal").val();
                        	$.ajax({
                                	type: "POST",
                                	url:  "espn_wID.php",    //change this back to espn_wID.php when done testing
                                	data: {'id':idValue},
                                	success: function(data) {
                                	$('#centerselection').html(data);
                                	}
                        	});
			}, 10000);
		});	
		//Refreshes the DIV that contains the number of Game ID's for ESPN, it is refreshed every 60 seconds (60000 milliseconds below).
                $(document).ready(function() {
                        $("#identselection").load("espn.php");
                        var refreshID = setInterval(function() {
                                $("#identselection").load("espn.php");
                        }, 60000);
                        $.ajax({ cache: false });
                });	
		//Displays the number of ESPN streams.  
		$(document).ready(function() {
  	        $.ajax({
                 	      type: "POST",
                	      url:  "espn_streams.php",
                              data: "Streams",
                              success: function(data) {
                              $('#streams').html(data)
                              }
                       });
                });
		//Refreshes the DIV that contains the number of streams for ESPN, it is refreshed every 60 seconds (60000 milliseconds below).
		$(document).ready(function() {
	        	$("#streams").load("espn_streams.php");
      			var refreshID = setInterval(function() {
                		$("#streams").load("espn_streams.php");
      			}, 60000);
      			$.ajax({ cache: false });
		});
		//Displays the discontinuities script and should display any discontinuities if they occur.
		$(document).ready(function() {
                      $.ajax({
                              type: "POST",
                              url:  "espn_discon.php",
                              data: "Discontinuities",
                              success: function(data) {
                              $('#discons').html(data)
                              }
                       });
                }); 
		//Refreshes the DIV that contains the discontinuities for ESPN, it is refreshed every 5 minutes (300000 milliseconds below).
                $(document).ready(function() {
                        $("#discons").load("espn_discon.php");
                        var refreshID = setInterval(function() {
                                $("#discons").load("espn_discon.php");
                        }, 300000);
                        $.ajax({ cache: false });
                });
          
	   }
	   if ($("#selector").val() == "GBTV"){ 
                //Will run the chkchunk script for GBTV with the -a option giving a listing of the available Event ID's                   
                $.ajax({        
                        type: "POST",   
                        url: "gb.php",
                        data: "Id's",   
                        success: function(data) {       
                        $('#identselection').html(data) 
                        }       
		});     
		//Takes the PKID and sends it to gb_wID.php which runs the chkchunk script for GBTV in this instance with that ID (i.e. gchkchunk PKID).
		$(document).ready(function() {
        		$("#CheckID").click(function() {
                	var idValue = $("#idVal").val();
                	$.ajax({
                        	type: "POST",
                        	url:  "gb_wID.php",
                        	data: {'id':idValue},
                        	success: function(data) {
                                $('#centerselection').html(data);
                        	}
                	});
        	    });
		});
		//Refreshes Div containing the selected event ID, every 10 seconds.     
                $(document).ready(function() {  
                        var auto_refresh = setInterval(function(){
                                var idValue = $("#idVal").val();        
                                $.ajax({
                                        type: "POST",
                                        url:  "gb_wID.php",    //change this back to espn_wID.php when done testing
                                        data: {'id':idValue},
                                        success: function(data) {
                                        $('#centerselection').html(data);
                                        }
                                });
                        }, 10000);      
                });     	
		//Refreshes the DIV that contains the number of Game ID's for GBTV, it is refreshed every 60 seconds (60000 milliseconds below).
                $(document).ready(function() {
                        $("#identselection").load("gb.php");
                        var refreshID = setInterval(function() {
                                $("#identselection").load("gb.php");
                        }, 60000);
                        $.ajax({ cache: false });
                });
		//Displays the number of GBTV streams.
                $(document).ready(function() {
                      $.ajax({
                              type: "POST",
                              url:  "gbtv_streams.php",
                              data: "Streams",
                              success: function(data) {
                              $('#streams').html(data)
                              }
                       });
                });

		//Refreshes the DIV that contains the number of streams for GBTV, it is refreshed every 60 seconds (60000 milliseconds below).
                $(document).ready(function() {
                        $("#streams").load("gbtv_streams.php");
                        var refreshID = setInterval(function() {
                                $("#streams").load("gbtv_streams.php");
                        }, 60000);
                        $.ajax({ cache: false });
                });

                //Displays the discontinuities script and should display any discontinuities if they occur.
                $(document).ready(function() {
                      $.ajax({
                              type: "POST",
                              url:  "gbtv_discon.php",
                              data: "Discontinuities",
                              success: function(data) {
                              $('#discons').html(data)
                              }
                       });
                });

		//Refreshes the DIV that contains the discontinuities for GBTV, it is refreshed every 5 minutes (300000 milliseconds below).
                $(document).ready(function() {
                        $("#discons").load("gbtv_discon.php");
                        var refreshID = setInterval(function() {
                                $("#discons").load("gbtv_discon.php");
                        }, 300000);
                        $.ajax({ cache: false });
                });

           }
	   //Refreshes the entire page so user can choose a different namespace, total hack but cannot figure out how to let each namespace refresh without interrupting   
	   $(document).ready(function() {
		$('#Refresh').click(function() {
			location.reload();
		});
	    });	

              if ($("#selector").val() == ""){         
              //  $("#rightselection").css("background-color", "green");                         
          	$("#identselection").html(" "); 
	   } 	
	});
    });
});

$(function() {
        var tabTitle = $( "#tab_title" ),
            tabContent = $( "#tab_content" ),
            tabTemplate = "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close'>Remove Tab</span></li>",
            tabCounter = 2;
 
        var tabs = $( "#tabs" ).tabs();
 
        // modal dialog init: custom buttons and a "close" callback reseting the form inside
        var dialog = $( "#dialog" ).dialog({
            autoOpen: false,
            modal: true,
            buttons: {
                Add: function() {
                    addTab();
                    $( this ).dialog( "close" );
                },
                Cancel: function() {
                    $( this ).dialog( "close" );
                }
            },
            close: function() {
                form[ 0 ].reset();
            }
        });
 
        // addTab form: calls addTab function on submit and closes the dialog
        var form = dialog.find( "form" ).submit(function( event ) {
            addTab();
            dialog.dialog( "close" );
            event.preventDefault();
        });
 
        // actual addTab function: adds new tab using the input from the form above
        function addTab() {
            var label = tabTitle.val() || "Tab " + tabCounter,
                id = "tabs-" + tabCounter,
                li = $( tabTemplate.replace( /#\{href\}/g, "#" + id ).replace( /#\{label\}/g, label ) ),
                tabContentHtml = tabContent.val() || "Tab " + tabCounter + " content.";
 
            tabs.find( ".ui-tabs-nav" ).append( li );
            tabs.append( "<div id='" + id + "'><p>" + tabContentHtml + "</p></div>" );
            tabs.tabs( "refresh" );
            tabCounter++;
        }
 
        // addTab button: just opens the dialog
        $( "#add_tab" )
            .button()
            .click(function() {
                dialog.dialog( "open" );
            });
 
        // close icon: removing the tab on click
        $( "#tabs span.ui-icon-close" ).live( "click", function() {
            var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
            $( "#" + panelId ).remove();
            tabs.tabs( "refresh" );
        });
    });

//Takes the PKID and sends it to espn_wID.php which runs the chkchunk script for ESPN in this instance with that ID (i.e. echkchunk PKID).
//$(document).ready(function() {
//	$("#CheckID").click(function() {
//		var idValue = $("#idVal").val();
//		$.ajax({
//			type: "POST",
//			url:  "espn_wID.php",
//			data: {'id':idValue},
//			success: function(data) {
//				$('#centerselection').html(data);
//			}
//		});
//	});
//});		

//$(document).ready(function() {
//                        $("#centerselection").load("espn_wID.php");
//                        var refreshID = setInterval(function() {
//                                $("#centerselection").load("espn_wID.php");
//                        }, 10000);
//                        $.ajax({ cache: false });
//                });

//Takes the PKID and sends it to gb_wID.php which runs the chkchunk script for GBTV in this instance with that ID (i.e. gchkchunk PKID).
//$(document).ready(function() {
 //       $("#CheckID").click(function() {
  //              var idValue = $("#idVal").val();
//                $.ajax({
//                        type: "POST",
//                        url:  "gb_wID.php",
//                        data: {'id':idValue},
//                        success: function(data) {
//                                $('#centerselection').html(data);
//                        }
//                });
//        });
//});
//Takes the PKID and sends it to mlb_wID.php which runs the chkchunk script for MLB in this instance with that ID (i.e. chkchunk PKID).
//$(document).ready(function() {
//        $("#CheckID").click(function() {
//                var idValue = $("#idVal").val();
//                $.ajax({
//                        type: "POST",
//                        url:  "mlb_wID.php",
//                        data: {'id':idValue},
//                        success: function(data) {
//                                $('#centerselection').html(data);
//                        }
//                });
//        });
//});
//THIS WORKS BELOW MUST PUT IN ABOVE FUNCTION FOR ESPN TO TEST
//$(document).ready(function() {
//	$("#streams").load("espn_streams.php");
//	var refreshID = setInterval(function() {
//		$("#streams").load("espn_streams.php");
//	}, 10000);
//	$.ajax({ cache: false });
//});

//$(document).ready(function() {
//	$.ajax({
//		type: "POST",
//		url:  "streams.php",
//		data: "Streams",
//		success: function(data) {
//		$('#streams').html(data)
//		}
//	});
//
//	$(document).ready(function() {
 //       	$("#streams").load("streams.php");
//        	var refreshID = setInterval(function() {
 //               	$("#streams").load("streams.php");
//        	}, 10000);
//		$.ajax({cache: false});	
//	});
//
//}); 	


//$(document).ready(function() {
//        $.ajax({
//                type: "POST",
//                url:  "discon.php",
//                data: "Discontinuities",
//                success: function(data) {
//                $('#discons').html(data)
//                }
//        });
//});
	
