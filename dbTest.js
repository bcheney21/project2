const db = require('./models');

db.favorite.create({
    name: 'the daily grind'
  }).then(rest => {
    console.log('Created: ', rest.name)
  })

db.favorite.findOne({
  where: {
    name: 'the daily grind'
  }
}).then(rest => {
  console.log('Found: ', rest.name)
})