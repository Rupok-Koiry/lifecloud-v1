const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');
const { MemoryRouter } = require('./Routes/memory');
const { UserRouter } = require('./Routes/users');
const { AuthRouter } = require('./Routes/auth');
const { PostRouter } = require('./Routes/posts');
const { NotificationsRouter } = require('./Routes/notifications');
const { ProfileRouter, uploadpic } = require('./Routes/profile');
var cors = require('cors');
dotenv.config();
mongoose.connect(process.env.MONGO_URL, (err, data) => {
  console.log('mongodb  connected');
});
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
    limit: '5mb',
  })
);

app.use(bodyParser.json());
const { User } = require('./models/User');
app.all('/insertOrUpdate', async (req, res) => {
  const { email, firstName, lastName, user_type } = req.body;
  console.log(req.body);
  const query = { email: email };
  const update = {
    $set: { email, firstName, lastName, user_type: user_type || 'normal' },
  };
  const options = { upsert: true };

  await User.updateOne(query, update, options);
  const user = await User.findOne({ email: email });
  res.json(user);
});
app.use('/api/users', UserRouter);
app.use('/api/memory', MemoryRouter);
app.use('/api/notification', NotificationsRouter);
app.use('/api/auth', AuthRouter);
app.use('/api/posts', PostRouter);
app.use('/api/profile', ProfileRouter);
app.use(express.static('./server'));
app.use(express.static(path.join(__dirname, 'client/build')));
//Error handling middleware
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: 'Something went wrong' });
});
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
