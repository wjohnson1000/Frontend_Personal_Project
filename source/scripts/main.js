$(document).ready(function(){
// if(jQuery){
//   alert('loaded');
// }
// var alchemyAPIquery = "https://gateway-a.watsonplatform.net/calls/data/GetNews?outputMode=json&start=now-1d&end=now&count=5&q.enriched.url.enrichedTitle.keywords.keyword.text=" + selectedTopic + "&return=enriched.url.url,enriched.url.title&apikey=884243d26352312be01ce6cfcfb5cf276e9000a2";
var testTrends = [
  "trend1trend1trend1trend1trend1trend1", "trend2", "trend3", "trend4", "trend5", "trend6"
]
// https://github.com/jublonet/codebird-js
  var cb = new Codebird;
  cb.setBearerToken("AAAAAAAAAAAAAAAAAAAAAK97igAAAAAAL6M3uxb0OEWglYZcJpxq89e46zY%3Dt682yccM1IgilC04xfWysYugpZ2ZzmaLpIcvNTB9L6xhdjaAXC");
  // I created this CORS proxy using the codebird cors proxy source https://github.com/jublonet/codebird-cors-proxy/
  // If you comment out this line, it will use the default proxy created by the codebird author https://api.jublo.net/codebird/
  // cb.setProxy('https://codebird-proxy.herokuapp.com/');
  //https://github.com/jublonet/codebird-js#requests-with-app-only-auth
  //https://github.com/jublonet/codebird-js#mapping-api-methods-to-codebird-function-calls
  // var twitterName = document.getElementsById('twitter-seacrh').val();
  var params = {
    id:  23424977 // yahoo WOEID for USA
    };

  var $trendContainers = $('.trend');
  // function testCall(){$trendContainers.each(function(i){
  //       $(this).append("<p>"+ testTrends[i] +"</p>")
  //     })
  //   }
  // testCall();
  function call(){cb.__call(
      "trends_place",
      params,
      function (data, rate, err) {
        $trendContainers.each(function(i){
          if (!err){
            var formattedTrend = data[0].trends[i].name.replace(/\s+/g, '').replace("#", '');
            $(this).append("<p>" + data[0].trends[i].name + "</p>");
            $(this).addClass(formattedTrend);
            localStorage.setItem("topic" + i, data[0].trends[i].name);
            localStorage.setItem("class" + i, formattedTrend);
          } else {
            $(this).append("<p>" + localStorage.getItem("topic" + i) + "</p>");
            $(this).addClass(localStorage.getItem("class" + i));
          }
        })
      },
      true // this parameter required
    );
  }
  call();


  function getNews(alchemyAPIquery, newsTopic){
    $.ajax(alchemyAPIquery)
      .done(function(data) {
        for (var i = 0; i < 3; i++) {
          // console.log(data.result.docs[i].source.enriched.url.title);
          // console.log(data.result.docs[i].source.enriched.url.url);
          var articleTitle = data.result.docs[i].source.enriched.url.title;
          var articleURL = data.result.docs[i].source.enriched.url.url;
          var newsLink = $("<a href=" + articleURL + ">" + articleTitle + "</a>");
          $("." + newsTopic.replace(/\s+/g, '') + "> p").hide();
          $("." + newsTopic.replace(/\s+/g, '')).append(newsLink);
        }
    })
      .fail(function() {
        alert("error");
    })
  }

  $trendContainers.on("click", "a", function(event){
    event.preventDefault();
    window.open($(this).attr("href"));
  })
//window.open, window.location.href for new tabs


  $trendContainers.on("click", "p", function(){
    var newsTopic = $(this).text().replace("#",'');
    var alchemyAPIquery = "https://gateway-a.watsonplatform.net/calls/data/GetNews?outputMode=json&start=now-1d&end=now&count=5&q.enriched.url.enrichedTitle.keywords.keyword.text=" + newsTopic + "&return=enriched.url.url,enriched.url.title&apikey=884243d26352312be01ce6cfcfb5cf276e9000a2";
    getNews(alchemyAPIquery, newsTopic);
  })

  $('footer').on("click", "h1", function(){
    $trendContainers.empty();
    // testCall();
    call();
  })

})
