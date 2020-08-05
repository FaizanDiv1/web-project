const path=require('path')
const express=require('express')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

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
        name:'Bilal Munir'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        helptext:'This is help page!',
        title:'Help',
        name:'Bilal Munir'
    })
})
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Bilal Munir'
    })
})
app.get('/weather',(req,res)=>{
    const address=req.query.address
    if(!address){
        return res.send({error:'you must provide a address'})
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


app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'Error',
        message:'Help article not found',
        name:'Bilal Munir',
    })

})
app.get('*',(req,res)=>{
    res.render('error',{
        title:'Error',
        message:'Page not found',
        name:'Bilal Munir',
    })
})

app.listen(port,()=>{
    console.log('Server is up on port '+port)
})