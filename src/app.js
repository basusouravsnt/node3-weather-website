const path = require('path')
const express = require('express')  // express is just a function instead of object
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname,'..', 'public'))

const app = express()   //app has now all the methods



//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'..', 'public')
const viewsPath = path.join(__dirname,'..','templates','views')
const partialsPath = path.join(__dirname,'../templates/partials')


//Setup handlebars engine and views location
app.set('view engine', 'hbs')      //mentioning the templating engine
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath)) //static takes the path to serve up //index.html always serves up root path

// app.get('', (req, res)=> {  //expects the url and a function ( which has two arguments request and response)
//     res.send('<h1>Weather</h1>')
// })

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Sourav Basu'
    })
})

app.get('/about',(req, res)=>{
    res.render('about', {
        title: 'About me',
        name: 'Sourav Basu'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message:'Help me Please',
        title: 'Help',
        name: 'Sourav Basu'
    })
})


app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You Must Provide an Address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecast)=>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast,
                location,
                address: req.query.address
            })
        })
    })
})


app.get('/products',(req, res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: [],
    })
})

app.get('/help/*', (req, res)=>{
    res.render('error',{
        message: 'Help Article not found',
        name: "Sourav Basu",
        title: '404!'
    })
})

app.get('*', (req, res)=>{
    res.render('error',{
        message:'Page not Found!',
        name: "Sourav Basu",
        title: '404!'
    })
})


app.listen(3000, ()=> {         //also accepts callback
    console.log('Server is up on port 3000')
})