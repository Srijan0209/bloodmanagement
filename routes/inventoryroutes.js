import express from 'express' 
import authmiddleware from '../middlewares/authmiddlewares.js'
const router =express.Router()
router.post('/create-inventory',authmiddleware,createInventoryController)