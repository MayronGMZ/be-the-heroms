const crypto = require('crypto')

const conn = require('../database/conn')

module.exports = {
  async index(req, res) {
    const ongs = await conn('ongs').select('*')
  
    return res.json(ongs)
  },

  async store(req, res) {
    const { name, email, whatsapp, city, uf } = req.body

  // const data = req.body

  const id = crypto.randomBytes(4).toString('HEX')

  await conn('ongs').insert({
    id,
    name,
    email,
    whatsapp,
    city,
    uf,
  })
  // console.log(data)
  return res.status(201).json({ id })
  }
}