const db = require('./models');

db.favorite.create({
    name: 'lighthouse coffee'
  }).then(rest => {
    console.log('Created: ', rest.name)
  })

db.favorite.findOne({
  where: {
    name: 'lighthouse coffee'
  }
}).then(rest => {
  console.log('Found: ', rest.name)
})