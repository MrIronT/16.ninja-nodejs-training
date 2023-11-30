const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes') 


// express app
const app = express();

//connect to MongoDB
const dbURI = 'mongodb+srv://eugenetiron:VeryUnusual1@cluster.yti9k0b.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI)
.then((result) => app.listen(8800))
.catch((err)=>console.log(err))


// listen for requests


// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended:true }));
app.use(morgan('dev'));


app.use((req, res, next) => {
  console.log('new request made:');
  console.log('host: ', req.hostname);
  console.log('path: ', req.path);
  console.log('method: ', req.method);
  next();
});

app.use((req, res, next) => {
  console.log('in the next middleware');
  next();
});



app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// mongoose and mongo db sandbox routes


// routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});
//blog routes
app.use('/blogs',blogRoutes);
// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
