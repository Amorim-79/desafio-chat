const Messages = require('../models/Messages')

module.exports = {
    async indexName(req, res) {
        const { name } = req.query

        const messages = await Messages.find({
            name: {
                $in: name
            }
        })

        return res.json(messages)
    },

    async indexDate(req, res) {
        const { date } = req.query
        const arrayDate = date.split("-", 3)
        const day = arrayDate[2]
        const month = arrayDate[1]
        const year = arrayDate[0]


        const messages = await Messages.find({
            date: {
                $gte: `${year}-${month}-${day}T00:00:00.000Z`, $lt: `${year}-${month}-${day}T23:59:59.999Z`
            }
        })

        return res.json(messages)
    },

    async indexSort(req, res) {
        const { toggle } = req.query

        const messages = await Messages.find().sort({date : toggle})

        return res.json(messages)
    }
}