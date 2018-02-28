	
	
var header = 
	"<label for=\"show-menu\" class=\"show-menu\">Show Menu</label>" +
	"<input type=\"checkbox\" id=\"show-menu\" role=\"button\">" +
        "<ul id=\"menu\">" +
          "<li><a href=\"/home.html\">Home</a></li>" +
          "<li>" +
            "<a href=\"#\">About <i class=\"fa fa-angle-down\" aria-hidden=\"true\"></i></a>" +
            "<ul class=\"hidden\">" +
              "<li><a href=\"#\">Who I Am</a></li>" +
              "<li><a href=\"Tutorial.html\">What I Do</a></li>" +
            "</ul>" +
          "</li>" +
          "<li>" +
            "<a href=\"#\">Current Iterations<i class=\"fa fa-angle-down\" aria-hidden=\"true\"></i></a>" +
            "<ul class=\"hidden\">" +
              "<li><a href=\"/MonoChroma.html\">MonoChroma</a></li>" +
              "<li><a href=\"/audioChroma.html\">A Foray into Color</a></li>" +
			  "<li><a href=\"/TriBand.html\">TriBand</a></li>" +
              "<li><a href=\"#\">Future Edition</a></li>" +
            "</ul>" +
          "</li>" +
          "<li><a href=\"/studies.html\">Studies</a></li>" +
          "<li><a href=\"#\">Contact</a></li>" +
		"</ul>";		
$(".header").html(header);

  $(document).ready(function () {
        var url = window.location;
        $('.header li a').filter(function() {
             return this.href == url;
        }).addClass('active');
		 var url = window.location;
        $('.header li ul li a').filter(function() {
             return this.href == url;
        }).addClass('active');
    });