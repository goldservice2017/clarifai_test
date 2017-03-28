# clarifai_test
Introduction

This is an basic video recognition implementation with Clarifai(https://clarifai.com/).

This test is providing following API functions:

• Color detecting from inputed video or image

• Thumbnail capturing from inputed video or image

• Video tag detecting from inputed video or image


Installation

• Clone this repository on your machine

git clone https://github.com/ChongChan2017/clarifai_test.git

• Install Node packages

npm install

• Run app.js

node app.js

• Test tutorial on the browser

http://localhost:5000/


Basic Code Snippets
- Create Clarifai instance:

// Require the client

var Clarifai = require('clarifai');

// instantiate a new Clarifai app passing in your clientId and clientSecret

var app = new Clarifai.App(
  '{clientId}',
  '{clientSecret}'
);

- Color API

• Request:

app.models.predict("eeed0b6733a644cea07cf4c60f87ebb7", "https://samples.clarifai.com/metro-north.jpg").then(
    function(response) {
      // do something with response
    },
    function(err) {
      // there was an error
    }
  );
  
  
• Response:


{
  "status": {
    "code": 10000,
    "description": "Ok"
  },
  "outputs": [
    {
      "id": "a23850cfef834671b4010d566c4923ae",
      "status": {
        "code": 10000,
        "description": "Ok"
      },
      "created_at": "2016-11-22T17:31:21Z",
      "model": {
        "name": "color",
        "id": "eeed0b6733a644cea07cf4c60f87ebb7",
        "created_at": "2016-05-11T18:05:45Z",
        "app_id": null,
        "output_info": {
          "message": "Show output_info with: GET /models/{model_id}/output_info",
          "type": "color"
        },
        "model_version": {
          "id": "dd9458324b4b45c2be1a7ba84d27cd04",
          "created_at": "2016-07-13T01:19:12Z",
          "status": {
            "code": 21100,
            "description": "Model trained successfully"
          }
        }
      },
      "input": {
        "id": "a23850cfef834671b4010d566c4923ae",
        "data": {
          "image": {
            "url": "https://samples.clarifai.com/metro-north.jpg"
          }
        }
      },
      "data": {
        "colors": [
          {
            "raw_hex": "#513f2c",
            "w3c": {
              "hex": "#696969",
              "name": "DimGray"
            },
            "value": 0.14725
          },
          {
            "raw_hex": "#7298e2",
            "w3c": {
              "hex": "#6495ed",
              "name": "CornflowerBlue"
            },
            "value": 0.31575
          },
          {
            "raw_hex": "#1e181b",
            "w3c": {
              "hex": "#000000",
              "name": "Black"
            },
            "value": 0.20175
          },
          {
            "raw_hex": "#8f714b",
            "w3c": {
              "hex": "#d2b48c",
              "name": "Tan"
            },
            "value": 0.1125
          },
          {
            "raw_hex": "#d2c275",
            "w3c": {
              "hex": "#bdb76b",
              "name": "DarkKhaki"
            },
            "value": 0.017
          },
          {
            "raw_hex": "#141b3c",
            "w3c": {
              "hex": "#000000",
              "name": "Black"
            },
            "value": 0.12
          },
          {
            "raw_hex": "#404b84",
            "w3c": {
              "hex": "#483d8b",
              "name": "DarkSlateBlue"
            },
            "value": 0.0705
          },
          {
            "raw_hex": "#e5e1cc",
            "w3c": {
              "hex": "#faebd7",
              "name": "AntiqueWhite"
            },
            "value": 0.01525
          }
        ]
      }
    }
  ]
}
