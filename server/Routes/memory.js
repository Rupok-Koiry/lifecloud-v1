const Router = require('express');
const { Memory } = require('./../models/Memory');
const MemoryRouter = Router();
const multer = require('multer');
var storage = multer.diskStorage({
  destination: './server/picUploader/',
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
let uploadpic = multer({ storage: storage });
// create profile
MemoryRouter.post(
  '/createMemory',
  uploadpic.fields([{ name: 'memoryImges', maxCount: 1 }]),
  async (req, res) => {
    try {
      //gen new password
      const url = req.protocol + '://' + req.get('host');
      console.log(req.body, 'body');
      console.log(req.files, 'file');
      // let multiFiles = req.files.memoryImges.map(res => {
      //     return res.path.slice(7)
      // })
      // console.log(multiFiles, 'multiFiles')
      let newUser = new Memory({
        originalUser: req.body.originalUser,
        file: req.files.memoryImges[0].path.slice(7),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        likes: [],
        comments: [],
      });

      //save and response
      newUser.save().then((resp) => {
        res.send(resp);
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

MemoryRouter.put('/like/:id', async (req, res) => {
  try {
    console.log(req.params.id, req.body.userId);
    const memory = await Memory.findById(req.params.id);
    if (!memory.likes.includes(req.body.userId)) {
      await memory.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json('The post has been liked');
    } else {
      await memory.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json('The post has been disliked');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

MemoryRouter.put('/comment/:id', async (req, res) => {
  try {
    console.log(req.params.id, req.body);
    const memory = await Memory.findById(req.params.id);
    await memory.updateOne(
      {
        $push: {
          comments: {
            $each: [
              {
                text: req.body.comments[0].text,
                id: Math.ceil(Math.random() * 1000),
                date: Date.now(),
              },
            ],
            $position: -1,
          },
        },
      },
      {
        upsert: true, //to return updated document
      }
    );
    res.status(200).json('Coment Added');
  } catch (err) {
    res.status(500).json(err);
  }
});

MemoryRouter.delete('/commentdell/:id', async (req, res) => {
  try {
    console.log(req.params.id, req.body);
    // const memory = await Memory.findById(req.params.id);
    // console.log(memory, 'memory')
    await Memory.updateOne(
      { _id: req.params.id },
      { $pull: { comments: req.body.comment } }
    );
    res.status(200).json('Comment Deleted');
  } catch (err) {
    res.status(500).json(err);
  }
});

MemoryRouter.delete('/commentdellOBJ/:id', async (req, res) => {
  try {
    console.log(req.params.id, req.body);
    // const memory = await Memory.findById(req.params.id);
    // console.log(memory, 'memory')
    await Memory.deleteOne({ _id: req.params.id });
    res.status(200).json('Comment Deleted');
  } catch (err) {
    res.status(500).json(err);
  }
});

MemoryRouter.get('/getallmemory/:id', (req, res) => {
  Memory.find({ originalUser: req.params.id }) // key to populate
    .then((resonse) => {
      if (!resonse) {
        return res.status(404).json({
          message: 'data not found',
        });
      }
      res.json(resonse);
    });
});

module.exports = { MemoryRouter };
