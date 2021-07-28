const {City} = require('../models/city');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) =>{
    const cityList = await City.find();

    if(!cityList) {
        res.status(500).json({success: false})
    } 
    res.status(200).send(cityList);
})

router.get('/:id', async(req,res)=>{
    const city = await City.findById(req.params.id);

    if(!city) {
        res.status(500).json({message: 'The city with the given ID was not found.'})
    } 
    res.status(200).send(city);
})



router.post('/', async (req,res)=>{
    let city = new City({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    })
    city = await city.save();

    if(!city)
    return res.status(400).send('the city cannot be created!')

    res.send(city);
})


router.put('/:id',async (req, res)=> {
    const city = await City.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            icon: req.body.icon || city.icon,
            color: req.body.color,
        },
        { new: true}
    )

    if(!city)
    return res.status(400).send('the city cannot be created!')

    res.send(city);
})

router.delete('/:id', (req, res)=>{
    City.findByIdAndRemove(req.params.id).then(city =>{
        if(city) {
            return res.status(200).json({success: true, message: 'the city is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "city not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})

module.exports =router;