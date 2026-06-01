import express from 'express';
import { index, modify, store, update, destroy, show } from '../controllers/postsController.js';
import findPostById from '../middlewares/findPostById.js';
import validatePostBody from '../middlewares/validatePostBody.js';
const router = express.Router();


router.get('/', index);

router.get('/:id', findPostById, show);

router.post('/', validatePostBody, store);

router.put('/:id', findPostById, validatePostBody, update);

router.patch('/:id', findPostById, modify);

router.delete('/:id', findPostById, destroy);


export default router;