const request = require ('request')

const forecast = (latitude, longitude, callback) => {
    url = `http://api.weatherstack.com/current?access_key=78357807d4f9d581aecdc7253f808e66&query=${latitude},${longitude}&units=f`
    request ({url, json:true}, (error, {body}) => {
        if (error) {
            callback(`unable to connect to weather service. Please check your internet connectivity and try again`, undefined)
        }else if (body.error) {
            callback(`Unable to find location`, undefined)
        }else { 
            callback (undefined, `Currently ${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees with a humidity of ${body.current.humidity}. It feels like ${body.current.feelslike} degree fahrenheit out.`)
        }
    })
}

module.exports = {
    forecast:forecast
}