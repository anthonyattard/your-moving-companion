
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
    return false;
};

$('#form-container').submit(loadData);
