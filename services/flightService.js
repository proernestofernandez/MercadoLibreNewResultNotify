const mongoose = require('mongoose');
const Query = mongoose.model('query');
const ItemQuery = mongoose.model('item_query');
const Item = mongoose.model('item');
const axios = require('axios');
const http = require('http');



exports.execute_fligt_query = async (query_params) => {
    
    let result = [];
    const promises = Array.from(Array(28).keys()).map(async (initOffset,index1) => {

        var dateInit = new Date("2023-08-01");
            dateInit.setDate(dateInit.getDate() + initOffset);
            dateInit = dateInit.getUTCFullYear()+'-'+String(dateInit.getUTCMonth()+1).padStart(2, '0') +'-'+String(dateInit.getUTCDate()).padStart(2, '0')


        const promises2 = Array.from(Array(4).keys()).map(async (endOffset,index2) => {

            
            var dateEnd = new Date("2023-08-14");
            dateEnd.setDate(dateEnd.getDate() + initOffset + endOffset);
            dateEnd = dateEnd.getUTCFullYear()+'-'+String(dateEnd.getUTCMonth()+1).padStart(2, '0') +'-'+String(dateEnd.getUTCDate()).padStart(2, '0')
       
            let flight_params = JSON.parse(JSON.stringify(query_params));
            flight_params.flightSearchLegs[0].departDate = dateInit;
            flight_params.flightSearchLegs[1].departDate = dateEnd;
            flight_params.stops = 1;
            
            await new Promise(r => setTimeout(r, 2000*(index1*4 + index2)));
            console.log(dateInit + " - "+ dateEnd);
            const flight = await doQueryTocToc(flight_params);
            result[index1*4 + index2] = flight;
        });
        await Promise.all(promises2);

        console.log("TERMINO " + dateInit);
    });
    await Promise.all(promises)


    result.sort(function(a, b){
        return a.result.adultPrice - b.result.adultPrice
    });

    return result;
};



doQueryTocToc = async (query_params) => {
    var data = query_params;

    var initMilkConfig = {
      method: 'post',
      url: 'https://api.toctocviajes.com/api/flights',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };

  async function toctocInfo() {
    const response = await axios(initMilkConfig)
    return response.data
  }

  const flights = await toctocInfo();


let cheapest = 9999
let result = {};

const promises = flights.map(async (flight,index) => {
    if (flight.adultPrice < cheapest && flight.flightLegs[0].baggageAllowance[0].checked[0].pieces > 0
        && flight.flightLegs[1].baggageAllowance[0].checked[0].pieces > 0 
        && flight.flightLegs[0].stopsQty < 3 
        && flight.flightLegs[1].stopsQty < 3 
        && flight.flightLegs[0].durationHours < 20
        && flight.flightLegs[1].durationHours < 20 ){
        // console.log("CAMBIO "+cheapest+" por "+flight.adultPrice)
        cheapest = flight.adultPrice;
        result = {
            adultPrice: flight.adultPrice,
            flightRates: flight.flightRates.adultSellingPriceAmount,

            durationHours0: flight.flightLegs[0].durationHours,
            durationMinutes0: flight.flightLegs[0].durationMinutes,
            company0: flight.flightLegs[0].company,
            initDate0: flight.flightLegs[0].departureDate,
            endDate0: flight.flightLegs[0].arrivalDate,
            baggageAllowance0: flight.flightLegs[0].baggageAllowance[0].checked[0].pieces,
            stops0: flight.flightLegs[0].stops,
            stopsFullName0: flight.flightLegs[0].stopsFullName.replace('<br />','  |  '),

            durationHours1: flight.flightLegs[1].durationHours,
            durationMinutes1: flight.flightLegs[1].durationMinutes,
            company1: flight.flightLegs[1].company,
            initDate1: flight.flightLegs[1].departureDate,
            endDate1: flight.flightLegs[1].departureDate,
            baggageAllowance1: flight.flightLegs[1].baggageAllowance[0].checked[0].pieces,
            stops1: flight.flightLegs[1].stops,
            stopsFullName1: flight.flightLegs[1].stopsFullName.replace('<br />','  |  '),
        }
        
        
    }
   
});
await Promise.all(promises)

return {result};

}