const { Router } = require('express')

const MessagesController = require('./controllers/MessagesController')
const FilterController = require('./controllers/FilterController')
const ParticipantesController = require('./controllers/ParticipantesController')

const routes = Router()

routes.get('/messages', MessagesController.index)
routes.post('/messages', MessagesController.create)

routes.delete('/messages/:id', MessagesController.delete)

routes.get('/messages/name', FilterController.indexName)

routes.get('/messages/date', FilterController.indexDate)

routes.get('/messages/sort', FilterController.indexSort)

routes.post('/participantes', ParticipantesController.create)
routes.get('/participantes', ParticipantesController.index)


module.exports = routes