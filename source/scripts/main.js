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
            $(this).append("<p>"+ data[0].trends[i].name +"</p>")
          })
      },
      true // this parameter required
  );



// TWITTER API BELOW
// https://github.com/jublonet/codebird-js
// var cb = new Codebird;
// cb.__call(
//     "oauth2_token",
//     {},
//     function (reply, err) {
//         var bearer_token;
//         if (err) {
//             console.log("error response or timeout exceeded" + err.error);
//         }
//         if (reply) {
//             bearer_token = reply.access_token;
//         }
//     }
// );
})
