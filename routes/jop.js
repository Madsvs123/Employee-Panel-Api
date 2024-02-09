import express from 'express'
import {getAllJops, getJop, addJop, editJop, deleteJop} from '../controllers/jop.js'

const route = express.Router()

route.get('/', getAllJops)
route.get('/:id', getJop)
route.post('/', addJop)
route.patch('/:id', editJop)
route.delete('/:id', deleteJop)

export default route

