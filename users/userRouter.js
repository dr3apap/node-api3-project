const usersDB = require("./userDb");
const express = require("express");
const postDB = require("../posts/postDb");
const validation = require("./validation /validation");

const router = express.Router();

router.post("/", validateUser, (req, res) => {
  // do your magic!

  usersDB
    .insert(req.body)
    .then(user => {
      res.status(201).json(user);
      const newUser = userDB.save();
    })
    .catch(err => {
      console.log("The post body", err);
      res.status(500).json({
        message: "There was an error saving the user to the database",
      });
    });
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  // do your magic!
  console.log(req.body);
  Posts.insert(req.body)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      res.status(500).json({
        message: "There was an error saving the post to the database",
        message: err.message,
      });
    });
});

router.get("/", (req, res) => {
  // do your magic!

  usersDB
    .get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "error, the users information could not be retrieved",
        error: err,
      });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  // do your magic
  userDB
    .getById(req.params.id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "error, the user info could not be retrieved",
        error: err,
      });
    });
});

router.get("/:id/posts", validateUserId, (req, res) => {
  userDB
    .getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      console.log("user posts get error", err);
      res.status(500).json({
        message: "error, we were unable to retrieve posts for this user",
        error: err,
      });
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  //do your magic
  userDB
    .remove(req.params.id)
    .then(num => {
      res.status(200).json(req.user);
    })
    .catch(err => {
      console.log("delete delete", err);
      res.status(500).json({
        message: "error, the user was not removed from the database",
        error: err,
      });
    });
});

router.put("/:id", validateUserId, validateUser, (req, res) => {
  // do your magic
  userDB
    .update(req.params.id, req.body)
    .then(num => {
      res.status(200).json(req.body);
    })
    .catch(err => {
      console.log("update user", err);
      res.status(500).json({
        message: "error, changes to the user were not saved to database",
        error: err,
      });
    });
});

function validateUserId(req, res, next) {
  // do your magic
  const { error } = validation(req.body, schema);
  usersDB
    .get()
    .then(users => {
      if (error) {
        return res.status(400).send(error.details[0].message);
      } else {
        req.user = users.filter(user => user.id === parseInt(req.params.id))[0];
      }
      next();
    })

    .catch(err => res.send(err.message));
}

function validateUser(req, res, next) {
  // do your magic!
  newUser = req.body;
  const { error } = Joi.validation(newUser, schema);

  if (!newUser && error) {
    res.status(400).json({ message: "missing user data" });
    res.status(400).res.send(error.details[0].message);

    next();
  }
}

function validatePost(req, res, next) {
  // do your magic!
  const { error } = Joi.validate(req.body, schema);
  if (!req.body && error) {
    res.status(400).json({ message: "missing post data" });

    res.status(400).res.send(error.details[0].message);
  }
  next();
}

module.exports = router;
