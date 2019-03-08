const express = require("express");
const router = express.Router();
var mongoose = require('mongoose');

// Load Application model
const User = require("../../models/User");

// Private get all user's applications by user id
router.get(`/all/:userID`, async (req, res, next) => {
    try {
        const { userID } = req.params
        const user = await User.findOne({ "_id": userID })
        console.log(user.applications)
        if (user.applications) {
                res.status(200)
                return res.send({applications: user.applications, message: `success`})
            }
    } catch(err) {
        console.log(err)
        res.status(500)
        res.send(`Failed to get all applications`)
        return next(err)
    }
})

// Private create new user's application by user id and return application
router.post(`/new/`, async (req, res, next) => {
    try {
        const applicationID = mongoose.Types.ObjectId();
        const { userID } = req.body
        const newApplication = {
            _id: applicationID,
            companyName: req.body.companyName,
            dateApplied: req.body.dateApplied,
            lastUpdate: req.body.lastUpdate,
            currentApplicationStatus: req.body.currentApplicationStatus
        }
        const updatedApplications = await User.updateOne({ "_id": userID }, { $push: { applications: newApplication } })
        res.status(200)
        return res.send({applications: updatedApplications, message: 'success'})
    } catch (err) {
        console.log(err)
        res.status(500)
        res.send(`Failed to add c`)
        return next(err)
    }
})

// Private delete user's application by user id
router.delete('/delete/:userID/:applicationID', async (req, res, next) => {
    try {
        const {userID, applicationID} = req.params
        await User.updateOne({ "_id": userID }, { $pull: { applications: { _id: applicationID } } })
        return res.send({ message: 'success', removedID: applicationID })
    } catch (err) {
        console.log(err)
        res.status(500)
        res.send(`Failed to delete application`)
        return next(err)
    }
})

// Private update user's application by ids
router.put('/update/:userID/:applicationID', async (req, res, next) => {
    try {
        const {userID, applicationID} = req.params
        const newApplication = req.body
        await User.updateOne( { "_id": userID }, { $pull: { applications: { _id: applicationID } } })
        await User.updateOne({ "_id": userID }, { $push: { applications: newApplication } })
    } catch(err) {
        console.log(err)
        res.status(500)
        res.send(`Failed to delete application`)
        return next(err)
    }
})
// router.delete('/single/:id', async (req, res, next) => {
//     try {
//         const id = req.params.id
//         const result = await UserApplications.deleteOne({ "_id": id })
//         // console.log(JSON.stringify(result, null, 2))
//         // console.log(result.deletedCount)

//         if (result.deletedCount !== 0) {
//             res.status(200)
//             // console.log(`Removed from db ${id}`)
//             return res.send({ id: id, message: `Removed from db ${id}` })
//         } else {
//             res.status(500)
//             // console.log(`For some reason didn't remove from db ${id}`)
//             return res.send(`Couldn't remove this object from db - ${id}`)
//         }

//     } catch (err) {
//         console.log(err)
//         res.status(500)
//         res.send(`Failed to delete the application`)
//         return next(err)
//     }
// })

router.get('/single/:id', async (req, res, next) => {
    try {
        const id = await req.params.id
        const application = await UserApplications.find({ "_id": id })
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

module.exports = router;