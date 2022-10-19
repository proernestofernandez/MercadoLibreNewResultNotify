const mongoose = require('mongoose');
const Query = mongoose.model('query');
const ItemQuery = mongoose.model('item_query');
const Item = mongoose.model('item');
const axios = require('axios');
const http = require('http');



exports.execute_fligt_query = async () => {
    console.log("OPA")
    return doQueryTocToc();
};



doQueryTocToc = async () => {

    var data = JSON.stringify({
        "flexibleDatesBoolean": false,
        "adults": 4,
        "kids": 0,
        "babies": 0,
        "travelType": 2,
        "airlines": "",
        "ticketType": "0",
        "stops": "4",
        "corporationCodeGlas": null,
        "flightSearchLegs": [
            {
                "departCode": "MVD",
                "arrivalCode": "LON",
                "departDate": "2023-08-16"
            },
            {
                "departCode": "MAD",
                "arrivalCode": "MVD",
                "departDate": "2023-08-30"
            }
        ],
        "searchTrigger": 3
    });

    var config = {
        method: 'POST',
        url: 'http://localhost:3000/api/flight/multiCities',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    const promises = axios(config)
    Promise.allSettled(promises).then((values) => {
        return JSON.stringify(response.data);
    })



}