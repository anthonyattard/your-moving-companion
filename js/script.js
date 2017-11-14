
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');
    var $streetView = $('#streetView');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");
    $streetView.remove();

    // load streetview
    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;

    $greeting.text('So you want to live at ' + address + '?');

    var $streetURL = "https://maps.googleapis.com/maps/api/streetview?size=600x400&location=" + address;
    $body.append('<img class="bgimg" id="streetView" src="' + $streetURL + '">' );


    // NYTimes AJAX
    var nyTimesAPIKey = config.NY_TIMES_API_KEY // Replace with your API Key for The New York Times
    var nyTimesURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

    nyTimesURL += '?' + $.param({
        'api-key': nyTimesAPIKey,
        'sort': "newest",
        'q': cityStr
    });

    $.getJSON(nyTimesURL, function( data ) {
        $nytHeaderElem.text('New York Times Articles About ' + cityStr);

        articles = data.response.docs;

        var items = [];

        $.each( articles, function() {
            items.push('<li class="article">'+
                '<a href='+this.web_url+'>'+this.headline.main+'</a>'+
                '<p>'+this.snippet+'</p>'+
                '</li>');
        });

        $( "<ul/>", {
            "id": "nytimes-articles",
            html: items.join( "" )
        }).appendTo( $nytElem );
  
    }).fail(function(e){
        $nytHeaderElem.text('New York Times Articles Could Not Be Loaded');
    });

    return false;


};

$('#form-container').submit(loadData);
