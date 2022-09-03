const request = require('request')

const forecast = (latitude, longitude, callback)=>{

    const url = 'http://api.weatherstack.com/current?access_key=dc626cf894d7304a48a9b13b7cbf5d9c&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=f'

    request({url, json:true}, (error, { body }={})=>{
        if(error){
            callback('Unable to connect to weather service!', undefined)
        }else if (body.error){
            callback('Unable to find location', undefined)
        } else {
            const messageStr = `Weather currently is: ${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees. Humidity detected is ${body.current.humidity}% and visibility is ${body.current.visibility}`
            callback(undefined, messageStr )
        }
    })
}

module.exports = forecast