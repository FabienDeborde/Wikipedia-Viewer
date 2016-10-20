$(document).ready(function() {
  // Stuff to do as soon as the DOM is ready

  // Declare all variables
  var searchForm = $('#searchForm');
  var result = $('#formResult');
  var randomButton = $('a#randomSearch');
  var msg = '';
  var urlQuery ='';
  var keyword = '';

  // Prepare the AJAX query

  function wikiQuery(url){
    $.ajax({
      method: "GET",
      url: url,
      dataType: "jsonp",
      crossDomain: true,
      headers: { 'Api-User-Agent': 'Example/1.0' },
      timeout: 2000,
      beforeSend: function(){
        result.text('Searching...');
      },
      success: function(data){
        console.log(data);

        /*
        var reqData = data.query.search;
        msg = '<div class="resultContainer">';
        for (var i = 0; i < reqData.length; i += 1) {
          msg += '<div class="result">';
          msg += '<h1>' + reqData[i].title + '</h1>';
          msg += '<div class="description">' + reqData[i].snippet + '</div></div> <hr>';
        }
        msg += '</div>';
        result.html(msg);*/



        var pageID = Object.keys(data.query.pages);
        var queryData = data.query.pages[pageID];
        var cleanText = queryData.extract.slice(0,-4);
        

        msg = '<div class="resultContainer">';
        msg += '<h1>' + queryData.displaytitle + '</h1>';
        msg += cleanText + '</div>';

        result.html(msg);
        $('.resultContainer p').append('<span>...<span>');

        $('.resultContainer').on('click', function(){
          window.open(queryData.fullurl, '_blank');
        })



      },
      error: function(jqXHR){
        result.html('<span class="error">An error occured. Please try again later.</span>');
        console.log(jqXHR);
      }
    }); // end of ajax function
  }

  searchForm.on('submit', function(e){
    e.preventDefault();
    // Get the keyword value when the form is submitted
    keyword = $('#searchInput').val();
    // Make the query url
    urlQuery = '//en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts%7Cinfo&list=&titles=' + keyword + '&exchars=475&inprop=url%7Cdisplaytitle';
    // Call the query function
    wikiQuery(urlQuery);
  }); // end of function searchForm.on submit

  // Random Button

  randomButton.on('click', function(e){
    e.preventDefault();
    urlQuery = '//en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts%7Cinfo&meta=&titles=paris&exchars=400&inprop=url%7Cdisplaytitle'; // random page access
    wikiQuery(urlQuery);
  })

});
/*https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=Stack%20Overflow

/w/api.php?action=query&format=json&prop=extracts%7Cinfo&list=&titles=paris&exchars=475&inprop=url%7Cdisplaytitle

//en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts%7Cinfo&list=search&meta=&continue=-%7C%7Cextracts%7Cinfo&titles=&exchars=475&inprop=url%7Cdisplaytitle&srsearch=paris&srnamespace=0%7C4&srlimit=10
*/
