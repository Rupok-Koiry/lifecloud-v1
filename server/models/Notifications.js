const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema(
  {
    memoryCreatorNotification: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }],
    logedInUser: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
  }
);

const Notifications = mongoose.model('Notification', NotificationSchema);

module.exports = { Notifications };
