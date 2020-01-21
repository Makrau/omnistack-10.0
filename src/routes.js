import express from 'express';
import devController from './controllers/DevController.js';

const router = express.Router();

router.get('/devs', devController.index);
router.post('/devs', devController.create);

export default router;
