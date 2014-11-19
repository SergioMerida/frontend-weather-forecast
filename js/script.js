$(document).ready(function(){
	$(".FC").hide();
	$("#cont").hide();
	$('.celsius').hide();
	$('.f').hide();
	$("#submit").click(function(){ 
		var pais = $("input[name=pais]").val();
		var depto = $("input[name=depto]").val();
		if (depto.length!=0 && pais.length!=0){
			jQuery(document).ready(function($) { 
				var codPais = "";
				$.ajax({ 
					url : "paises.json", dataType : "json",
					success : function(parsed_json) {
						for (var i = 0; i <= 242; i++) { //recorrer el json de paises para encontrar su codigo
							if (((parsed_json[i]["name"]).toLowerCase()) == pais.toLowerCase()){
								codPais = parsed_json[i]["code"];
							};
						};
						//Codigo para el departamento
						if (codPais.length==0) { //error si no encontro el codigo para el pais ingresado
							alert("Ops! Looks like your country doesn't exist! Try again.");
						}else{
							var direccion = "http://api.wunderground.com/api/b9083958d15c4339/conditions/q/"+codPais+"/"+depto+".json";
							$(document).ready(function(){
								jQuery(document).ready(function($) { 
									$.ajax({ url : direccion, dataType : "jsonp",
										success : function(parsed_json2) {
											if(parsed_json2["current_observation"]){ //revisar si el departamento tiene esta llave
												var location = parsed_json2['current_observation']['display_location']['full'];
												var temp_f = parsed_json2['current_observation']['temp_f'];
												var temp_c = parsed_json2['current_observation']['temp_c'];
												var weather = parsed_json2['current_observation']['weather'];
												var last = parsed_json2['current_observation']['local_time_rfc822'];
												var img = parsed_json2['current_observation']['icon_url'];
												var wind = parsed_json2['current_observation']['wind_string'];
												var humidity = parsed_json2['current_observation']['relative_humidity'];
												var preassure = parsed_json2['current_observation']['pressure_mb'];
												var visibility = parsed_json2['current_observation']['visibility_km'];	
												var weatherImg = parsed_json2['current_observation']['icon_url'];
												$(".city").empty();/*Clear the old search*/
												$(".last").empty();
												$(".weather").empty();
												$(".celsius").empty();
												$(".wind").empty();
												$(".humidity").empty();
												$(".preassure").empty();
												$(".f").empty();
												$(".visibility").empty();/*End of clear*/
												$(".FC").show();
												$("#cont").show();						
												$('.city').append(location);				
												$('.last').append("Last update: " + last);				
												$('.weather').append("The weather is " + weather + "<br/><img src=\""+weatherImg+"\"><br/>");		
												$('.celsius').append("Current temperature " + temp_c + " C° ");
												$('.f').append("Current temperature " + temp_f + " F° ");
											
												$('.wind').append("Wind: " + wind);
												$('.humidity').append("Humidity: " + humidity);
												$('.preassure').append("Preassure: " + preassure + "hPa");
												$('.visibility').append("Visibility: " + visibility + "Kilómetros");	
											}else{//error si no tiene esa llave
												alert("Ops! The city you entered doesn't exist or we don't have any data of this city!");
											}
										}
									});
								});
							});
						};
					}
				});
			});
			$("input").val("");
		}else if (depto.length==0 && pais.length==0){
			alert("You must input something in both boxes!");
		}else if(depto.length==0){
			alert("You forgot to input something in city box!");
		}else if(pais.length==0){
			alert("You forgot to input something in country box!");
		}
	});
});

$(document).ready(function(){
	$('.C').click(function() {
        $('.f').hide();
		$('.celsius').show();
	});
	$('.F').click(function() {
        $('.celsius').hide();
		$('.f').show();
	});
});

$(document).ready(function(){
	$("#clear").click(function(){
		$(".FC").hide();
		$("#cont").hide();
		$(".city").empty();/*Clear the old search*/
		$(".last").empty();	
		$(".weather").empty();
		$(".celsius").empty();
		$(".wind").empty();
		$(".humidity").empty();
		$(".preassure").empty();
		$(".f").empty();
		$(".visibility").empty();/*End of clear*/
		});
	});

