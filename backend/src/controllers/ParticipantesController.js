const Participantes = require('../models/Participantes')

module.exports = {
    async create(req, res) {
        const { name } = req.body

        await Participantes.create({
            name
        })

        return res.end()
    },

    async index (req, res) {
        const participantes = await Participantes.find()


        return res.json(participantes)
    }
}