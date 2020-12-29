const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../src/utils/geocode.js')
const forecast = require('../src/utils/forecast.js')

const app = express()
const port = process.env.PORT || 300
//Define paths for express config 
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//setup static direcctory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) =>{
    
    res.render('index',{
        title:'Wheather',
        author:"Andrew"
    })
})
app.get('/about', (req,res) =>{
    res.render('about',{
        company:"NODE JS",
        author:"ANDREW",
        title:'ABOUT'
    })
})
app.get('/help', (req,res) =>{
    res.render('help',{
        message:"How can we help you?",
        title:"HELP",
        author:'Med'
    })
})
app.get('/weather',(req,res) =>{
    if(!req.query.address){
        return res.send({
            error: 'you must provide address'
        })
    }
geocode(req.query.address,(error, {latitude, longitude, location } = {}) =>{
if(error){
    return res.send({error})
}
forecast(latitude,longitude,(error, forecastData)=>{
    if(error){
        return res.send({error})
    }
    res.send({
        forecast: forecastData,
        location,
        address:req.query.address
    })
})
})
  
})
app.get('/products',(req,res) =>{
    if(!req.query.search){
        return res.send({
            error: 'you must provide search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res) =>{
    res.render('404', {
        title:'404',
        author:'Andrew',
        errorMessage:"Help Page Not Found"
    })
    })
app.get('*',(req,res) =>{
res.render('404',{
    title:'404',
    author:'Andrew',
    errorMessage:"Page Not Found"
})
})
app.listen(port, () =>{
    console.log('server is up!' + port)
})
/*
app.get('',(req,res) =>{
    res.send('<h1>Node JS Wheather Application</h1>')
})
app.get('/help', (req,res) =>{
res.send([{name:'surya',age:24},{name:'andrew',age:28}])
})
//about
app.get('/about',(req,res) =>{
    res.send('<h1>Welcome to About page.....!</h1>')
})
// wheather
app.get('/wheather',(req,res) =>{
    res.send({forecast:"UK",locatin:"overseas"})
})*/
