
const axios = require('axios');


const handleApiCall = async (req, res) => {  
    const photo = req.body.id;
    const IMAGE_URL = photo;
  
    const raw = JSON.stringify({
      "user_app_id": {
          "user_id": '7fl9jpkdqtst',
          "app_id": 'test'
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
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Key 6dff7b9517b545bfb5ed7f4b9b06ffdf'
    }
   };
   try {
    const response = await axios.post("https://api.clarifai.com/v2/models/face-detection/outputs",raw, requestOptions) 
      console.log(response.data)
      res.json(response.data)
   } catch (error) {
    console.log(error); res.status(400).json('unable to work with api')
   }
  }

const handleImage = (db, req, res) => {
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