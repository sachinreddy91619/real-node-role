
// import express from 'express';

// import { createEvent } from '../controllers/eventopera.js';
// import { gettheevent } from '../controllers/eventopera.js';
// import { gettheeventbyid } from '../controllers/eventopera.js';
// import { updateevent } from '../controllers/eventopera.js';
// import { loc } from '../controllers/eventopera.js';
// import { eventbook } from '../controllers/eventopera.js';
// import { deleteevent } from '../controllers/eventopera.js';


// // import auth from '../middleware/authmid'; // Uncomment and convert if you're using it
// import authentication from '../middleware/loginmid.js';
// import roleauth from '../middleware/roleauth.js';


// const router = express.Router();

// router.post('/', authentication, roleauth(['admin']), createEvent);
// router.get('/', authentication, gettheevent);
// router.get('/:id', authentication, gettheeventbyid);
// router.put('/:id', authentication, roleauth(['admin']), updateevent);
// router.delete('/:id', authentication, roleauth(['admin']), deleteevent);

// router.post('/location', loc);
// router.post('/eventit/:id', eventbook)
// //module.exports=router;
// export default router;

// Importing Express for creating a router to define API endpoints
import express from 'express';

// Importing controllers for handling various event-related operations
import { createEvent } from '../controllers/eventopera.js'; // Controller to handle event creation
import { gettheevent } from '../controllers/eventopera.js'; // Controller to fetch all events
import { gettheeventbyid } from '../controllers/eventopera.js'; // Controller to fetch an event by its ID
import { updateevent } from '../controllers/eventopera.js'; // Controller to update event details
import { loc } from '../controllers/eventopera.js'; // Controller to handle event location
import { eventbook } from '../controllers/eventopera.js'; // Controller to handle event booking
import { deleteevent } from '../controllers/eventopera.js'; // Controller to delete an event

// Importing middleware for authentication and role-based authorization
import authentication from '../middleware/loginmid.js'; // Middleware to verify user authentication
import roleauth from '../middleware/roleauth.js'; // Middleware to verify role-based permissions

// Creating an instance of the Express router
const router = express.Router();

// Route to create a new event
// Accessible only to authenticated users with the 'admin' role
router.post('/', authentication, roleauth(['admin']), createEvent);

// Route to fetch all events
// Accessible only to authenticated users
router.get('/', authentication, gettheevent);

// Route to fetch a specific event by its ID
// Accessible only to authenticated users
router.get('/:id', authentication, gettheeventbyid);

// Route to update event details by ID
// Accessible only to authenticated users with the 'admin' role
router.put('/:id', authentication, roleauth(['admin']), updateevent);

// Route to delete an event by ID
// Accessible only to authenticated users with the 'admin' role
router.delete('/:id', authentication, roleauth(['admin']), deleteevent);

// Route to handle event location-related operations
router.post('/location', loc);

// Route to handle event booking for a specific event ID
router.post('/eventit/:id', eventbook);

// Exporting the router for use in other parts of the application
export default router;
