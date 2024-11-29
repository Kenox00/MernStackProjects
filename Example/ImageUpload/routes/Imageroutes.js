const { Router } = require('express');
const router = Router(); 
const Imageroutes = require('../model/models') 
const Authorization = require('../middleware/authMiddleware')

// Get all Imageroutess
router.get('/', async(req, res) => {
    try {
        // const Imageroutess = await Imageroutes.find()
        // res.send(Imageroutess)
        res.send("hello")
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// Create a new Imageroutes
router.post('/', Authorization, async(req, res) => {
    try {
        let Imageroutes = new Imageroutes({
            key:value
        })
        Imageroutes = await Imageroutes.save()
        res.send(Imageroutes)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// Get Imageroutes By ID
router.get('/:id', Authorization, async(req, res) => {
    try {
        const Imageroutes = await Imageroutes.findById(req.params.id)
        res.send(Imageroutes)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// Update Imageroutes By ID
router.put('/:id', Authorization, async(req, res) => {
    try {
        const Imageroutes = await Imageroutes.findByIdAndUpdate(req.params.id, {
            key:value
        },{new: true})
        res.send(Imageroutes)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// Delete Imageroutes By ID
router.delete('/:id', Authorization, async(req, res) => {
    try {
        const Imageroutes = await Imageroutes.findByIdAndDelete(req.params.id)
        res.send(Imageroutes)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = router