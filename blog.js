const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 5050;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }))

var posts = [];

app.get('/', function(req, res) {
    res.render('pages/index', {
        posts : posts
    });
  });

  app.get('/post', function(req, res) {
    res.render('pages/post', {
        posts : posts
    });
  });


app.post('/post', (req, res) => {
    const { author, title, body } = req.body;
    posts.push({
        id: posts.length + 1,
        author, 
        title, 
        body, 
        date: new Date()
    });
        res.redirect('/');
    });


app.post("/delete/:id", (req, res) => {
    const postId = req.params.id;
    posts = posts.filter(post => post.id !== parseInt(postId));
    res.redirect('/');
})

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});