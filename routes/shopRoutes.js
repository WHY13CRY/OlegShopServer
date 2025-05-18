const express = require ('express')
const router = express.Router() 
require('dotenv').config()
const {Pool} = require('pg')

const pool = new Pool ({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
  }
})

router.get('', async (req,res)=>{
  const result = await pool.query('SELECT * FROM tovary')
  res.json(result.rows)
})

module.exports = router