const express = require('express');
const https = require('https');
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/signup.html')
})

app.post('/',(req,res)=>{

    const firstName = req.body.firstName; 
    const lastName = req.body.lastName;
    const email = req.body.email;

    const data = {
        members:[
           {
            email_address:email,
            status:'subscribed',
            merge_fields:{
                FNAME:firstName,
                LNAME:lastName
            }
           } 
        ]
    }

    const JsonData = JSON.stringify(data);

    const url = 'https://us8.api.mailchimp.com/3.0/lists/0b8d080299'
    const options = {
        method:'POST',
        auth:'richy:390727da40665f41c079868635ae22c6-us8'
    }

    const request= https.request(url,options,(response)=>{

        if(response.statusCode==200){
            res.sendFile(__dirname+'/success.html')
        }else{
            res.sendFile(__dirname+'/failure.html')
        }

        response.on('data',(data)=>{
            console.log(JSON.parse(data));
        })
     })

    request.write(JsonData);
    request.end();

})

app.listen(3000,console.log('server running on port 3000'))

// const apiKey = '390727da40665f41c079868635ae22c6-us8';
// const apiListId = ' 0b8d080299';