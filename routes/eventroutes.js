
import express from 'express';

import { createEvent } from '../controllers/eventopera.js';
import { gettheevent } from '../controllers/eventopera.js';
import { gettheeventbyid } from '../controllers/eventopera.js';
import { updateevent } from '../controllers/eventopera.js';
import { deleteevent } from '../controllers/eventopera.js';

// import auth from '../middleware/authmid'; // Uncomment and convert if you're using it
import authentication from '../middleware/loginmid.js';
import roleauth from '../middleware/roleauth.js';


const router=express.Router();

router.post('/',authentication,roleauth(['admin']),createEvent);
router.get('/',authentication,gettheevent);
router.get('/:id',authentication,gettheeventbyid);
router.put('/:id',authentication,roleauth(['admin']),updateevent);
router.delete('/:id',authentication,roleauth(['admin']),deleteevent);
//module.exports=router;
export default router;