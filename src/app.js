const path=require('path')
const express=require('express')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const Weather = require('./db')

const hbs=require('hbs')

//define paths for express config
const app=express()
const port=process.env.PORT || 3000
const viewspath=path.join(__dirname,'../templates/views')
const partialspath=path.join(__dirname,'../templates/partials')
const publicDirectoryPath=path.join(__dirname,'../public')

//setup handlebars engine and views location
app.set('views',viewspath)
app.set('view engine','hbs')
hbs.registerPartials(partialspath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

//app.com
//app.com/help
//app.com/about

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Faizan-FA17-BCS-108'
    })
})
app.get('/admin',(req,res)=>{
    res.render('admin',{
        helptext:'This is admin page!',
        title:'Admin',
        name:'Faizan-FA17-BCS-108'
    })
})
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Faizan-FA17-BCS-108'
    })
})
app.get('/weather', (req,res)=>{
    // const weather = new Weather()
    const address=req.query.address
    if(!address){
        return res.send({error:'You must provide a address'})
    }


    geocode(address,(error,{latitude,longitude,location}={})=>{
        if(error)
        {
            return res.send({error})
        }
    
    forecast(latitude, longitude, (error, forecastData) => {
       if(error)
       {
           return res.send({error})
       }
       res.send({location,forecastData,address})
       const weather = new Weather ({location: location, forecast: forecastData})
       weather.save(()=>{
           if(!error){
                console.log(weather)
           }
           
       })
      })
    
    })







    
})


// app.get('/products',(req,res)=>{
//     if(!req.query.search)
//     {
//        return res.send({error:'you must provide a search term'})
//     }
//     console.log(req.query.search)
//     res.send({
//         products:[]
//     })
// })


app.get('/success/',(req,res)=>{
    res.render('success',{
        title:'Admin Panel',
        message:'Admin logged in !',
        name:'Faizan',
    })

})
app.get('*',(req,res)=>{
    res.render('error',{
        title:'Error',
        message:'Page not found',
        name:'Faizan',
    })
})

app.listen(port,()=>{
    console.log('Server is up on port '+port)
})