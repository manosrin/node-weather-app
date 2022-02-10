const request = require('request')

const geocode = (address,callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibWFub2pzcmluaXZhcyIsImEiOiJja2Q0c3Y1Y2oxMmQ5MnlwNTB1YXljaWgzIn0.dn8BepSIgbunKwHeTzojiQ`
    
    request ({url, json: true}, (error, {body}) => {
        if (error) {
            callback(`unable to connect to geocode service. Please check your internet connectivity and try again`, undefined)
        } else if (body.message === "Not Found"|| body.features.length === 0) {
            callback(`unable to find the location`, undefined)
         } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
                })
            }
        })

}

module.exports = {
    geocode:geocode
}