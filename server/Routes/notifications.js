const Router = require('express');
const { Memory } = require('../models/Memory');
const { Notifications } = require('../models/Notifications');
const NotificationsRouter = Router();

//Update User
NotificationsRouter.post('/addnotifications', async (req, res) => {
  try {
    let { profileId, loggedInId } = req.body;
    console.log(req.body)
    let createNotifications = new Notifications({
      memoryCreatorNotification: profileId,
      logedInUser: loggedInId,
    });
    let res = await createNotifications.save();
    res.send(res);
  } catch (error) {
    res.send(error);
  }
});

NotificationsRouter.get('/getallNotifications', (req, res) => {
  Notifications.find({})
    .populate('memoryCreatorNotification')
    .populate('logedInUser') // key to populate
    .then((resonse) => {
      if (!resonse) {
        return res.status(404).json({
          message: 'data not found',
        });
      }
      res.json(resonse);
    });
});

module.exports = { NotificationsRouter };
