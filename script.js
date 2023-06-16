const fs = require('fs');

    res.send('hello world')
    fs.readFile('./hello.txt', (err, data) => {
    if(err){
        console.log('error');
    }
    console.log(data.toString('utf8'));
})