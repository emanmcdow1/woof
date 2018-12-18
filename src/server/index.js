const express = require('express');
const os = require('os');

const app = express();
app.get('/react', function(req,res){
  app.send('react.png')
})
app.listen(8080, () => console.log('Listening on port 8080!'));
