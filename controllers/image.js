
const axios = require('axios');


const handleApiCall = (req, res) => {
    
    const photo = req.body.input;
    const USER_ID = '7fl9jpkdqtst';   
    const APP_ID = 'test';
    const IMAGE_URL = photo;
  
    const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": IMAGE_URL
                  }
              }
          }
      ]
  });
  
    const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Key 6dff7b9517b545bfb5ed7f4b9b06ffdf'
    },
    body: raw
   };

   axios.post("https://api.clarifai.com/v2/models/face-detection/outputs", requestOptions)
    .then(response => response.json())
    .then(data => {
      res.json(data)
    })
    .catch(err => res.status(400).json('unable to work with api'))
    }

const handleImage = (db) => (req, res) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
       res.json(entries[0].entries);
    })
    .catch(err => res.status(400).json('unable to get entries'))
  }

  module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
  }