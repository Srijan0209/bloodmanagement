import express from 'express';
import testcontroller from '../controllers/testcontroller.js'; // Import the controller correctly

const router = express.Router();

// Define the route and controller
router.get('/', testcontroller);

export default router; // Export only the router, not an object

