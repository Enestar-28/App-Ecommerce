const app = require('./app')
require('dotenv').config()

const PORT = process.env.PORT || 3333
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


process.on('SIGINT', () => {
    console.log('Bye bye!')
    process.exit()
})