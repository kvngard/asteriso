var geo = null;
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
    
  });
  
});