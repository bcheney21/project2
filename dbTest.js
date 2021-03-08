const db = require('./models');

// db.favorite.create({
//     name: 'the daily grind'
//   }).then(rest => {
//     console.log('Created: ', rest.name)
//   })

// db.favorite.findOne({
//   where: {
//     name: 'the daily grind'
//   }
// }).then(rest => {
//   console.log('Found: ', rest.name)
// })

// db.user.create({
//   username: 'brinnc@uw.edu',
//   password: "1234"
//   zipcode: 93103
// }).then(rest => {
//   console.log('Created: ', rest.username)
// })

const findUserTest = async () => {
    const foundUser = await db.user.findOne({
        where: {
            username: 'brinnc@uw.edu'
        }
    })
    console.log('found', foundUser.username)
}
findUserTest();
// db.user.findOne({
// where: {
//   username: 'brinnc@uw.edu'
// }
// }).then(rest => {
// console.log('Found: ', rest.username)
// })