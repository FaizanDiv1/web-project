const request=require('request')


const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYmlsYWxtdW5pcjExNiIsImEiOiJja2QwNHM4OW8wcTZyMnNwdnQ4djM1amtxIn0.QHDzH1VIlGUmY41MqOmM-Q&limit=1'
    request({'url':url,json:true},(error,{body})=>{
            if(error){
            callback('Unable to connect to the location services.',undefined)
        }
        else if(body.features.length===0)
        {
            callback('Unable to find location try another location.',undefined)
        }
        else{
            callback(undefined,{
                longitude:body.features[0].center[0],
                latitude:body.features[0].center[1],
                location:body.features[0].place_name,
        
            })
            
        }
    
    })
    }
    module.exports=geocode