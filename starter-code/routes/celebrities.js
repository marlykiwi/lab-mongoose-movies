const express = require('express');
const router = express.Router();

const Celebrity = require('../models/Celebrities');



router.get('/celebrities', (req, res, next) => {
  Celebrity.find()
  .then(celebritiesFromDB => {
    console.log(celebritiesFromDB);
    res.render('celebrities/index', {celebrityList: celebritiesFromDB});
  })
  .catch(error => {
    next(error);
  });
});

router.get('/celebrities/new', (req, res) => {
  res.render('celebrities/new');
});

router.get('/celebrities/:id/edit', (req, res, next) =>{
  // console.log('edited celebrity id:',req.params.id)
  const id = req.params.id;
  Celebrity.findById(id)
  .then(editCeleb => {
    res.render('celebrities/edit', {editCeleb});
  })
  .catch(error => {
    next(error);
  });
});

router.post('/celebrities/:id/edit', (req, res, next) => {
  const {name, occupation, catchPhrase} = req.body;
  const id = req.params.id;
  Celebrity.findByIdAndUpdate(id, {
    name: name,
    occupation: occupation,
    catchPhrase: catchPhrase
  })
  .then(editCeleb => {
    res.redirect('/celebrities/')
  })
  .catch(error => {
    next(error);
  });
})

router.post('/celebrities/:id/delete', (req, res, next) =>{
  const id = req.params.id;

  Celebrity.findByIdAndRemove(id)
  .then(deletedCelebrity => {
    console.log(`${deletedCelebrity.name} has been removed from the database.`);
    res.redirect(`/celebrities`);
  })
  .catch(error=>{
    next(error);
  });
});


router.get('/celebrities/:id', (req, res, next) => {
  const id = req.params.id;
  console.log('this is the id:', req.params.id);
  Celebrity.findById(id)
  .then(celebrityFromDB => {
    console.log(celebrityFromDB);
    res.render('celebrities/show', {celebrityList: celebrityFromDB });
  })
  .catch(error => {
    next(error);
  });
});


router.post('/celebrities', (req, res) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({
    name,
    occupation,
    catchPhrase
  }).then(celeb => {
    console.log(`New celebrity was created: ${celeb}`);
    // 
    res.redirect(`/celebrities/`);
  }).catch(error => {
    res.render('/celebrities/new')
    console.log(error);
  })
});


module.exports = router;