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
  cb.setProxy('https://codebird-proxy.herokuapp.com/');
  //https://github.com/jublonet/codebird-js#requests-with-app-only-auth
  //https://github.com/jublonet/codebird-js#mapping-api-methods-to-codebird-function-calls
  // var twitterName = document.getElementsById('twitter-seacrh').val();
  var params = {
    id:  1
    };

  var $trendContainers = $('.trend');
      // $trendContainers.each(function(i){
      //   $(this).append("<p>"+ testTrends[i] +"</p>")
      // })
  cb.__call(
      "trends_place",
      params,
      function (data, rate, err) {
          $trendContainers.each(function(i){
            $(this).append("<p>" + data[0].trends[i].name + "</p>")
          })
      },
      true // this parameter required
  );

  var articleTitle;
  var articleURL;


  function getNews(newsTopic){
    $.ajax(newsTopic)
      .done(function(data) {
      alert("success");
        console.log(data.result.docs[0].source.enriched.url.title);
        console.log(data.result.docs[0].source.enriched.url.url);
        // articleTitle = data.result.docs[0].source.enriched.url.title;
        // articleURL = data.result.docs[0].source.enriched.url.url;
    })
      .fail(function() {
        alert("error");
    })
  }


  $trendContainers.on("click", "p", function(){
    var alchemyAPIquery = "https://gateway-a.watsonplatform.net/calls/data/GetNews?outputMode=json&start=now-1d&end=now&count=5&q.enriched.url.enrichedTitle.keywords.keyword.text=" + $(this).text() + "&return=enriched.url.url,enriched.url.title&apikey=884243d26352312be01ce6cfcfb5cf276e9000a2";
    getNews(alchemyAPIquery);
    // $(this).append("<a href=" + articleURL + ">" + articleTitle + "</a>");
    // console.log($(this).text());
  })

})
