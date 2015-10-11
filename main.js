var moons = {0:'wi-moon-new', 0.05: 'wi-moon-waxing-crescent-2', 0.1: 'wi-moon-waxing-crescent-3', 0.15: 'wi-moon-waxing-crescent-4', 0.2: 'wi-moon-waxing-crescent-6', 0.25: 'wi-moon-first-quarter', 0.3: 'wi-moon-waxing-gibbous-1', 0.35: 'wi-moon-waxing-gibbous-3', 0.4: 'wi-moon-waxing-gibbous-4', 0.45: 'wi-moon-waxing-gibbous-6', 0.5: 'wi-moon-full', 0.55: 'wi-moon-waning-gibbous-2', 0.6: 'wi-moon-waning-gibbous-3', 0.65: 'wi-moon-waning-gibbous-5', 0.7: 'wi-moon-waning-gibbous-6', 0.75: 'wi-moon-third-quarter', 0.8: 'wi-moon-waning-crescent-1', 0.85: 'wi-moon-waning-crescent-2', 0.9: 'wi-moon-waning-crescent-4', 0.95: 'wi-moon-waning-crescent-6'}
var monthNames = [
  "January", "February", "March",
  "April", "May", "June", "July",
  "August", "September", "October",
  "November", "December"
];

function formatDate(date){
  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();
  var fullDate = monthNames[monthIndex] +" " + day + ", " + year;
  
  return fullDate;
}

function formatTime(d){
  var h = addZero(d.getHours()) % 12;
  var m = addZero(d.getMinutes());
  var fullTime = h + ":" + m;

  fullTime = fullTime + "PM MST";

  /*else{
    fullTime = fullTime + "AM MST";
  }*/
  return fullTime;
}

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

var t = document.querySelector('#gmap');

$(function() {
  
  $(document).on('change', '#location', function() {
    var address = $("#location").val();
    $.ajax({
      url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyCcoOLVBqhdsxvxeoR6s2KYTQktNrxkHE8",
      dataType: 'json'
    }).done(function(results) {
      geo = results.results[0].geometry;
      t.latitude = geo.location.lat + 0.005;
      t.longitude = geo.location.lng
      ;
    });
     $.ajax({
      url: "http://api.openweathermap.org/data/2.5/weather?lat=" + t.latitude + "&lon=" + t.longitude + "&APPID=2cf89c1d53be8f70a040718c251ce13f",
      dataType:'json'
    }).done(function(results) {
      console.log(results)
      $("#weather").text(results)
    });
  });
   
  $(document).on('click', '.btn', function() {
    $('.calendar').css("display","block");
    $.ajax({
      url: "http://api.asteriso.dnsbty.com/"+ t.latitude + "/" + t.longitude,
      dataType: 'json'
    }).done(function(results) {
      var date = new Date(results.response[0].dateTimeISO);
      $("#fullDay").text(formatDate(date));
      var moonSet = new Date(results.response[0].moon.setISO);
      
      $('#sunSet').text("Sunset: " + formatTime(new Date(results.response[0].sun.setISO)));
      $('#moonRise').text("Moon Rise: " + formatTime(new Date(results.response[0].moon.riseISO)));
      $('#moonSet').text("Moon Set: " + formatTime(new Date(results.response[0].moon.setISO)));
      
      var mclass = moons[(Math.round(results.response[0].moon.phase.phase * 20) / 20).toFixed(2) % 1]
      var phase = results.response[0].moon.phase.name;
      $("#phase").text(phase)
      $('#moon').addClass(mclass);
      
    });
  }); 
   $(document).on('click', '#close-btn', function() {
    $('.calendar').css("display","none");
  });
    
  
});