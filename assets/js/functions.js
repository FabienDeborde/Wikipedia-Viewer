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

        var pageID = Object.keys(data.query.pages); // Array storing the ids of all articles returned by the query
        var queryData = ''; // Store the path to each article data
        var articleID = ''; // Store each article ID
        var cleanText = ''; // Store the article extracted and cleaned text
        var title = ''; // Store the page title
        var articleLink = []; // Store the url to the article

        msg = '<div class="resultContainer">';

        for (var i = 0; i < pageID.length; i+= 1) {
          articleID = pageID[i];
          queryData = data.query.pages[articleID];
          title = queryData.title;
          articleLink.push(queryData.fullurl);
          cleanText = queryData.extract.slice(0,-3);
          msg += '<div class="singleResult" id="' + i + '"><h1>' + title + '</h1><div class="textContent">' + cleanText + '</div></div>';
          msg += '<hr/>';
        }
        msg += '</div>';
        result.html(msg);
        $('.textContent p:last-child').append('<span>...<span>');



        $('.singleResult').on('click', function(e){
          var id = $(this).attr("id");
          window.open(articleLink[id], '_blank');
        })

        /*
        if (random === false) {

        } else {  // Get Random Data (randomButton clicked)

          var randomID = data.query.random[0].id;
          $.ajax({
            method: "GET",
            url: '//en.wikipedia.org/w/api.php?action=query&format=json&prop=info|extracts&list=&continue=&pageids=' + randomID + '&inprop=url|displaytitle&exchars=400',
            dataType: "jsonp",
            crossDomain: true,
            headers: { 'Api-User-Agent': 'Example/1.0' },
            timeout: 2000,
            success: function(data){
              var pageID = Object.keys(data.query.pages);
              var queryData = data.query.pages[pageID];
              var cleanText = queryData.extract.slice(0,-4);

              msg = '<div class="resultContainer"><div class="singleResult">';
              msg += '<h1>' + queryData.displaytitle + '</h1>';
              msg += cleanText + '</div></div>';

              result.html(msg);
              $('.singleResult p:last-child').append('<span>...<span>');

              $('.resultContainer').on('click', function(){
                window.open(queryData.fullurl, '_blank');
              }) // end of on click function
            } // end of success function
          }) // end of ajax function

        } // end of else*/

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
    urlQuery = '//en.wikipedia.org/w/api.php?action=query&format=json&prop=info|extracts&generator=search&inprop=url|displaytitle&exchars=400&exlimit=5&exintro=1&gsrsearch=' + keyword + '&gsrnamespace=0&gsrlimit=5&gsrqiprofile=classic';
    // Call the query function
    wikiQuery(urlQuery);
  }); // end of function searchForm.on submit

  // Random Button

  randomButton.on('click', function(e){
    e.preventDefault();
    urlQuery = '//en.wikipedia.org/w/api.php?format=json&action=query&prop=info|extracts&generator=random&inprop=url|displaytitle&exchars=400&exlimit=10&exintro=1&grnnamespace=0'; // random page access
    wikiQuery(urlQuery);
  })

});

/*
/*https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=Stack%20Overflow

/w/api.php?action=query&format=json&prop=extracts|info&list=&titles=paris&exchars=475&inprop=url|displaytitle

//en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts|info&list=search&meta=&continue=-||extracts|info&titles=&exchars=475&inprop=url|displaytitle&srsearch=paris&srnamespace=0|4&srlimit=10

https://en.wikipedia.org
/w/api.php?format=jsonfm&
action=query&
prop=info|extracts&
generator=random&
inprop=url|displaytitle&
exchars=400&
exlimit=10&
exintro=1&
grnnamespace=0




// /w/api.php?format=json&
action=query&
generator=search&
gsrnamespace=0&
gsrsearch=test&
gsrlimit=10&
prop=pageimages|extracts&
pilimit=max&
exintro&
explaintext&
exsentences=1&
exlimit=max

// /w/api.php?format=json&
action=query&
generator=search&
gsrnamespace=0&
gsrsearch=paris&
gsrlimit=10&
gsrqiprofile=classic&
prop=info|extracts&
inprop=url|displaytitle&
exintro&
explaintext&
exsentences=1&
exlimit=max
// /w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrsearch=paris&gsrqiprofile=classic&gsrlimit=10&prop=info|extracts&inprop=url|displaytitle&exchars=400

// /w/api.php?format=json&action=query&prop=info|extracts&generator=search&inprop=url|displaytitle&exchars=400&exlimit=10&exintro=1&gsrsearch=paris&gsrnamespace=0&gsrlimit=5&gsrqiprofile=classic
//
*/
