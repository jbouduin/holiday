https://www.islamicity.org/PrayerTimes/assets/js/prayertime.lib.js?ver=MHK-JUN-5-2020.0000

The javascript file contents are stored here, just in case the source goes offline.

```javascript

// read the ^ readme-txt

var query;
var ctry;
var geocoder;
var geocoder;
var elevator;
var marker;
var action = "dailyprayer"; // default action is set null
var timeFormat = 1;
var maploaded = 0;
var time_difference_between_query_time_and_user_time_in_seconds; // set here but used by time-left.js->UpdateClock in keeping query_time upto date even after the page loads! Used in computation.
var query_time_at_the_time_of_page_load; // set here. used by UpdateClock for display purposes! Not used in computations.
var time_zone_difference_between_server_and_query_location;
var city_obtained;
var state_obtained;
var country_obtained;
var query_location;
var time_zone_difference_between_user_and_query_location;


/*

// there is no need for this cause index-desktop.php already takes care of this at server level
$(document).ready(function () {
	//this should be also be done at the index-dekstop.php to avoid a roundtrip
    if(window.location.href.indexOf("PrayerTimes") === -1 ) {
		// replace the url by reloading it to be PrayerTimes
		var currentURL = window.location.href;
		var oldStr = blp_get_in_between(currentURL + '/','.org/','/');  //strips prayertimes or "prayerTImes or whatever

		var correctedCurrentURL  = currentURL.replace(oldStr,'PrayerTimes'); // fixes the string in the url
		window.location.href = correctedCurrentURL; // relaods
	}
});
*/

/*build the map*/
function buildMap() {
    //Initialize Google Maps
    geocoder = new google.maps.Geocoder();
    elevator = new google.maps.ElevationService();
    var myOptions = {
    	scrollwheel: false,
        zoom: 1,
        center: new google.maps.LatLng(0, 0),
        disableDefaultUI: true,
        draggable: false,
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL
        },
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    map = new google.maps.Map(document.getElementById("map"), myOptions);
};

function geolocate(address)
{
    geocoder.geocode({'address': address}, function(results, status)
    {
		global_loc = '';
        if (status == google.maps.GeocoderStatus.OK)
        {
            var loc = results[0].geometry.location;
			global_loc = loc;
            var data = reformat(results[0]);

			/* get city,state,country BEGIN */
			//console.log('results[0]["address_components"] var_dump');
			//var_dump(results[0]["address_components"]);

			for (var i=0; i<results[0].address_components.length; i++)
            {
                if (results[0].address_components[i].types[0] == "locality") {
                        //this is the object you are looking for
                        city = results[0].address_components[i];
                    }
                if (results[0].address_components[i].types[0] == "administrative_area_level_1") {
                        //this is the object you are looking for
                        region = results[0].address_components[i];
                    }
                if (results[0].address_components[i].types[0] == "country") {
                        //this is the object you are looking for
                        country = results[0].address_components[i];
                    }
            }

			try
			{
	            city_obtained =	city.long_name;
	            state_obtained = region.long_name
	            country_obtained = country.long_name
			}
			catch(err)
			{
				if(address != "")
				{
					$("#address").val(""); // fix task #259
					$('#noresultzone').show();
				}
				return;
			}
            console.log ('city:' + city_obtained + " state:" + state_obtained + " country: " + country_obtained);

			query_location = city_obtained; // query_location is a global!
			if ( query_location == undefined ){
				query_location = state_obtained;
			}
			if ( query_location == undefined ){
				query_location = country_obtained;
			}

			/* get city,state,country END */

			//alert('city_obtained:' + city_obtained);

            $("#city").val(city_obtained);
            $("#state").val(state_obtained);
            $("#country").val(country_obtained);

            //Set Default Prayer Methods for usa and canada

			var  is_default_methods_set = getCookie("is_default_methods_set");
			console.log("5001 is_default_methods_set:-",is_default_methods_set);
			if(is_default_methods_set == "" || is_default_methods_set == 0)
			{
				if(country_obtained == "United States" || country_obtained == "USA" || country_obtained == "Canada")
				{
				$("#prayerTimesMethods option[value='ISNA']").attr("selected", "selected");
				}
				else
				{
				$("#prayerTimesMethods option[value='MWL']").attr("selected", "selected");
				}
				$("#prayerTimesMethodsAsr option[value='Standard']").attr("selected", "selected");
			}

			console.log("2002 prayerTimesMethods:-",$("#prayerTimesMethods").find("option:selected").text());
			console.log("2002 prayerTimesMethodsAsr:-",$("#prayerTimesMethodsAsr").find("option:selected").text());

            ctry = data['country'] ? data['country'] : '';

            //Update the search bar & marker
            updateAddressBar(results[0].formatted_address);
            //updateMarker(results[0]);

            map.fitBounds(results[0].geometry.viewport);
            map.setCenter(loc);
            elevator.getElevationForLocations({'locations': [loc]}, function(results, status)
            {
                var elev = 0;
                if (status == google.maps.ElevationStatus.OK && results[0])
                {
                    elev = results[0].elevation;
                }
                console.log ( 'elev: ' + elev );
                loc = loc.toString().replace(/\(| |\)/g,"").split(',');
                //$('#precise_location').text ('test');
                //alert('{ precise loc: ' + loc[0] + ',' + loc[1] + '}');
                //window.document.getElementById('precise_location').text = '{ precise loc: ' + loc[0] + ',' + loc[1] + '}';

                var text = '{ precise loc: ' + loc[0] + ',' + loc[1] + '}';
                text = encodeURIComponent(text);
                //var subject = encodeURIComponent('Email From Aleem..');
                //alert('hi');

				//var distance_to_qaba = getDistanceFromLatLonInKm( loc[0],loc[1],21.422558, 39.826325);
				//var distance_to_qaba = getDistanceFromLatLonInKm( 21.420107, 39.823723,21.422558, 39.826325);
				//var miles = distance_to_qaba/1.609
				//var miles_formatted = parseFloat(Math.round(miles * 100) / 100).toFixed(2)
				//window.document.getElementById('distance_from_qaba').innerHTML  = parseFloat(Math.round(distance_to_qaba * 100) / 100).toFixed(2)  + ' km ' + ' <i><font color="#ababab" size=3>('+miles_formatted+' miles)</font></i>';
//alert($("#address").val(getQueryCaption()));
			//alert('please click here to continue');
//alert($("#address").val(getQueryCaption()));
		$("#address").val(getQueryCaption()); // fix task #258
                updateDailyPrayerTimes(loc[0], loc[1], elev);

            });


        } else {
            map.setCenter(new google.maps.LatLng(0, 0));
            map.setZoom(1);

			if(address != "")
			{
				$("#address").val(""); // fix task #259
				$('#noresultzone').show();
            }

    	    $('#searchHint').fadeIn();
    	    if(address != "")
    	    {
    	    	$("#error").fadeIn();
    	    }
    	    $('#prayerError').hide();
    	    $('#prayerCanvas').fadeOut();
    	    $('#prayerTimes').hide();
    	    //$('#compass').hide();
    	    $('#prayerLoad').fadeOut();
    	    $('#monthlyOrYearlyPrayerCanvas').fadeOut();
        }

    });
}

function reformat(result)
{
    var me = {};
    var components = result.address_components;
    var len = components.length;
    for(var i=0; i<len; i++){
        for(var ii=0; ii<components[i].types.length; ii++)
        {
            me[components[i].types[ii]] = components[i].short_name;
            me[components[i].types[ii]+"_long"] = components[i].long_name;
        }
    }
    for(var prop in result)
    {
        if(prop != "address_components") me[prop] = result[prop];
    }
    return me;
}

function updateAddressBar(str)
{
	if(str.length)
	{
	    $('#address').val(str);
	    setCookie("address",  $('#address').val(), 365);
	    setCookie("pmethods",  $('#prayerTimesMethods').val(), 365);
		setCookie("pmethodsAsr",  $('#prayerTimesMethodsAsr').val(), 365);
	}
}

function isMaccaDirection(address)
{
	var area;
	if(address != "")
	{
		var array = address.split(/[ ,]+/);
		if(array.length > 0)
		{
			area = array[0].trim();
		}

		if(area != "")
		{
			area = area.toLowerCase();
			if(area == "mecca")
			{
				return 1;
			}
		}
	}
	return 0;
}
function updateMarker(loc)
{
    //Clear out any previous marker
    if(marker)
        marker.setMap(null);

    //Insert new marker
    marker = new google.maps.Marker({
        map: map,
        position: loc.geometry.location,
        //icon: '/images/favicon.png'
    });
}

$(document).keypress(function (e) {
    if (e.which == 13) {
    	location.href = "index.php?address="+$('#address').val();
    }
});


$(function(){

	 $('#address').click(function(){
	    $(this).select();
	 });

	$('#embededcode').click(function(){
	    $(this).select();
	});

	 $('#day').click(function(){
		 location.href = "index.php?address="+$('#address').val();
	 });

});


function showError(msg)
{

}


function updateLocation(query)
{
    if(map)
    {
        buildMap();
    }
    ctry = '';
	geolocate(query);

}

/* This function calculate the daily prayer times*/
function updateDailyPrayerTimes(lat, long, elev)
{
	//alert("please click here to continue");
	showHidePrayerTimesMethodsAndMonthPanel();
	if(lat != "" && long != "")
	{
		 $.ajax({
 	  	  		type: "POST",
			  	url: "timezone.php",
			  	dataType: "json",
	 			data: "lat="+ lat+"&lon="+long+"&timestamp="+getCurrentTimeStamp()+"&country="+$("#country").val(),
			   	success: function(data){
					//alert(data.error);
	 			 	if(data.error == "no")
	 			   	{
						//get the server timezone and the query timezone.
						//note that query_timezone is not the same as user_timezone )
						var query_timezone = data.query_timezone;  //returns the query location timezone! for dhaka that is 6

//alert( query_timezone);
if ( query_timezone == '9999' ) {
	alert('We are having technical difficultues at this time, please try later. ');
	window.location.href = 'http://www.islamicity.org/PrayerTimes/index.php?address=';
}
						var todays_date = new Date();
						query_timezone = adjust_timezone_if_needed (query_timezone,country_obtained, state_obtained, city_obtained, todays_date); // when PHP fails to get the timezone of the remote lookup ( like Istanbul now November 6 still being in DST! ), this function allows an adjustment
						//ideally, montlhy computations and the daily computations must go thru the same logic and same dst js files to do this kind of adjustments
						//this adjustment function I plugged in ( adjust_timezone_if_needed ), is only good for the daily view! it won't fix the istanbul problem for monthly view
						//what is istanbul problem?
						//istanbul normally follows the european dst formula just like Bonn.
						//and europe stops the dst in the last sunday of october. ( oct 25 )
						//for the first time ever, turkey decided to delay that ending for 14 days to Nov 8 instead of oct 25! God knows why.
						//this unexpected change throws off even php's getting the timezone
						//as a result on november 6, php reports istanbul's timezone is +2. But in reality it is +3. it will be back to +2 after Nov 8.
						//so in between oct 25th and november 8, we will be off ( just like all the other prayer time services off out there )
						//but with this fix, (adjust_timezone_if_needed), I can at least fix the daily view.



	 			 		var date = new Date(); // today
						prayTimes.setMethod ($("#prayerTimesMethods").val());
						var AsrMethod = $("#prayerTimesMethodsAsr").val();
						//prayTimes.adjust( {'highLats': 'AngleBased'} );
						prayTimes.adjust( {'highLats': 'AngleBased', 'asr': AsrMethod} );

	 			 		prayTimes.tune( { fajr: 0, sunrise: -1, maghrib: 0} );
	 			 		var times = prayTimes.getTimes(date, [lat, long,0], query_timezone, 0,'12h');


						//-------------------------------------
						//get the usertime_zone
						var user_timezone = -(new Date().getTimezoneOffset() / 60); // I may not need this. storing it just in case!
						var user_time = new Date(); //



						var server_timezone = data.server_timezone; // returns either -7 or -8 - depending on whether in the DST or not. wen DST is off, it returns -8.

						//get server_time as javascript date object
						var server_time_PHP =  data["server_time"]; //
						var server_time = new Date (server_time_PHP); // server_time_PHP must be in this format! 'December 17, 1995 03:24:00'

						time_zone_difference_between_server_and_query_location = (server_timezone * -1) + query_timezone;
						time_zone_difference_between_user_and_query_location = ( user_timezone* -1) + query_timezone; //new

						//alert('time_zone_difference_between_server_and_query_location:' + time_zone_difference_between_server_and_query_location);
						//alert('time_zone_difference_between_user_and_query_location:' + time_zone_difference_between_user_and_query_location);



						//alert ( time_zone_difference_between_server_and_query_location + ' hours to ber added to our server time ');

						//compute the current time at the query location
						var server_time_temp = new Date ( server_time );
						// query_time.setHours ( server_time.getHours() + time_zone_difference_between_server_and_query_location );
						var query_time = blp_date_add(server_time_temp, 'hour', time_zone_difference_between_server_and_query_location);


						// query_time is now set to the current time query location
						// but this will be accurate at the time of page load. because it relies on the server_time
						// when the page loads and time-left.js's UpdateClock function kicks in and runs with an interval of 1 second, query_time will not mean much!
						// so the query_time needs to be adjusted within the UpdateClock function
						// best way to address this is to find out the difference between the usertime and remotetime at the time of page load and store this in a global constant
						query_time_at_the_time_of_page_load = query_time; // query_time_at_the_time_of_page_load is a global var. used by the UpdatEclock function in reporting current time at the query location
						query_time_at_the_time_of_page_load = blp_left_of(query_time_at_the_time_of_page_load.toString(),' GMT'); // this is something like this: "Thu Nov 05 2015 04:59:56"

						//var dif = query_time.getTime() - server_time.getTime();
						var dif = query_time.getTime() - user_time.getTime();

						var Seconds_from_T1_to_T2 = dif / 1000;
						time_difference_between_query_time_and_user_time_in_seconds = Math.abs(Seconds_from_T1_to_T2);
						//alert('BEFORE time_difference_between_query_time_and_user_time_in_seconds:' + time_difference_between_query_time_and_user_time_in_seconds);
						//note that time_difference_between_query_time_and_user_time_in_seconds is a global so that time-left.js->UpdateClock() function has easy access to it.
						//alert('time_difference_between_query_time_and_user_time_in_seconds: ' + time_difference_between_query_time_and_user_time_in_seconds);
						//you need to either add this or subtract this to the usertime to get the query time within the UpdateClick function
						if ( user_timezone <  query_timezone ){
							//for the timezones that are west of the server, time_difference would be a minus!
							time_difference_between_query_time_and_user_time_in_seconds = time_difference_between_query_time_and_user_time_in_seconds * -1
							//alert('user_timezone<query_timezone ADJUSTING time_difference_between_query_time_and_user_time_in_seconds to be as ' + time_difference_between_query_time_and_user_time_in_seconds);
						}

						var debug_str = ('' +
							'\ncountry:' + $("#country").val() +
							'\nstate:' + $("#state").val() +
							'\ncity:' + $("#city").val() +
							'\nserver timezone:' + server_timezone + '' +
							'\nquery ('+$("#city").val()+') timezone:' + query_timezone + '' +
							'\nuser_timezone:' + user_timezone + '' +
							'\ntime_zone_difference_between_server_and_query_location:' + time_zone_difference_between_server_and_query_location + '' +

							'\n\n' +
							'\n\nserver time:' + server_time + '' +
							'\n\nquery ('+$("#city").val()+') time:' + query_time + '' +
							'\n\nuser_time:' + user_time + '' +
							'\n\ntime_difference_between_query_time_and_user_time_in_seconds:' + time_difference_between_query_time_and_user_time_in_seconds
							);

						console.log ( debug_str  + '\n\n\n');

						//window.location.href='http://www.cnn.com'


						display = $('#dailyprayertimesbar');
						display_time_left(times,display);


	 				    $("#lastvisitedcity").val($("#address").val());
	 	                $("#lastvisitedlat").val(lat);
	 	                $("#lastvisitedlong").val(long);
	 	                $("#lastvisitedeve").val(elev);
	 	                $("#timezone").val(data.query_timezone); // I did not change the hidden vars name from timezone to query_timezone.
	 	                $("#qublahdirection").val(data.qublahdirection);
	 	                $("#qublahdirection_label").val(data.qublahdirection_label);
	 	                $("#lat_label").val(data.lat_label);
	 	                $("#long_label").val(data.long_label);

		 	                //setMaccaDirectionImage($("#address").val());
		 				    if(isMaccaDirection($("#address").val()) == 1)
		 					{
		 				    	$("#qublahdirection").val(0);
			 	                $("#qublahdirection_label").val("0");
		 					}


	 				    setDailyPrayerTimecontnet(times,date,$("#address").val(),$("#qublahdirection_label").val(),lat,long,data.lat_label,data.long_label);
	 				   $('#dailyPrayerCanvas').show();
	 				    var mosque_link = "https://www.google.com/maps/search/mosque/@"+lat+","+long+",13z/data=!3m1!4b1";
	 				    $("#mosque").attr("href",mosque_link);
						$("#mosque2").attr("href",mosque_link);

	 				   var halalfood_link = "https://www.google.com/maps/search/halal+food/@"+lat+","+long+",13z/data=!3m1!4b1";
	 				    $("#halalfood").attr("href",halalfood_link);
						 $("#halalfood2").attr("href",halalfood_link);

	 				   var search_query = country_obtained + ' ' + state_obtained + ' ' + city_obtained;
	 				   search_query = blp_replace(search_query,' ','%20');
	 				   var dbg_local_time_google_link = "https://www.google.com/search?sourceid=chrome-psyapi2&ion=1&espv=2&es_th=1&ie=UTF-8&q=time%20and%20date%20in%20"+search_query+"&oq=time%20and%20date%20in%20dhaka&rlz=1C1CHFX_enUS572US572&aqs=chrome..69i57j69i64j69i60l2.18676j0j7";
	 				    $("#local_time_google").attr("href",dbg_local_time_google_link);

	 				   var dbg_prayer_times_google_link = "https://www.google.com/search?sourceid=chrome-psyapi2&ion=1&espv=2&es_th=1&ie=UTF-8&q=prayer%20times%20by%20islamiCity%20"+search_query;
	 				    $("#prayer_times_google").attr("href",dbg_prayer_times_google_link);

						maploaded = 1;
	 			   	}
	 			   	else
	 			   	{
					   maploaded = 0;
	 			   	   $('#dailyPrayerCanvas').fadeOut();
	 				   $('#monthlyPrayerCanvas').fadeOut();
	 				   $("#address").val(""); // fix task #259
	 				  $("#noresultzone").show();
	 			   	}
			   	}
	  	});
	}
	else
	{
		 $('#dailyPrayerCanvas').fadeOut();
		 $('#monthlyPrayerCanvas').fadeOut();
		 $("#address").val(""); // fix task #259
		 $("#noresultzone").show();
	}
}

function showPrayerTimesByEnglishOrArabicMonth(searchtype,type)
{
	var daterange;

	$("#monthly_ptvh").html("");
	$("#monthly_ptvc").html("");
	var title = '';

	if(searchtype == 'arabic' && type == "monthly")
	{
		daterange = $("#prayerTimesByArabicMonth").val();

		var title = $("#prayerTimesByArabicMonth").find("option:selected").text();
		action = "monthlyprayerar";


	}
	else if(searchtype == 'english' && type == "monthly")
	{
		daterange = $("#prayerTimesByEnglishMonth").val();
		title = $("#prayerTimesByEnglishMonth").find("option:selected").text();
		action = "monthlyprayeren";

	}
	else
	{
			alert("Error:Prayer Selection");
	}

	if(daterange == "n")
	{
		alert("Please select a valid month!");
		return;
	}

	hidePrayerCanvas();

	showHidePopup('#monthviewpopup',0);

	var daymonthyears =  daterange.split("_");
	var lat = $("#lastvisitedlat").val();
	var lng = $("#lastvisitedlong").val();
	var eve = $("#lastvisitedeve").val();
	var timezone = $("#timezone").val(); // this actually hold the data.query_timezone. but I did not change the hidden var name from timezone to query_timezone.
	var dst = $("#address").val();
	var country = $("#country").val();

	var qublahdirection_label =  $("#qublahdirection_label").val();
	var lat_label =  $("#lat_label").val();
	var long_label = $("#long_label").val();

	//alert(timezone + ", " + dst + ", "+ lat+", "+lng);
	var daymonthyearfrom= daymonthyears[0].split("-");

	var daymonthyearto =  daymonthyears[1].split("-");
	if(type == "monthly")
	{
		makeTableForMonthlyPrayerTimes(daymonthyearfrom[0], daymonthyearfrom[1], daymonthyearfrom[2], daymonthyearto[0], daymonthyearto[1], daymonthyearto[2], lat, lng, timezone, dst,title,searchtype,qublahdirection_label,lat_label,long_label,country) ;

	}

}

function showHidePrayerTimesMethodsAndMonthPanel()
{
	//reset mothly dropdown and methods
	$("#prayerTimesByEnglishMonth").val("n");
	$("#prayerTimesByArabicMonth").val("n");

	if( $("#address").val().length)
	{
		$("#prayerTimesMethodsAndMonthPanel").show();
		return false;
	}
	$("#prayerTimesMethodsAndMonthPanel").hide();
}

function hidePrayerCanvas()
{
	$("#dailyPrayerCanvas").hide();
}

function showPrayerCanvas()
{
	$("#dailyPrayerCanvas").show();
}


//make monthly timetable
function makeTableForMonthlyPrayerTimes(from_year, from_month, from_day, to_year, to_month, to_day, lat, lng, timeZone, dst,title,searchtype,qublahdirection_label,lat_label,long_label,country) {
	setsharedlink();
	var date = new Date(from_year, from_month-1, from_day);
	var endDate = new Date(to_year, to_month-1, to_day);

	var day_label = "";
	var days_label = "";

	if(searchtype == "arabic")
	{
		var sm = getEnglishMonthShortName(date.getMonth());
		var lm = getEnglishMonthShortName(endDate.getMonth());
		days_label = sm;
		if(sm != lm)
		{
			days_label = days_label + "<br/>" + lm;
		}
	}
	else
	{
		var arr_start_date = GregToHijri(date);
		var arr_end_date = GregToHijri(endDate);

		var sm = getHijriMonthShortName(arr_start_date[1]-1);
		var lm = getHijriMonthShortName(arr_end_date[1]-1);
		days_label = sm;
		if(sm != lm)
		{
			days_label = days_label + "<br/>" + lm;
		}
	}


	var title_array  = title.split(',');
	day_label = title_array[0];


	var items = {day: day_label,day_name:'Day', days: days_label, fajr: 'Fajr<br/>(Dawn)', sunrise: 'Shorook<br/>(Sunrise)',
				dhuhr: 'Zuhr<br/>(Noon)', asr: 'Asr<br/>(Afternoon)',
				maghrib: 'Maghrib<br/>(Sunset)', isha: 'Isha<br/>(Night)'};

	var contents = '<table class="printing-border printing-no-padding">';
	contents = contents + getMonthlyPrayerTimesHeader(from_year, from_month, from_day, to_year, to_month, to_day, lat, lng, timeZone, dst,title,searchtype,qublahdirection_label,lat_label,long_label);
	var table_rows = "";
	var format = '12h';
	prayTimes.setMethod ($("#prayerTimesMethods").val());
	var AsrMethod = $("#prayerTimesMethodsAsr").val();
	//prayTimes.adjust( {'highLats': 'AngleBased'} );
	prayTimes.adjust( {'highLats': 'AngleBased', 'asr': AsrMethod} );
	prayTimes.tune( { fajr: 0, sunrise: -1, maghrib: 0} );
	from_day = parseInt(from_day);
	to_day = parseInt(to_day);

	var loop = 1;
	while (date <= endDate || getDaysBetweenDates(date,endDate) > -1) {

		if(searchtype == "arabic" && (loop < 3 ))
		{
			var hijri_array = GregToHijri(date);
			if(hijri_array[2] == 30 || hijri_array[2] == 29)
			{
				loop++;
				date.setDate(date.getDate() + 1);  // next day
				continue;
			}
		}

		if(searchtype == "arabic" && (loop > 29 ))
		{
			var hijri_array = GregToHijri(date);
			if(hijri_array[2] == 1 || hijri_array[2] == 2)
			{
				loop++;
				date.setDate(date.getDate() + 1);  // next day
				continue;
			}
		}

		loop++;
		country = country.toLowerCase();

		// Daylight saving code start here
		var adjusted_timezone;
		var php_timezone 		= parseInt(timeZone);  						// this is given to us by php/google for the current day. As an example, it is either -7 or -8 for los angeles - depending on the day in the year.
		var current_date_dst  	= parseInt(get_dst(country, new Date()));   // here, we get the current DST for the current day for the country in subject. we use the get_dst function for that. get_dst function nust be uptodate. ( this is where  Adji's formula's and coverage lives ). the DST value ( 1 or 0 ) is expected to match to the dst factor ( google timezone api ) in thi value-> { $jsonTimezoneObject->dstOffset / 3600; }

		var loop_date_dst 		= parseInt(get_dst(country, date)); 		// loop date is also given to us by the get_dst function. the reason it is called loop, cause it runs at each iteration in the for loop. it is either 1 or 0, depending on the day in the year for the country.

		var debug_str 			= 'did nothing';

		var natural_timezone 	= php_timezone ;							// natural time zone is the currrent time zone ( php_timezone ) minus the DST factor. for example, the natural time zone for los angeles would always be -8.

		//	the following section will intelligently undo the dst effect in the php_timezone to come up with the natural timezone!
		//	it is important to get the natural time zone as the starting point, because that's what the get_dst function would be working with.
		//  get_dst function takes a date and a location and returns 1 or 0 for that date and country. it returns 1 if the DST is in effect.
		//  we then add that 1 onto the natural time zone and find the current time zone ( not just for the current date as php_timezone had it but also for any given day )


		//  following section will get the natural time zone by using the get_dst function and php_timezone

		if ( current_date_dst == 1 ){ // if the get_dst finds out that we are in dst today!, then php_timezone needs to be adusted! we need to take th DST effect (1) out of that. This is how we find the NATURAL TIME ZONE!
			 natural_timezone = php_timezone - 1;
			 debug_str = 'adjusted natural time zone by deducing 1 from php_timezone (which always gives the current timezone). by reducing it by 1 whenever it is applicable to reduce by 1, we end up with that we call NATURAL TIME ZONE! we can then apply the loop_date_dst unto that natural time zone. ';
		}

		// natural_timezone is now either the php_timezone or php_timezone-1.
		// natural_timezone will always be -8 for los angeles.

		// now that we know the natural_timezone, (and the loop_date_dst), we easily can compute the adjusted_timezone!
		adjusted_timezone = natural_timezone + loop_date_dst; //

		// adjusted_timezone is the natural time zone PLUS the DST factor!

		if(false){
			console.log ( '\n\ndate:' + date);
			console.log ( 'php_timezone:' + php_timezone);
			console.log ( 'natural_timezone:' + natural_timezone);
			console.log ( 'adjusted_timezone:' + adjusted_timezone);
			console.log ( 'current_date_dst:' + current_date_dst);
			console.log ( 'loop_date_dst:' + loop_date_dst);
			console.log ( 'get_dst(country, date):' + get_dst(country, date));
			console.log ( 'debug_str:' + debug_str);
		}

		//-------------------------------------------------------------------
		var dst_factor = 0 // because we adjusted the timezoneand factored in the DST, we will ignore the DST argument in the below function and pass always 0 for it!
		var times = prayTimes.getTimes(date, [lat, lng, 0], adjusted_timezone, dst_factor, format);

		times.day = date.getDate();
		var today = new Date();
		var isToday = (date.getMonth() == today.getMonth()) && (date.getDate() == today.getDate());
		var klass = isToday ? 'today-row' : '';
		//console.log( items);
		var hijri_date_array = GregToHijri(date);


		table_rows = table_rows + getRow(times, items, klass,date,hijri_date_array);


		date.setDate(date.getDate() + 1);  // next day
	}

	//var address_row = "<tr class=\"printing-no-padding monthly_ptvh_print_address\"><td class=\"printing-text-center\" colspan=\"9\">"+$("#address").val()+"</td></tr>";


	var address_row = "<tr class=\"printing-no-padding monthly_ptvh_print_address\"><td class=\"printing-text-center\" colspan=\"9\">"+$("#address").val()+ " &nbsp;&nbsp;<i>" + "Fajr & Isha Method: " +
	 $("#" + $("#prayerTimesMethods").val()).html() +  "; Asr Method: " + $("#" + $("#prayerTimesMethodsAsr").val()).html() +   "</i></td></tr>";

	/*

	Los Angeles, CA   Fajr & Isha Method: NaNStandardNaN

	*/


	//"Fajr & Isha Method: Fiqh Council (North America); Asr Method: Common"
	/*
	$("#prayerTimesMethods").val()
	$("#prayerTimesMethodsAsr").val()

	$("#" + $("#prayerTimesMethods").val()).html()
	$("#" + $("#prayerTimesMethodsAsr").val()).html()



	*/

	contents = contents + "<tbody>" + table_rows +address_row+"</tbody></table><br/>";
	$("#monthly_ptvc").html(contents);
	$("#monthlyPrayerCanvas").show();
}

function getMonthlyPrayerTimesHeader(from_year, from_month, from_day, to_year, to_month, to_day, lat, lng, timeZone, dst,title,searchtype,qublahdirection_label,lat_label,long_label)
{
	var date = new Date(from_year, from_month-1, from_day);
	var endDate = new Date(to_year, to_month-1, to_day);

	var arabicdate = GregToHijri(date);
	var arabicdate2 = GregToHijri(endDate);

	//var monthly_ptvh =  $("#state").val()+ ", "+ $("#country").val()+" | ";
	var monthly_ptvh = $("#address").val()+" | ";
	monthly_ptvh = monthly_ptvh + getEnglishMonthShortName(date.getMonth()) +" "+date.getFullYear();
	monthly_ptvh = monthly_ptvh + " | ";
	monthly_ptvh = monthly_ptvh + getHijriMonthName(arabicdate[1]-1)+" "+arabicdate[0];

	$("#monthly_ptvh").html(monthly_ptvh);

	//var monthly_ptvh_print =  $("#state").val()+ ", "+ $("#country").val()+" | ";
	var monthly_ptvh_print =   getQueryCaption() + " | ";

	monthly_ptvh_print = monthly_ptvh_print + getEnglishMonthShortName(date.getMonth()) +" "+date.getFullYear();
	monthly_ptvh_print = monthly_ptvh_print + " | ";
	monthly_ptvh_print = monthly_ptvh_print + getHijriMonthName(arabicdate[1]-1)+" "+arabicdate[0];

	$("#monthly_ptvh_print").html(monthly_ptvh_print);


	var header =  '';
	header = header + '<thead><tr class="printing-header-color" id=\"mpth\">';
	if(searchtype == "arabic")
	{
		var english_month_name = from_month == to_month ? getEnglishMonthShortName(date.getMonth()) : (getEnglishMonthShortName(date.getMonth()) + "<br/>"+getEnglishMonthShortName(endDate.getMonth()));
		header = header + "<th class=\"printing-text-center printing-border\">"+getHijriMonthName(arabicdate[1]-1)+"</th>";
		header = header + "<th class=\"printing-text-center printing-border\">Day</th>";
		header = header + "<th class=\"printing-text-center printing-border\">"+english_month_name+"</th>";
		header = header + "<th class=\"printing-text-center printing-border\">Fajr<br><div class='english-name'>(Dawn)</div></th>";
		header = header + "<th class=\"printing-text-center printing-border\">Shorook<br><div class='english-name'>(Sunrise)</div></th>";
		header = header + "<th class=\"printing-text-center printing-border\">Dhuhr<br><div class='english-name'>(Noon)</div></th>";
		header = header + "<th class=\"printing-text-center printing-border\">Asr<br><div class='english-name'>(Afternoon)</div></th>";
		header = header + "<th class=\"printing-text-center printing-border\">Maghrib<br><div class='english-name'>(Sunset)</div></th>";
		header = header + "<th class=\"printing-text-center printing-border\">Isha<br><div class='english-name'>(Night)</div></th>";

	}
	else
	{
		var arabic_month_name = arabicdate[1] == arabicdate2[1] ? getHijriMonthName(arabicdate[1]-1) : (getHijriMonthName(arabicdate[1]-1)+"<br/>"+getHijriMonthName(arabicdate2[1]-1));
		header = header + "<th class=\"printing-text-center printing-border\">"+getEnglishMonthShortName(date.getMonth())+"</th>";
		header = header + "<th class=\"printing-text-center printing-border\">Day</div>";
		header = header + "<th class=\"printing-text-center printing-border\">"+arabic_month_name+"</th>";
		header = header + "<th class=\"printing-text-center printing-border\">Fajr<br><div class='english-name'>(Dawn)</div></th>";
		header = header + "<th class=\"printing-text-center printing-border\">Shorook<br><div class='english-name'>(Sunrise)</div></th>";
		header = header + "<th class=\"printing-text-center printing-border\">Dhuhr<br><div class='english-name'>(Noon)</div></th>";
		header = header + "<th class=\"printing-text-center printing-border\">Asr<br><div class='english-name'>(Afternoon)</div></th>";
		header = header + "<th class=\"printing-text-center printing-border\">Maghrib<br><div class='english-name'>(Sunset)</div></th>";
		header = header + "<th class=\"printing-text-center printing-border\">Isha<br><div class='english-name'>(Night)</div></th>";

	}
	header = header + "</tr></thead>";
	return header;
}

function setDailyPrayerTimecontnet(times,date,dst,qublahdirection_label,lat,long,lat_label,long_label)
{
	setsharedlink();
	var fajr = times.fajr.replace(' ','');
	var sunrise = times.sunrise.replace(' ','');
	var dhuhr = times.dhuhr.replace(' ','');
	var asr = times.asr.replace(' ','');

	var maghrib = times.maghrib.replace(' ','');
	var isha = times.isha.replace(' ','');

	var arr_hijri_date = GregToHijri(date);

	if(show_ampm == 0)
	{
		fajr = fajr.replace(' am','a');
		fajr = fajr.replace(' pm','p');

		sunrise = sunrise.replace(' am','a');
		sunrise = sunrise.replace(' pm','p');

		dhuhr = dhuhr.replace(' am','a');
		dhuhr = dhuhr.replace(' pm','p');

		asr = asr.replace(' am','a');
		asr = asr.replace(' pm','p');

		maghrib = maghrib.replace(' am','a');
		maghrib = maghrib.replace(' pm','p');

		isha = isha.replace(' am','a');
		isha = isha.replace(' pm','p');

	}

	var arabicdate = GregToHijri(date);


	/*
	var header = "<div class=\"title font-avenirnext-regular result-header-font-color\">";
	var d = new Date();
	d = d.toLocaleTimeString().replace(/:\d+ /, ' ');
	//header = header + $("#state").val()+ ", "+ $("#country").val()+" - " + d;
	//header = header + $("#state").val()+ ", "+ $("#country").val()+" - <span id='local_query_time'></span>";
	header = header + getQueryCaption() + " Prayer Times - <span id='local_query_time'></span>"; // added getQueryCaption & abbrState funcions into prayertime.lib.js at the bottom
	header = header + "</div>";
	*/

	if (typeof BLP_BLUEPRINT_CAMPAIGN_IS_ON !== 'undefined') {
		var header = "<h1 style=\"display:inline;\"><br><div class=\"title font-avenirnext-regular result-header-font-color\" style=\"display:inline;\">"; // add an extra <br>
	}	else {
		var header = "<h1 style=\"display:inline;\"><div class=\"title font-avenirnext-regular result-header-font-color\" style=\"display:inline;\">";
	}

	var d = new Date();
	d = d.toLocaleTimeString().replace(/:\d+ /, ' ');
	//header = header + $("#state").val()+ ", "+ $("#country").val()+" - " + d;
	//header = header + $("#state").val()+ ", "+ $("#country").val()+" - <span id='local_query_time'></span>";
	header = header + getQueryCaption() + " Prayer Times</h1>  - <span class=\"title font-avenirnext-regular result-header-font-color\" id='local_query_time'></span>"; // added getQueryCaption & abbrState funcions into prayertime.lib.js at the bottom
	header = header + "</div>";


	header = header + "<div class=\"content font-avenirnext-bold result-header-font-color\">";
	header = header + getEnglishMonthFullName(date.getMonth()) + " "+ date.getDate()+", "+date.getFullYear();
	header = header + " | ";
	header = header + getHijriMonthFullName(arabicdate[1]-1) +" "+arabicdate[2]+", "+arabicdate[0];
	header = header + " <span class=\"more-info\"><a href=\"#\" onclick=\"showHidePopup('#qibladetailspopup',1);\">More Info</a></span>";
	header = header + "</div>";

	$("#dailyprayertimesheader").html(header);

	var moreinfopopup = "<div>";
	moreinfopopup = moreinfopopup + "<center>";
	moreinfopopup = moreinfopopup + "<strong>Lat/Long:</strong>&nbsp; &nbsp; <i><font color='#ababab'>"+lat_label+", "+long_label + "</font></i>";
	moreinfopopup = moreinfopopup + "<br><strong>Qibla:</strong>&nbsp;&nbsp;<i><font color='#ababab'>"+qublahdirection_label+"</i></font>";

	moreinfopopup = moreinfopopup + "<br><strong>Distance to Kaba (Mecca):</strong> <i><font color='#ababab'>"+parseInt(getQuibleDistanceInMile(lat,long))+" miles</font></i>";

	moreinfopopup = moreinfopopup + "<br>&nbsp;<br>";

	moreinfopopup = moreinfopopup + "<strong>Fajr & Isha Method:</strong>&nbsp;<i><font color='#ababab'>" + $("#" + $("#prayerTimesMethods").val()).html()+ "</font></i> ";

	moreinfopopup = moreinfopopup + "<br><strong>Asr Method:</strong>&nbsp;<i><font color='#ababab'>" + $("#" + $("#prayerTimesMethodsAsr").val()).html();

	moreinfopopup = moreinfopopup + "<center><br>";
	moreinfopopup = moreinfopopup + "<a style='text-align:right' href=\"#\" onclick=\"changemethod('#qibladetailspopup','#settingspopup')\"></i><font color=green>change methods</font></a>" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a style='text-align:right' href=\"#\" onclick=\"changemethod('#qibladetailspopup','#helppopup')\"></i><font color=green>see help</font></a></centeR>";
	moreinfopopup = moreinfopopup + "</centeR>";
	moreinfopopup = moreinfopopup + "</font>"
	moreinfopopup = moreinfopopup + "</center>";

	moreinfopopup = moreinfopopup + "</div>";


	$("#qibladetailspopup_content").html(moreinfopopup);

	var content = "";
	content = content + "<div class=\"prayer-time-col\">"+fajr+"</div>";
	content = content + "<div class=\"prayer-time-col\">"+sunrise+"</div>";
	content = content + "<div class=\"prayer-time-col\">"+dhuhr+"</div>";
	content = content + "<div class=\"prayer-time-col\">"+asr+"</div>";
	content = content + "<div class=\"prayer-time-col\">"+maghrib+"</div>";
	content = content + "<div class=\"prayer-time-col\">"+isha+"</div>";

	$("#dailyprayertimescontent").html(content);

}

//make a table title row
function makeTableTitleRow(data,class_name,colspan) {
	var row = document.createElement('tr');
	var cell = document.createElement('td');
		cell.innerHTML = data;
		row.appendChild(cell);
		cell.className = class_name;
		cell.colSpan = colspan;
	return row;
}

function getRow(data, items, klass,english_date,hijri_date_array) {
	var row = "<tr class=\"printing-no-padding\">";
	var ai = 1;
	for (var i in items) {

		var cell = "<td class=\"printing-text-center printing-border printing-no-padding\">";
		//alert(data[i]);
		if(data[i] == undefined)
		{
			var eng_hijri_date =  getHijriOrEnglishDateLabel(english_date,hijri_date_array);
			cell = cell + eng_hijri_date; // this prints this day>3	hijri_day>undefined	fajr>5:06	sunrise>6:46	dhuhr>1:19	asr>5:00	maghrib>7:52	isha>9:26 on the row
		}
		else if(data[i] == "daynamenotset")
		{
			cell = cell +  getEnglishWeekDay(english_date.getDay());
		}
		else
		{
			if(i == 'day' && action == "monthlyprayerar" && hijri_date_array != undefined)
			{
				cell = cell +  hijri_date_array[2]; // this prints this day>3	hijri_day>undefined	fajr>5:06	sunrise>6:46	dhuhr>1:19	asr>5:00	maghrib>7:52	isha>9:26 on the row

			}
			else
			{
				var ampm_data = "" + data[i];
				ampm_data  = ampm_data.replace("  am", "a");
				ampm_data =  ampm_data.replace("  pm", "p");
				/*if(show_ampm == 0)
				{
					ampm_data  = ampm_data.replace(" am", "");
					ampm_data =  ampm_data.replace(" pm", "");
				}
				else
				{
					ampm_data  = ampm_data.replace(" am", "a");
					ampm_data =  ampm_data.replace(" pm", "p");
				}
				*/
				cell = cell + ampm_data;
			}
		}


		cell = cell + "</td>";
		row = row + cell;
	}
	row = row + "</tr>";
	return row;
}

//make a table row
function makeTableRow(data, items, klass,english_date,hijri_date_array) {
	var row = document.createElement('tr');
	var ai = 1;
	for (var i in items) {
		var cell = document.createElement('td');
		//alert(data[i]);
		if(data[i] == undefined)
		{
			var eng_hijri_date =  getHijriOrEnglishDateLabel(english_date,hijri_date_array);
			cell.innerHTML =  eng_hijri_date; // this prints this day>3	hijri_day>undefined	fajr>5:06	sunrise>6:46	dhuhr>1:19	asr>5:00	maghrib>7:52	isha>9:26 on the row
		}
		else if(data[i] == "daynamenotset")
		{
			cell.innerHTML = getEnglishWeekDay(english_date.getDay());
		}
		else
		{
			if(i == 'day' && action == "monthlyprayerar" && hijri_date_array != undefined)
			{
				cell.innerHTML =  hijri_date_array[2]; // this prints this day>3	hijri_day>undefined	fajr>5:06	sunrise>6:46	dhuhr>1:19	asr>5:00	maghrib>7:52	isha>9:26 on the row

			}
			else
			{
				var ampm_data = "" + data[i];
				if(show_ampm == 0)
				{
					ampm_data  = ampm_data.replace(" am", "");
					ampm_data =  ampm_data.replace(" pm", "");
				}
				else
				{
					ampm_data  = ampm_data.replace(" am", "");
					ampm_data =  ampm_data.replace(" pm", "");
				}
				cell.innerHTML = ampm_data;
			}
		}

		cell.style.width = i =='day' ? '5em' : '4em';
		if(i == 'days')
		{
			cell.style.width ='8em';
		}

		row.appendChild(cell);
	}
	row.className = klass;
	return row;
}


function getHijriOrEnglishDateLabel(english_date,hijri_date_array)
{
	if(action == "monthlyprayeren")
	{

		return "<font color=\"purple\">" + hijri_date_array[1]+"/"+hijri_date_array[2] +"</font>";
		//return getEnglishMonthFullName(english_date.getMonth()) + " " + english_date.getDate()+" "+getEnglishWeekDay(english_date.getDay())+", " + english_date.getFullYear() + " ("+getHijriMonthName(hijri_date_array[1]-1)+" "+hijri_date_array[2]+", "+hijri_date_array[0]+")";

	}
	//return getHijriMonthName(hijri_date_array[1]-1)+" "+hijri_date_array[2]+", "+hijri_date_array[0]+" ("+getEnglishMonthFullName(english_date.getMonth())+" "+ english_date.getDate()+" "+getEnglishWeekDay(english_date.getDay())+", "+english_date.getFullYear()+")";
	return "<font color=\"purple\">" + (parseInt(english_date.getMonth())+1) + "/" + english_date.getDate()+"</font>";


}

//get the day of the week
function getEnglishWeekDay(dayno)
{
	var weekday = new Array("Sun","Mon","Tue","Wed","Thu","Fri","Sat");
	return weekday[dayno];
}

//remove all children of a node
function removeAllChild(node) {
	if (node == undefined || node == null)
		return;

	while (node.firstChild)
		node.removeChild(node.firstChild);
}

// switch time format
function switchFormat(offset) {
	var formats = ['24-hour', '12-hour'];
	timeFormat = (timeFormat+ offset)% 2;
	$('time-format').innerHTML = formats[timeFormat];
	update();
}

/** Start: Generate Monthly prayer times English and arabic month drop down option **/
function getEnglishPayerMothDropdownOptions(numberOfMonth)
{
	var currentDate = new Date();
	var currentMonth = currentDate.getMonth() + 1;
	var currnetYear = currentDate.getFullYear();

	var options = "<option value=\"n\">Gregorian Months</option>\n";

	var start = 0;

	//create option for currentyear
	for(var i = currentMonth; i<= numberOfMonth; i++)
	{
		var days_in_month = daysInMonth(i , currnetYear);
		var selected = "";
		if(i == currentMonth)
		{
			selected = "selected=\"selected\"";
		}
		options = options + "<option "+selected+" value=\"" + currnetYear + "-" + i + "-1"+ "_" + currnetYear + "-" +  i + "-" + days_in_month   + "\">" + getEnglishMonthFullName(i-1) + ", " + currnetYear + "</option>\n";
		start++;
	}

	var nextYear = currnetYear + 1;
	//create option for next year
	for(var i = 1; i<= numberOfMonth ; i++)
	{
		var days_in_month = daysInMonth(i , nextYear);
		options = options + "<option value=\"" + nextYear + "-" + i + "-1"+ "_" + nextYear + "-" +  i + "-" + days_in_month   + "\">" + getEnglishMonthFullName(i-1) + ", " + nextYear + "</option>\n";
	}
	return 	options;
}

function daysInMonth(month,year) {
    return new Date(year, month, 0).getDate();
}

function getArabicPayerMothDropdownOptions(numberOfMonth)
{
	//get current date of arabic
	var arabicCurrentDate = GregToHijri(new Date());

	var arabicCurrentMonth = arabicCurrentDate[1];
	var arabicCurrentYear = arabicCurrentDate[0];

	var options = "<option value=\"n\">Hijri Months</option>\n";

	var isOneYearFlag = true;

	//create option for currentyear
	for(var i = 1; i<= numberOfMonth; i++)
	{
		if(arabicCurrentMonth > 12 && isOneYearFlag == true)
		{
			arabicCurrentYear = arabicCurrentYear + 1;
			arabicCurrentMonth = 1;
			isOneYearFlag = false;
		}
		var arabicStartDate = new Array(arabicCurrentYear,arabicCurrentMonth,1);

		var english_equvant_start_date = HijriToGreg(arabicStartDate);

		var arabicEndDate;

		if(arabicCurrentMonth == 12)
		{
			arabicEndDate = new Array((arabicCurrentYear + 1), 1,1);
		}
		else
		{
			arabicEndDate = new Array(arabicCurrentYear,(arabicCurrentMonth + 1),1);
		}

		var english_equvant_end_date = HijriToGreg(arabicEndDate);

		var english_enddate_string = ""+english_equvant_end_date[0]+"/"+english_equvant_end_date[1]+"/"+english_equvant_end_date[2];


		var aDayBefore = new Date(english_enddate_string);
		aDayBefore.setDate(aDayBefore.getDate() - 1);


		var selected = "";
		if(i == arabicCurrentMonth && isOneYearFlag == true)
		{
			selected = "selected=\"selected\"";
		}

		options = options + "<option "+selected+" value=\"" + english_equvant_start_date[0] + "-" + english_equvant_start_date[1] + "-"+english_equvant_start_date[2]+ "_" +  aDayBefore.getFullYear()+ "-" +(aDayBefore.getMonth()+1)  + "-" + aDayBefore.getDate()   + "\">" + getHijriMonthFullName(arabicCurrentMonth-1) + ", " + arabicCurrentYear + "</option>\n";

		arabicCurrentMonth ++;
	}
	return 	options;
}


/** End: Generate Monthly prayer times drop down option **/

/* When the prayer method will change the UI label will also be changed*/
function showPrayerMethodLabel()
{
	var method_label = $("#"+$("#prayerTimesMethods").val()).html();
	$("#methodLabel").html(method_label);
	var method_labelAsr = $("#"+$("#prayerTimesMethodsAsr").val()).html();
	$("#methodLabelAsr").html(method_labelAsr);
	if(action == "dailyprayer")
	{
		updateLocation($("#address").val());
	}
	else if(action == "monthlyprayeren")
	{
		showPrayerTimesByEnglishOrArabicMonth("english","monthly");
	}
	else if(action == "monthlyprayerar")
	{
		showPrayerTimesByEnglishOrArabicMonth("arabic","monthly");
	}

}

/** Start: Holds arabic and englsih month names**/
//return English month full name
function getEnglishMonthFullName(month) {
	var monthName = new Array('January', 'February', 'March', 'April', 'May', 'June',
					'July', 'August', 'September', 'October', 'November', 'December');
	return monthName[month];
}

//return English month full name
function getEnglishMonthShortName(month) {
	var monthName = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
					'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');
	return monthName[month];
}

function getHijriMonthFullName(month) {
	var monthName = new Array('Muharram', 'Safar', 'Rabi Al-Awwal', 'Rabi Al-Thani', 'Jumada Al-Awwal', 'Jumada Al-Thani' , 'Rajab', 'Sha`ban', 'Ramadan', 'Shawwal', 'Dhul-Qa`dah', 'Dhul-Hijjah');
	return monthName[month];
}

function getHijriMonthName(month) {
	var monthName = new Array('Muharram', 'Safar', 'Rabi Al-Awwal', 'Rabi Al-Thani', 'Jumada Al-Awwal', 'Jumada Al-Thani' , 'Rajab', 'Sha`ban', 'Ramadan', 'Shawwal', 'Dhul-Qa`dah', 'Dhul-Hijjah');
	return monthName[month];
}

function getHijriMonthShortName(month) {
	var monthName = new Array('Muharram', 'Safar', 'Rabi Al-Awwal', 'Rabi Al-Thani', 'Jumada Al-Awwal', 'Jumada Al-Thani' , 'Rajab', 'Sha`ban', 'Ramadan', 'Shawwal', 'Dhul-Qa`dah', 'Dhul-Hijjah');
	return monthName[month];
}
/** End: Holds arabic and englsih month names**/

/** Date conversion English to Arabic and Arabic to English months **/
function intPart(floatNum){
	if (floatNum< -0.0000001){
		 return Math.ceil(floatNum-0.0000001);
	}
	return Math.floor(floatNum+0.0000001);
}

function GregToHijri(arg) {

	console.log ( 'arg' );
	console.log (arg);

	if(arg == ""){
		return "";
	}
	//declare a date format year,month,day sequence
	var arabic_date = new Array(0,0,0);
	var jd;
	var jd1;
	var l;
	var j;
	var n;
	var d = parseInt(arg.getDate());

	var m = parseInt(arg.getMonth()+1); // date type start with 0 - 11, so we need adjust by +1
	var y = parseInt(arg.getFullYear());

	var deltaAdjusted;
	deltaAdjusted = adjustDelta(m,y);


	if ((y>1582)||((y==1582)&&(m>10))||((y==1582)&&(m==10)&&(d>14)))
	{
		//added +delta on jd to comply isna rulling
		jd = intPart((1461*(y+4800+intPart((m-14)/12)))/4)+intPart((367*(m-2-12*(intPart((m-14)/12))))/12)-
				intPart( (3* (intPart(  (y+4900+    intPart( (m-14)/12)     )/100)    )   ) /4)+d-32075 + deltaAdjusted;
	}
	else
	{
		//added +delta on jd to comply isna rulling
		jd = 367*y - intPart((7*(y+5001+intPart((m-9)/7)))/4) + intPart((275*m)/9)+d+1729777 + deltaAdjusted;
	}
	//arg.JD.value=jd
	//added -delta on jd1 to comply isna rulling
	jd1 = jd - deltaAdjusted;
	//arg.wd.value=weekDay(jd1%7)
	l = jd - 1948440 + 10632;
	n = intPart((l-1)/10631);
	l = l-10631*n + 354;
	j = (intPart((10985-l)/5316))*(intPart((50*l)/17719))+(intPart(l/5670))*(intPart((43*l)/15238));
	l = l-(intPart((30-j)/15))*(intPart((17719*j)/50))-(intPart(j/16))*(intPart((15238*j)/43))+29;
	m = intPart((24*l)/709);
	d = l-intPart((709*m)/24);
	y= 30 * n + j - 30;

	arabic_date[2] = d;
	arabic_date[1] = m;
	arabic_date[0] = y;

	return arabic_date;
}

//arabicDate arrumgent as a array
//arabicDate[0] = year
//arabicDate[1] = month
//arabicDate[2] = day
function HijriToGreg(arabicDate) {

	console.log ( 'arabicDate' );
	console.log (arabicDate);


	if(arabicDate == ""){
		return "";
	}
	//declare a date format year,month,day sequence
	var jd;
	var jd1;
	var l;
	var j;
	var n;
	var wd;
	var i;
	var k;

	var d = parseInt(arabicDate[2]);
	var m = parseInt(arabicDate[1]);
	var y = parseInt(arabicDate[0]);

	var deltaAdjusted;
	deltaAdjusted = adjustDelta(m,y);


	var english_date = new Array(0,0,0);

	//added delta=1 on jd to comply isna rulling for hajj 2007

	//delta = delta_array_hijri[arabicDate[1] - 1];


	jd = intPart((11*y+3)/30)+354*y+30*m-intPart((m-1)/2)+d+1948440-385-deltaAdjusted;
	//arg.JD.value=jd
	//wd = weekDay(jd % 7); // no use of this line

	if (jd > 2299160 )
	{
		l = jd + 68569;
		n = intPart((4*l)/146097);
		l = l - intPart((146097*n+3)/4);
		i = intPart((4000*(l+1))/1461001);
		l = l-intPart((1461*i)/4)+31;
		j = intPart((80*l)/2447);
		d = l-intPart((2447*j)/80);
		l = intPart(j/11);
		m = j+2-12*l;
		y = 100*(n-49)+i+l;
	}
	else
	{
		j = jd+1402;
		k = intPart((j-1)/1461);
		l = j-1461*k;
		n = intPart((l-1)/365)-intPart(l/1461);
		i = l-365*n+30;
		j = intPart((80*i)/2447);
		d = i-intPart((2447*j)/80);
		i = intPart(j/11);
		m = j+2-12*i;
		y= 4*k+n+i-4716;
	}

	english_date[2] = d;
	english_date[1] = m;
	english_date[0] = y;

	return english_date;

}


function setsharedlinkhijri()
{

	//alert('setSharedLinkHijri is running');

	var link = "http://www.islamicity.org/Hijri-Gregorian-Converter/";
	$("#facebook_sharedlink").attr("href","http://www.facebook.com/sharer.php?u="+encodeURIComponent(link));

	/*google %20 issue patch*/

	var google_full_url = "http://plus.google.com/share?url=https://www.islamicity.org/Hijri-Gregorian-Converter/";

	$("#google_sharedlink").attr("href",google_full_url);

	var twitter_link;
	twitter_link = 'http://www.islamicity.org/Hijri-Gregorian-Converter/';
	$("#twitter_sharedlink").attr("href","https://twitter.com/intent/tweet?text=Hijri Gregorian Converter by 				IslamiCity.org&url="+encodeURIComponent(twitter_link));
}

function setsharedlink(){
	var link = "#";
	var monthly_or_daily = 'Monthly';
	if(action == "dailyprayer" )
	{
		monthly_or_daily = 'Daily';
		//link = base_url + "action=dailyprayer&address="+$("#address").val()+"&method="+$("#prayerTimesMethods").val();
		link = base_url + "action=dailyprayer&address="+$("#address").val()+"&method="+$("#prayerTimesMethods").val()+"&methodAsr="+$("#prayerTimesMethodsAsr").val();
	}
	else if(action == "monthlyprayeren" )
	{
		monthly_or_daily = 'Monthly';
		//link = base_url + "action=monthlyprayeren__"+$("#prayerTimesByEnglishMonth").val()+"&address="+$("#address").val()+"&method="+$("#prayerTimesMethods").val();
		link = base_url + "action=monthlyprayeren__"+$("#prayerTimesByEnglishMonth").val()+"&address="+$("#address").val()+"&method="+$("#prayerTimesMethods").val()+"&methodAsr="+$("#prayerTimesMethodsAsr").val();

	}
	else if(action == "monthlyprayerar" )
	{
		//link = base_url + "action=monthlyprayerar__"+$("#prayerTimesByArabicMonth").val()+"&address="+$("#address").val()+"&method="+$("#prayerTimesMethods").val();
		link = base_url + "action=monthlyprayerar__"+$("#prayerTimesByArabicMonth").val()+"&address="+$("#address").val()+"&method="+$("#prayerTimesMethods").val()+"&methodAsr="+$("#prayerTimesMethodsAsr").val();

	}
	$("#sharedlink").val(link);
	$("#facebook_sharedlink").attr("href","http://www.facebook.com/sharer.php?u="+encodeURIComponent(link));

	/*google %20 issue patch*/

	google_link = "https%3A%2F%2Fwww.islamicity.org%2FPrayerTimes";

	google_link = encodeURIComponent(google_link);

	google_link = blp_replace(google_link,'%20', 'AMP20HERE');

	email_link = google_link;


	//document.write (google_link);
	//document.write ("<hr>");

	//var google_full_url = "https://plus.google.com/share?url="+google_link;
    var google_full_url = "https://plus.google.com/share?url=https%3A%2F%2Fwww.islamicity.org%2FPrayerTimes";
	//document.write ('google_full_url:' + google_link);
	//document.write ("<hr>");

	$("#google_sharedlink").attr("href",google_full_url);

	var twitter_link;
	twitter_link = 'https://www.islamicity.org/prayertimes';
	$("#twitter_sharedlink").attr("href","https://twitter.com/intent/tweet?text=IslamiCity WorldWide Prayer Times&url="+encodeURIComponent(twitter_link));


	var subject = monthly_or_daily + ' Prayer Times for ' +  $('#address').val() + ' - Served by IslamiCity.org/PrayerTimes';
	var email_link = "?body=" + google_link + "&subject=" + encodeURIComponent(subject);
	$("#mailto_link").attr("href","mailto:" + email_link);

	//set embeded code
	//var embededlink = embeded_url + "lat="+$("#lastvisitedlat").val()+"&long="+$("#lastvisitedlong").val()+"&elev="+$("#lastvisitedeve").val()+"&address="+$("#address").val()+"&method="+$("#prayerTimesMethods").val()+"&show_ampm="+show_ampm+"&city="+$("#city").val();
	var embededlink = embeded_url + "lat="+$("#lastvisitedlat").val()+"&long="+$("#lastvisitedlong").val()+"&elev="+$("#lastvisitedeve").val()+"&address="+$("#address").val()+"&method="+$("#prayerTimesMethods").val()+"&methodAsr="+$("#prayerTimesMethodsAsr").val()+"&show_ampm="+show_ampm+"&city="+$("#city").val();

	var embededcode = "<iframe width=\"300\"  height=\"450\" src=\""+embededlink+"\" frameborder=\"0\" scrolling=\"no\"></iframe>";
	//$("#embedded").attr("href",embededlink);
	$("#embededcode").val(embededcode);
}

/** Start: Cookie Code to store and read last search address
 * Reference: http://www.w3schools.com/js/js_cookies.asp
 **/
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}
/** End: Cookie Code to store and read last search address **/
function ShowMonthlyEn(daterange){
	if (maploaded){
		$("#prayerTimesByEnglishMonth").val(daterange);
		showPrayerTimesByEnglishOrArabicMonth('english','monthly');
	}
	else
	{
		setTimeout("ShowMonthlyEn('"+daterange+"');", 200);
	}
}
function ShowMonthlyAr(daterange){
	if (maploaded){
		$("#prayerTimesByArabicMonth").val(daterange);
		showPrayerTimesByEnglishOrArabicMonth('arabic','monthly');
	}
	else
	{
		setTimeout("ShowMonthlyAr('"+daterange+"');", 200);
	}

}

function defaultMonthlyDropdownset()
{
	var nowDate = new Date();
	var month = nowDate.getMonth() + 1;
	var year = nowDate.getFullYear();

	var days_in_month = daysInMonth(month , year);

	var current_englsih_date = year + "-" + month + "-1"+ "_" + year + "-" +  month + "-" + days_in_month;

	$("#prayerTimesByEnglishMonth option[value='"+current_englsih_date+"']").attr("selected", "selected");

	var arabic_nowDate = GregToHijri(nowDate);
	var monthsno = arabic_nowDate[1] <10 ?  "(0"+arabic_nowDate[1]+")" : "("+arabic_nowDate[1]+")";
	var sm = getHijriMonthName(arabic_nowDate[1]-1)+monthsno+", "+arabic_nowDate[0];
	$("#prayerTimesByArabicMonth option:contains(" + sm + ")").attr('selected', 'selected');

}

function printcontent()
{
	 $.fn.colorbox.close();
	 var data = "";
	 if(action == "dailyprayer")
	 {
		 data = $("#dailytimetable").html();
	 }
	 else
	 {
		 data = $("#montlyprayerprintview").html();
	 }

	 if(data == "" || data == null)
	 {
		alert("You do not have any information to print.");
		return false;
	 }


	  var mywindow = window.open('', 'Prayer Times by IslamiCity.org', 'height=1000,width=750');
	  mywindow.document.write('<html><head><title>Prayer Times by IslamiCity.org</title>');
	  mywindow.document.write('<style>.monthly_ptvh_print_address{text-align:center !important;font-size:11px !important;}#monthly_ptvh{display:none;}#monthly_ptvh_print{display:block;}#monthly_ptvc tbody{color:#1a1919 !important;}#monthly_view_close{display:none !important;} .english-name{font-size:11px;} .printing-area-popup{width:695px !important;} .printing-area-popup td{text-align:center !important;font-weight:normal  !important;} printing-area-popup th{text-align:center !important;font-weight:normal  !important;} .printing-body {width: 100%;float: left;box-sizing: border-box;padding: 10px 10px;}	.logo-area { display: block;  float: left;}	.date-area {  display: block; float: right;font-size: 15px;margin-top: 4.7em;color:#1a1919 !important;}.printing-text-center {text-align: center; } .printing-border { border: 1px solid black; } .printing-no-padding { margin: 0; padding: 0; } table {  width:100% !important;border-collapse: collapse;  border-spacing: 0;  font-family: "arial", sans-serif; }  .printing-header-color {  background-color: #939598 !important; color: white !important;    height: 35px; font-weight:normal  !important;  overflow: hidden; }  .printing-header-color > th { font-weight:normal  !important;   padding: 5px !important;  }  tr:nth-child(even) { background-color: #C7C8CA; height: 25px; overflow: hidden; } tr:nth-child(odd) {height: 25px; overflow: hidden; font-weight:normal  !important;} </style>');
	  mywindow.document.write('</head><body><div class="printing-area-popup">');

		data = data.replace('<img src="assets/images/logo.jpg">','<img src="assets/images/logo.jpg" style="height:53px">');
		data = data.replace('<div class="date-area"','<div style="font-size: 12px;margin-top: 3em;" class="date-area"');

	  mywindow.document.write(data);
	  mywindow.document.write('</div></body></html>');

	  mywindow.document.close(); // necessary for IE >= 10
	  mywindow.focus(); // necessary for IE >= 10


	 if (navigator.userAgent.toLowerCase().indexOf("chrome") > -1)
     {
		 setTimeout(function(){ mywindow.print();},500);
		 //setTimeout(function(){mywindow.close();}, 2000);
     }
	 else
     {
		 mywindow.print();
		 mywindow.close();
     }

     return true;
}

function applysettings()
{

	var link = "#";
	var monthly_or_daily = 'Monthly';
		monthly_or_daily = 'Daily';
		link = base_url + "action=dailyprayer&address="+$("#address").val()+"&method="+$("#prayerTimesMethods").val()+"&methodAsr="+$("#prayerTimesMethodsAsr").val()+"&audioalerts="+$("#prayerTimesAudioAlerts").val()+"&prayerTimesAdhan="+$("#prayerTimesAdhan").val()+"&visualalerts="+$("#prayerTimesVisualAlerts").val();
	//alert('apply Settings is link ' + link);
	setCookie("is_default_methods_set",1,365);
	showHidePopup('#qibladetailspopup',0);
	location.href = link;
}

function gotohome()
{
	location.href = base_url + "action=dailyprayer&address="+$("#address").val();
}

function adjust_timezone_if_needed (timezone_to_be_adjusted,country, state, city, todays_date){
	if (false){ // we passed nov 8. so turkey's issue is over.
		if ( country.toLowerCase() == 'turkey' ){
			console.log ( 'adjusted timezone for ' + country + ', ' + state + ', ' + city );
			timezone_to_be_adjusted = timezone_to_be_adjusted + 1;
		}
	}
	return timezone_to_be_adjusted;
}

function getCurrentTimeStamp()
{
	return Math.floor(Date.now()/1000);
}


function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

function getQuibleDistanceInMile(lat,long)
{
	var distance_to_qaba = getDistanceFromLatLonInKm( lat,long,21.422558, 39.826325);
	//var distance_to_qaba = getDistanceFromLatLonInKm( 21.420107, 39.823723,21.422558, 39.826325);
	var miles = distance_to_qaba/1.609;
	var miles_formatted = parseFloat(Math.round(miles * 100) / 100).toFixed(2);
	return miles_formatted;
}
function closeMonthlyPrayerTime()
{
	$("#monthlyPrayerCanvas").fadeOut();
	$("#dailyPrayerCanvas").show();

}
function getQueryCaption() {
	// returns either state,country ( like istanbul, turkey ) or  city, abbreviated sate ( like los angeles, ca )

	var cur_country = $("#country").val();
	var cur_state = $("#state").val();
	var cur_city  = $("#city").val();


	var cur_queryCaption = cur_country;
	// fix the long state name into abbr ( applies to USA ONLY )
	if ( cur_country == 'United States') {

	  var retVal = abbrState(cur_state, 'abbr') ;
	  if ( retVal != '') {
		cur_state = retVal; // so California goes as CA
	  }
	}



	if ( cur_city !== '' ){

		if ( cur_country == 'United States') {
			cur_queryCaption = cur_city + ', ' + cur_state;
		} else {
			cur_queryCaption = cur_city + ', ' + cur_country;
		}

	} else {

		// city_obtained was tbd!

		if ( cur_state !== '' ){

			cur_queryCaption = cur_state + ', ' + cur_country;

		} else {

			// state_obtained was tbd!
			cur_queryCaption = cur_country;

		}
	}

	return cur_queryCaption;
}

// USAGE:
// abbrState('ny', 'name');
// --> 'New York'
// abbrState('New York', 'abbr');
// --> 'NY'

function abbrState(input, to){

    var states = [
        ['Arizona', 'AZ'],
        ['Alabama', 'AL'],
        ['Alaska', 'AK'],
        ['Arizona', 'AZ'],
        ['Arkansas', 'AR'],
        ['California', 'CA'],
        ['Colorado', 'CO'],
        ['Connecticut', 'CT'],
        ['Delaware', 'DE'],
        ['Florida', 'FL'],
        ['Georgia', 'GA'],
        ['Hawaii', 'HI'],
        ['Idaho', 'ID'],
        ['Illinois', 'IL'],
        ['Indiana', 'IN'],
        ['Iowa', 'IA'],
        ['Kansas', 'KS'],
        ['Kentucky', 'KY'],
        ['Kentucky', 'KY'],
        ['Louisiana', 'LA'],
        ['Maine', 'ME'],
        ['Maryland', 'MD'],
        ['Massachusetts', 'MA'],
        ['Michigan', 'MI'],
        ['Minnesota', 'MN'],
        ['Mississippi', 'MS'],
        ['Missouri', 'MO'],
        ['Montana', 'MT'],
        ['Nebraska', 'NE'],
        ['Nevada', 'NV'],
        ['New Hampshire', 'NH'],
        ['New Jersey', 'NJ'],
        ['New Mexico', 'NM'],
        ['New York', 'NY'],
        ['North Carolina', 'NC'],
        ['North Dakota', 'ND'],
        ['Ohio', 'OH'],
        ['Oklahoma', 'OK'],
        ['Oregon', 'OR'],
        ['Pennsylvania', 'PA'],
        ['Rhode Island', 'RI'],
        ['South Carolina', 'SC'],
        ['South Dakota', 'SD'],
        ['Tennessee', 'TN'],
        ['Texas', 'TX'],
        ['Utah', 'UT'],
        ['Vermont', 'VT'],
        ['Virginia', 'VA'],
        ['Washington', 'WA'],
        ['West Virginia', 'WV'],
        ['Wisconsin', 'WI'],
        ['Wyoming', 'WY'],
    ];

    if (to == 'abbr'){
        input = input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
        for(i = 0; i < states.length; i++){
            if(states[i][0] == input){
                return(states[i][1]);
            }
        }
    } else if (to == 'name'){
        input = input.toUpperCase();
        for(i = 0; i < states.length; i++){
            if(states[i][1] == input){
                return(states[i][0]);
            }
        }
    }
}




function adjustDelta(m,y){

	// whenever there is an adjustment to be made
	// ( be it for the current month or for a future month/date ), use this!
	// add new cases, without deleting the previous ones
	// make sure each case comes with its hijriToGreg and GregToHijri pairs ( ex: 1438 & 2017 )

	// note whenever you make changes to the scripts, update the version at /prayertimes/version-integer.php
	var bingo = false; // this gets set to true only if there is an adjustment match and allow us to short-circuit the function
	var returnVal = delta; // this is what comes from the config.js, if no adjustment match occurs, this prevails at the end of the function return

	var deltaORGNOW = delta;

	//alert('Happy Ramadan');

	if ( MHK && false ) {
		alert( 'get the m and y correct for both cases first:\n\n' + 'm: ' + m  + '\ny: ' + y   );
	}


	// ramadan 1438 fix
	//-----------------------------------------------------------------
	if ( ( m == 6 && y == 2017 ) ||  ( m == 9 && y == 1438 ) ) {
		bingo = true;
		returnVal = 0;
	};

	if ( ( m == 7 && y == 2017 ) ||  ( m == 11 && y == 1438 ) ) {
		bingo = true;
		returnVal = 0;
	};

	if ( ( m == 2 && y == 2018 ) ||  ( m == 6 && y == 1438 ) ) {
		bingo = true;
		returnVal = 0;
	};


	if ( ( m == 5 && y == 2018 ) || ( m == 8 && y == 1439 ) ) {
		bingo = true;
		returnVal = 0;
	};

	if ( ( m == 8 && y == 2018 ) || ( m == 12 && y == 1439 ) ) {
		bingo = true;
		returnVal = 1;
	};



	if ( ( m == 6 && y == 2019 ) || ( m == 9 && y == 1440 ) ) {
		//alert("Happy Ramadan");
		bingo = true;
		returnVal = 1;   // -1 maps to ramaan 30, 0 maps to shawaal 1, 1 maps to shawaal 2
	};


	if ( ( m == 9 && y == 2019 ) || ( m == 1 && y == 1441 ) ) {
		bingo = true;
		returnVal = 1;
	};


	// read the ^ readme-txt


	if ( bingo ) {
		return returnVal;
	}
	//-----------------------------------------------------------------


	return returnVal;

}

```
