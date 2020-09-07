const mongoose = require ('mongoose');
const Celebrity = require ('../models/Celebrities');

mongoose.connect('mongodb://localhost/celebrity', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const celebrity = [
  {
    name: 'Julio Iglesias',
    occupation: 'Singer',
    catchPhrase: "You don't find me too bald, do you? Old, and bald, and with a belly?"
  },
  {
    name: 'Tamara Falco',
    occupation: 'Family Famous',
    catchPhrase: "No me iría a cenar con Pablo Iglesias, pero rezo por él y por todos los de Podemos"
  },
  {
    name: 'Joey Tribbiani',
    occupation: 'Friend´s charachter',
    catchPhrase: 'How you doing?'
  }
];

Celebrity.insertMany(celebrity)
  .then(data => {
    console.log(`Success! Added ${data.length} celebrities to the database`);
    mongoose.connection.close();
  })
  .catch(err => {
    console.log(err);
  });