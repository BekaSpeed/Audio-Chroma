$.getJSON('/getMusic', function(json) {
  var options = '<option value=""></option>';
  $.each(json, function(i, item) {
    options += '<option value="' + item + '">' + item + '</option>';
  });
  $('#songs').html(options);
})
.done(function() { console.log('getMusic getJSON request succeeded!'); })
.fail(function(jqXHR, textStatus, errorThrown) {
  console.log('getMusic getJSON request failed! ' + textStatus);
  console.log('incoming ' + jqXHR.responseText);
})
.always(function() { console.log('getMusic getJSON request ended!');
});

$('#songs').on('change', function() {
  var $selected = $('#songs').find(':selected').text();
  $('#audio').attr('src', './music/' + $selected);
});

function getData()
{
	 $.ajax(
   {
	   url: "https://api.getsongbpm.com/search/?api_key=ddc0aaf5425f7f5216975a10ad511860&type=artist&lookup=green+day", 
	   method: "GET",
	   success: function(result){
        var data = document.createTextNode(result);
		$('#data').appendChild(data);
    }});
};