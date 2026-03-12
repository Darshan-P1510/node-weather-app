const express= require('express')
const path=require('path')
const hbs=require('hbs')
const { title } = require('process')
const { error } = require('console')
const app= express()
const publicdir=path.join(__dirname,'../public')
const partialpath=path.join(__dirname,'../views/partials')
const temppath=path.join(__dirname,'../views/temps')
const port=process.env.PORT || 3000
const{ geocode, weather }=require('./util')
//define path for express config
app.set('views', temppath);

//Setup hbs engine and views location
app.set('view engine','hbs')
hbs.registerPartials(partialpath)

//setup static directory to serve
app.use(express.static(publicdir))
app.get('',(req,res)=>{
    res.render('index',{
        title:'weather app',
        name:'kranh'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'jugaadu',
        age:12})
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about the page info'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({error:'No address found'})
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send(error)
        }
        weather(latitude,longitude,(error,forecasteData)=>{
            if(error){
                return res.send(error)
            }
             res.send({
                forecaste:forecasteData,
                location:location,
                address:req.query.address
             })   })
    })
    // res.send([{
    //     Location:'Bengaluru',
    //     Forecast:"cloudy"},
    //     {
    //         Location:"Bidar",
    //         Forecast:'Sunny'
    //     }]
    //     )
})

app.get(/help\/.+/, (req, res) => {
  res.render('article',{
    title:'Help Article Not Found'
  })
})
 app.get('/product',(req,res)=>{
    if(!req.query.price){
        return res.send(
        {
            error:"No item found"
        }
        )
    }
    res.send({
        title:'MRF BATS',
        Price:'1899',
        Query:req.query.Price
    })
 })
app.use((req,res)=>{
    res.status(404).render('404',{title:'404 NOT FOUND'})
})
app.listen(port,()=>{
    console.log("you are server is running on port ",+port)
})