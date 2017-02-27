// var ClarifaiAPI = require('clarifai');
var baseUrl = window.location.origin;

// instantiate a new Clarifai app passing in your clientId and clientSecret
// var app = new ClarifaiAPI.App(
//   'kkVEd0anMdSZQ1dWaawCQpB-PYjpNlMPAj64dzpR',
//   'b1IE4eesq2Hl6M6VLfYQseUuObLQyFAFi951rTwR'
// );
// dropArea = document.getElementById("imageFound");
var dropbutton = document.getElementById("ProcesVideo");
var uploadbutton = document.getElementById("videoUpload");
var dropArea = document.getElementById("ResultArea");
var videoSrc = document.getElementById("videoContent");
videoSrc.setAttribute('crossOrigin', 'anonymous');
var thumb1 = document.getElementById("img1");
var thumb2 = document.getElementById("img2");
var thumb3 = document.getElementById("img3");
var snapshot1, snapshot2, snapshot3;
var URL = window.URL || window.webkitURL;
var fileURL;
var canvas_elem;
var video_duration;
var isVideoLoaded = false;

dropbutton.addEventListener("click", imageDropped, false);
var displayMessage = function (message, isError) {
    var element = document.querySelector('#message')
    element.innerHTML = message
    element.className = isError ? 'error' : 'info'
}
$('#videoUpload').change(function () {
    var file = this.files[0]
    var type = file.type
    var canPlay = videoSrc.canPlayType(type)
    if (canPlay === '') canPlay = 'no'
    var message = 'Can play type "' + type + '": ' + canPlay
    var isError = canPlay === 'no'
    displayMessage(message, isError)

    if (isError) {
      return
    }

    fileURL = URL.createObjectURL(file)
    videoSrc.src = fileURL
    var videoItem = $( '<video autoplay class=snapshot_generator></video>' ).appendTo(document.body);
    videoItem.src = fileURL;

    if (isVideoLoaded == false) {
      window.setInterval(function(t){
        if (videoSrc.readyState > 0) {
          video_duration = Math.round(videoSrc.duration);        
          window.clearInterval(t);
          getThumbnailImage();
        }
      },500);
    };
    
});
function getThumbnailImage(){
  canvas_elem = $( '<canvas class=snapshot_generator></canvas>' ).appendTo(document.body)[0];
  canvas_elem1 = $( '<canvas class=snapshot_generator></canvas>' ).appendTo(document.body)[0];
  canvas_elem2 = $( '<canvas class=snapshot_generator></canvas>' ).appendTo(document.body)[0];
  var step_2_events_fired = 0;
  $("#videoContent").one('loadedmetadata loadeddata suspend', function() {
      if (++step_2_events_fired == 3) {
          console.log("Next Step:");
          $("#videoContent").one('seeked', function() {
              canvas_elem.height = this.videoHeight;
              canvas_elem.width = this.videoWidth;
              canvas_elem.getContext('2d').drawImage(this, 0, 0);
              snapshot1 = canvas_elem.toDataURL();
              thumb1.src = snapshot1;
              isVideoLoaded = true;
              // Remove elements as they are no longer needed
              $(canvas_elem).remove();
          }).prop('currentTime', video_duration / 3);
          $("#videoContent").one('seeked', function() {
              canvas_elem1.height = this.videoHeight;
              canvas_elem1.width = this.videoWidth;
              canvas_elem1.getContext('2d').drawImage(this, 0, 0);
              snapshot2 = canvas_elem1.toDataURL();
              thumb2.src = snapshot2;
              isVideoLoaded = true;
              // Remove elements as they are no longer needed
              $(canvas_elem1).remove();
          }).prop('currentTime', video_duration / 2);
          $("#videoContent").one('seeked', function() {
              canvas_elem2.height = this.videoHeight;
              canvas_elem2.width = this.videoWidth;
              canvas_elem2.getContext('2d').drawImage(this, 0, 0);
              snapshot3 = canvas_elem2.toDataURL();
              thumb3.src = snapshot3;
              isVideoLoaded = true;
              // Remove elements as they are no longer needed
              $(canvas_elem2).remove();
          }).prop('currentTime', video_duration * 2 / 3);
      }
  }).prop('src', fileURL);
}
function imageDropped(evt) {
  var urls = [];
  if (snapshot1 || snapshot2 || snapshot3 ) {
    if (snapshot1) {
      var str_snapshots1 = snapshot1.split(",");
      urls.push(str_snapshots1[1]);
    } 
    if (snapshot2) {
      var str_snapshots2 = snapshot2.split(",");
      urls.push(str_snapshots2[1]);
    }
    if (snapshot3) {
      var str_snapshots3 = snapshot3.split(",");
      urls.push(str_snapshots3[1]);
    }
  }
  $.ajax({
    type: "POST",
    url: baseUrl + "/videoTest",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    data: JSON.stringify({"thumbUrls": urls}),

    success: function(data) {
      console.log(data);
      var tags = "";
      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        tags += item.item.raw_hex;
        if (i != data.length - 1) tags += ", ";
      }
      // tags += data.hex;
      $(dropArea).html(tags);
    },
    error: function() {
      console.log("We had an error!");
    }
  });
  
}