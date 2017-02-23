
var ClarifaiAPI = require('clarifai');
var baseUrl = window.location.origin;

// instantiate a new Clarifai app passing in your clientId and clientSecret
var app = new ClarifaiAPI.App(
  'kkVEd0anMdSZQ1dWaawCQpB-PYjpNlMPAj64dzpR',
  'b1IE4eesq2Hl6M6VLfYQseUuObLQyFAFi951rTwR'
);
// dropArea = document.getElementById("imageFound");
var dropbutton = document.getElementById("ProcesVideo");
var dropArea = document.getElementById("ResultArea");
var video = document.getElementById("videoContent");
video.setAttribute('crossOrigin', 'anonymous');

dropbutton.addEventListener("click", imageDropped, false);

function imageDropped(evt) {

  app.models.predict(Clarifai.COLOR_MODEL, "https://samples.clarifai.com/wedding.jpg").then(
    function(response) {
      // do something with response
      console.log("Response is", response);
    },
    function(err) {
      // there was an error
      console.log("Error is", err);
    }
  );

  // evt.stopPropagation();
  // evt.preventDefault(); 

  // var imageHTML = evt.dataTransfer.getData("text/html"),
  //     dataParent = $("<div>").append(imageHTML),
  //     imageRequested = $(dataParent).find("video").attr("src");
  //     // $imageFound = $("#imageFound");
  
  // console.log(imageRequested);

  // // $imageFound.attr("src", imageRequested);
  // var canvas = document.createElement('canvas');
  // canvas.width = 640;
  // canvas.height = 480;
  // var context = canvas.getContext('2d');
  // context.drawImage(video, 0, 0, canvas.width, canvas.height);
  // var dataURI = canvas.toDataURL('image/jpeg');

  // $.ajax({
  //   type: "POST",
  //   url: baseUrl + "/videoTest",
  //   contentType: "application/json; charset=utf-8",
  //   dataType: "json",
  //   data: JSON.stringify({"imageRequested": ""}),

  //   success: function(data) {
  //     console.log(data);
  //     var tags = "";
  //     for (var i = 0; i < data.length; i++) {
  //       tags += data[i];
  //       if (i != data.length - 1) tags += ", ";
  //     }
  //     $(dropArea).html(tags);
  //   },
  //   error: function() {
  //     console.log("We had an error!");
  //   }
  // });

  // function getthumbnail() {
  //   var canvas = document.createElement('canvas');
  //   canvas.width = 640;
  //   canvas.height = 480;
  //   var context = canvas.getContext('2d');
  //   context.drawImage(video, 0, 0, canvas.width, canvas.height);
  //   var dataURI = canvas.toDataURL('image/jpeg');
  //   return dataURI;
  // }
}