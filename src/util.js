// const { require } = require("yargs");

const request = require("request")

// const request=require('request');
// const url='https://api.weatherstack.com/current?access_key=b0014e85f87101290eaf2e6c32242376&query=Kalburgi'
//  request({url:url,json:true},(error,response)=>{
//     if(error){
//         console.log("Unable to start weather service")
//     } 
//     else if(response.body.error){
//         console.log("Please check the location you r looking for")
//     }
//     else{
//     console.log(`${response.body.current.weather_descriptions}.It is currently ${response.body.current.temperature} degrees out but feels like ${response.body.current.feelslike} degrees.`)
//  }
// })

//  const location='https://api.tomtom.com/search/2/geocode/kedarnath%20dham%20uttarakhand.json?key=pCAGJVGhYjnavtj2o7JoQXg97LLIUem8'
//  request({url:location,json:true},(error,response)=>{
//     if(error){
//         console.log("unable to start geocoding service")
//     }
//     else if(response.body.errorText){
//         console.log("Please check the location you r looking for")
//     }
//     else{
//     console.log("latitude= ",response.body.results[0].position.lat)
//     console.log("longitude= ",response.body.results[0].position.lon)
//     }
//  })
const city= process.argv[2];

 const geocode=(address,callback)=>{
    const location='https://api.tomtom.com/search/2/geocode/'+encodeURIComponent(address)+'.json?key=pCAGJVGhYjnavtj2o7JoQXg97LLIUem8'
    request({url:location,json:true},(error,{body}={})=>{
    if(error){
        callback("unable to start geocoding service",undefined)
    }
    else if(body.results.length===0){
        callback("Please recheck the location you r looking for",undefined)
    }
    else {
        callback(undefined,{
    latitude:body.results[0].position.lat,
    longitude:body.results[0].position.lon,
    location:body.results[0].address.freeformAddress
    })
 }
})
 }

const weather=(lat,long,callback)=>{
    const endpoint='https://api.weatherstack.com/current?access_key=b0014e85f87101290eaf2e6c32242376&query='+encodeURIComponent(lat)+','+encodeURIComponent(long);
    request({url:endpoint,json:true},(error,{body}={})=>{
        if(error){
         callback("Unable to start weather service",undefined)
     } 
     else if(body.error){
         callback("Please check the location you r looking for",undefined)
     }
     else{
     callback(undefined,`${body.current.weather_descriptions}.It is currently ${body.current.temperature} degrees out but feels like ${body.current.feelslike} degrees.`)
  }
    })
}
if(!city){
    console.log("Please enter the city")
}
else{
geocode(city,(error,{latitude,longitude}={})=>{
if(error){
 return console.log("Error: ",error)
}
// else{
// console.log("DATA: ",response)
//  }
 weather(latitude,longitude,(error,weatherresponse)=>{
    if(error){
     console.log("Error: ",error)}
    else{
      console.log("DATA: ",weatherresponse)
    }
})
})
}
module.exports = {
  geocode,
  weather
};
