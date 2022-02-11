const path = require ('path')
const express = require ('express')
const hbs = require('hbs')
const { request } = require('http')
const geocode = require ('./utils/geocode')
const forecast = require ('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//setting path for Express variables

const publicPageDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setting non-default values for views and view engine

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials (partialsPath)

//setting static path for files to be rendered

app.use(express.static(publicPageDirectory))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Manoj Srinivas',        
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Manoj Srinivas'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        message:'Weather App brings you the current weather from around the globe. Just provide the name of the city you want to get weather details about.',
        name: 'Manoj Srinivas'
    })
})

app.get ('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'No query string sent. Please add an address'
        })
    }

    geocode.geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            res.send({error})
        } else {
            forecast.forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    res.send ({error})
                } else {
                    res.send ({
                        location,
                        forecast: forecastData,
                        address: req.query.address
                    }) 
                }
            })
        }
    })
})


app.get('/help/*',(req, res) => {
    res.render('error', {
        title: 'Error!',
        message: 'Help article cannot be found',
        name: "Manoj Srinivas"
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        message: '404 page not found',
        name: 'Manoj Srinivas'
    })
})
app.listen(port, () => {
    console.log(`server started on port ${port}`)
})