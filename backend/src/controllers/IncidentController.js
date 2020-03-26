const conn = require('../database/conn')

module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query

    const [count] = await conn('incidents').count() // Destructuring
    
    const incidents = await conn('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id') // Utiliza-se o Join na tabela ongs
      .limit(5) // Quantidade de linhas por página
      .offset((page - 1) * 5) // Seleciona o índece do array para a paginação
      .select([ // Busca todos os incidentes, junto com o join da table ongs  
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf'
      ])
    
    res.header('X-Total-Count', count['count(*)']) // Envia count pelo header da response
    
    return res.json(incidents)
  },

  async store(req, res) {
    const { title, description, value } = req.body
    const ong_id = req.headers.authorization

   const [id] = await conn('incidents').insert({
      title,
      description,
      value,
      ong_id
    })

    return res.status(201).json({ id })
  },

  async destroy(req, res) {
    const { id } = req.params
    const ong_id = req.headers.authorization

    const incidents = await conn('incidents')
      .where('id', id)
      .select('ong_id')
      .first()

    if (incidents.ong_id !== ong_id) {
      return res.status(401).json('Operation not permitted.')
    }

    await conn('incidents').where('id', id).delete()

    return res.status(204).send()
  }
}