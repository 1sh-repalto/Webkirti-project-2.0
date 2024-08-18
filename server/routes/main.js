const express = require("express");
const router = express.Router();
const Post = require('../models/Post');


/*
 * GET /
 * HOME
*/
router.get("/", (req, res) => {
  const locals = {
    title: "Home Page",
    desc: "This is home page.",
  };
  res.render("index", { locals });
});

router.get("/about", (req, res) => {
  res.render("about");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/allBlogs", async (req, res) => {
  try {
    const data = await Post.find();
    res.render("allBlogs", { data });
  } catch (error) {
    console.log(error);
  }
});


// function insertPostData() {
//   Post.insertMany([
//     {
//       title: "Building a Blog",
//       body: "This is body text"
//     },
//     {
//       title: "title 2",
//       body: "This is body text"
//     },
//     {
//       title: "title 3",
//       body: "This is body text"
//     },
//     {
//       title: "title 4",
//       body: "This is body text"
//     },
//     {
//       title: "title 5",
//       body: "This is body text"
//     },
//     {
//       title: "title 6",
//       body: "This is body text"
//     }
//   ])
// }
//insertPostData();

/*
 * GET /
 * POST :id
*/
router.get('/post/:id', async (req, res) => {

  try {
  
    let slug = req.params.id;
  
    const data = await Post.findById({_id: slug});

    const locals = {
      title: data.title,
      desc: "description"
    }

    res.render('post', { locals, data});
  } catch (error) {
    console.log(error);
  }

});

/*
 * POST /
 * POST search term
*/
router.post('/search', async (req, res) => {

  try {
    const locals = {
      title: "search",
      desc: "description"
    }

    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "");
   
    const data = await Post.find({
      $or: [
        {title: {$regex: new RegExp(searchNoSpecialChar, 'i')}},
        {body: {$regex: new RegExp(searchNoSpecialChar, 'i')}}
      ]
    });

    res.render("search", {
      data,
      locals
    });
  } catch (error) {
    console.log(error);
  }

});

module.exports = router;
