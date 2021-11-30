const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({extended:true}))

app.get('/', (request, response)=>{
    response.sendFile(__dirname+'/index.html', function(err){
        if(!err){
            console.log('get request from browser ended..!')
        }
    })
})

app.post('/', function(request,response){
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + request.body.city + '&appid=0a8c1bc36daf1528ee2f7613ab618f80'
    https.get(url, (res)=>{
        res.on('data', function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const icon = weatherData.weather[0].icon
            const description = weatherData.weather[0].description
            const image_url = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"
 
            response.write(`<h1>Temperature in ${request.body.city} is ${Number(temp)-273}`)
            response.write(`<h1>Description : ${description}</h1>`)
            response.write("<img src="+image_url+'>')
            response.end()
        })
    })
    console.log(request.body)
})


app.listen(8000, function(){

})