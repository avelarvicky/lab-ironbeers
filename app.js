const express = require('express');
const hbs = require('hbs');

const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(__dirname + '/views/partials');

// home
app.get('/', (req, res) => {
  res.render('index');
});

// beers
app.get('/beers', (req, res) => {
  punkAPI.getBeers({'abv_gt': 5}) 
  .then(beersFromApi => {/*console.log('Beers from the database: ', beersFromApi)*/
  res.render('beers', {beersFromApi});
  })
  .catch(error => console.log(error));
});

// random beer
app.get('/random-beer', (req, res) => {
  punkAPI.getRandom() 
  .then(responseFromApi => {console.log('Beers from the database: ', responseFromApi)
  res.render('random-beer', {responseFromApi});
  })
  .catch(error => console.log(error));
});

app.get('/beer/:id', (req, res) => {
  const {id} = req.params
  punkAPI.getBeer(id).then(responseFromApi => {
  res.render('random-beer', {responseFromApi});
  })
  .catch(error => console.log(error));
});





app.listen(3000, () => console.log('🏃‍ on port 3000'));
