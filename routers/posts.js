import express from 'express';
import { index, modify, store, update, destroy, show } from '../controllers/postsController.js';

const router = express.Router();


router.get('/', index);

router.get('/:id', show)

router.post('/', store);

router.put('/:id', update);

router.patch('/:id', modify);

router.delete('/:id', destroy);


export default router;