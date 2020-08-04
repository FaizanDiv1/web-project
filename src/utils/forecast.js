const request =require('request')


const forecast=(lat,lon,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=e9e3715a4773a44a6e4674a766e232c1&query='+lat+','+lon+'&units=f'
    request({url,json:true},(error,{body})=>{
    
        if(error){
            callback('Unable to connect to the location services.',undefined)
        }
        else if(body.error)
        {
            callback('Unable to find location try another location.',undefined)
        }
        else{

            callback(undefined,'It is '+body.current.weather_descriptions[0]+'. Current Temperature is '+body.current.temperature+'F & It feels like '+body.current.feelslike+'F.')
        }
    })
}
module.exports=forecast