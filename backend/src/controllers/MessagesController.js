const Messages = require('../models/Messages')

module.exports = {
    async index(req, res) {
        const messages = await Messages.find()

        return res.json(messages)
    },

    async create(req, res) {
        const { name, message } = req.body

        const newMessage = await Messages.create({
            name,
            message,
        })

        res.json(newMessage)
    },

    async delete(req, res) {
        const { id } = req.params

        const message = await Messages.findOneAndDelete({
            _id: id
        })

        return res.status(204).send()
    }
}