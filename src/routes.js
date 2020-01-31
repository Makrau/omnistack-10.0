import express from 'express';
import { checkDevExists, checkRequestBody } from './middlewares/Dev.js';
import devController from './controllers/DevController.js';

const router = express.Router();

router.get('/devs', devController.index);
router.post('/devs', checkRequestBody, checkDevExists, devController.create);

export default router;
