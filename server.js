const express = require ('express')
const cors = require ('cors')
const shopRoutes = require('./routes/shopRoutes') 
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/', shopRoutes)

const PORT = process.env.PORT || 5001
app.listen(PORT,()=>{
  console.log(`Server started on http://localhost:${PORT}`)
})