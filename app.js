var Clarifai = require("./Clarifai_Client_V2.js"),
  express = require("express"),
  app = express(),
  server = require("http").Server(app),
  bodyParser = require("body-parser"),
  port = process.env.PORT || 5000;
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json({limit: '50mb'}));

var ClarifaiV1 = require("./clarifai_node.js");

app.use(bodyParser.json());

ClarifaiV1.initAPI("kkVEd0anMdSZQ1dWaawCQpB-PYjpNlMPAj64dzpR", "b1IE4eesq2Hl6M6VLfYQseUuObLQyFAFi951rTwR");

function identifyClarifaiError(err) {
  if (typeof err["status_code"] === "string" && err["status_code"] === "TIMEOUT") {
    console.log("TAG request timed out");
  }
  else if (typeof err["status_code"] === "string" && err["status_code"] === "ALL_ERROR") {
    console.log("TAG request received ALL_ERROR. Contact Clarifai support if it continues.");       
  }
  else if (typeof err["status_code"] === "string" && err["status_code"] === "TOKEN_FAILURE") {
    console.log("TAG request received TOKEN_FAILURE. Contact Clarifai support if it continues.");       
  }
  else if (typeof err["status_code"] === "string" && err["status_code"] === "ERROR_THROTTLED") {
    console.log("Clarifai host is throttling this application.");       
  }
  else {
    console.log("TAG request encountered an unexpected error: ");
    console.log(err);       
  }
}

app.get("/", function(request, response) {
  response.sendFile(__dirname + "/public/index.html");
});

app.get(/^(.+)$/, function(req, res) {
  res.sendFile(__dirname + "/public/" + req.params[0]);
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.all("/videoTest", function(req, resp) {
  // var thumbURL = req.body.imageRequested;
  var thumbURL1 = "http://imgh.us/Screen_Shot_2017-02-15_at_11.00.10_PM.png";
  var thumbUrls = req.body.thumbUrls;
  // console.log("Video URL:", thumbUrls);
  // var thumbURL2 = "http://imgh.us/Screen_Shot_2017-02-15_at_10.57.11_PM.png";
  // var thumbURL3 = "http://imgh.us/Screen_Shot_2017-02-15_at_11.00.10_PM.png";
  var urls = thumbUrls;
  // var videoURL = "https://s3.amazonaws.com/demo-back-end-prod-demo-uploads/IMG_2005.mov06Feb201703-51-01GMT.mov";
  // console.log("Response was ", urls);
  // urls.append(thumbURL1);

  // Clarifai.tagURL(thumbURL,"Detect Color", commonResultHandler);

  function commonResultHandler(err, res) {
    if (err != null) {
      resp.send("Error: " + err);
    }
    else {
      if (res) {
        console.log("Response :", res);

        // var results_array = res.results;
        // console.log("Results :", results_array);
        // var results_tags = results_array[0].result;
        // console.log("Tags :", results_tags);
        // var tags_classes = results_tags.tag.classes;
        // console.log("Classes :", tags_classes);
        // console.log("Classe Item:", tags_classes[0]);

        // var colorItem = {hex:res.item.raw_hex, value: res.max_value};
        // console.log("Result Response:",colorItem);
        resp.send(res);
      } else {
        resp.send("Error: Something went wrong.");
      }
      // if (typeof res["status_code"] === "string" && 
      //   (res["status_code"] === "OK" || res["status_code"] === "PARTIAL_ERROR")) {

      //   if (res["results"][0]["status_code"] === "OK") {
      //     console.log(JSON.stringify(res["results"][0]));
      //     var tags = res["results"][0].result["tag"]["classes"];
      //     resp.send(res);
      //   }
      //   else {
      //     console.log("We had an error... Details: " +
      //       " docid=" + res.results[0].docid +
      //       " local_id=" + res.results[0].local_id + 
      //       " status_code="+res.results[0].status_code +
      //       " error = " + res.results[0]["result"]);

      //     resp.send("Error: " + res.results[0]["result"]);
      //   }
      // }    
    }
  }

  Clarifai.colorDetect(urls,commonResultHandler);
  // ClarifaiV1.colorURL(urls,"Color Detect",commonResultHandler);
});

server.listen(port, function() {
  console.log("Listening on " + port);
});