import express from 'express';
import { index, modify, store, update, destroy, show } from '../controllers/postsController.js';
import findPostById from '../middlewares/findPostById.js';

const router = express.Router();


router.get('/', index);

router.get('/:id', findPostById, show);

router.post('/', store);

router.put('/:id', findPostById, update);

router.patch('/:id', findPostById, modify);

router.delete('/:id', findPostById, destroy);


export default router;