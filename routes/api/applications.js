const express = require("express");
const router = express.Router();

// Load Application model
const Application = require("../../models/Application");

// @access Public
router.get('/all', (req, res, next) => {
    try {
        Application.find({}).then(applications => {
            if (applications) {
                res.status(200)
                return res.send(applications)
            }
        })
    } catch (err) {
        console.log(err)
        res.status(500)
        res.send(`Failed to get all applications`)
        return next(err)
    }
})

router.get('/single/:id', async (req, res, next) => {
    try {
        const id = await req.params.id
        const application = await Application.find({ "_id": id })
        if (application && application._id) {
            res.status(200)
            return res.send(application)
        } else {
            res.status(400)
            return res.send(`Couldn't fint this application`)
        }
    } catch (err) {
        console.log(err)
        res.status(500)
        res.send(`Failed to get application with id ${id}`)
        return next(err)
    }
})

router.delete('/single/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const result = await Application.deleteOne({ "_id": id })
        // console.log(JSON.stringify(result, null, 2))
        // console.log(result.deletedCount)

        if (result.deletedCount !== 0) {
            res.status(200)
            // console.log(`Removed from db ${id}`)
            return res.send({ id: id, message: `Removed from db ${id}` })
        } else {
            res.status(500)
            // console.log(`For some reason didn't remove from db ${id}`)
            return res.send(`Couldn't remove this object from db - ${id}`)
        }

    } catch (err) {
        console.log(err)
        res.status(500)
        res.send(`Failed to delete the application`)
        return next(err)
    }
})

router.post('/new', (req, res, next) => {
    const newApplication = new Application ({
        companyName: req.body.companyName,
        dateApplied: req.body.dateApplied,
        lastUpdate: req.body.lastUpdate,
        currentApplicationStatus: req.body.currentApplicationStatus
    })
    newApplication.save((err) => {
        if (err) {
          console.log(err)
          return next(err)
        }
        console.log(`new application created ${newApplication}`)
        res.status(200)
        return res.send(newApplication)
      })  
})

module.exports = router;