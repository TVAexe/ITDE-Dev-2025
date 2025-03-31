const express = require('express');
const router = express.Router();
const multer = require('multer');

const { login, signup  } = require('../controllers/authController');
const { getEvents, getEventById, registerEvent, checkinEvent, getCheckinCount } = require('../controllers/eventController');
const { getScoreByStudent, getSemesterByStudentId } = require('../controllers/trainingPointController');

router.post('/signup', signup);
router.post('/api/auth/login', login);

router.get('/api/events', getEvents);
router.get('/api/events/:id', getEventById);
router.get('/api/checkincnt', getCheckinCount);
router.get('/api/training-points', getScoreByStudent);
router.get('/api/semester', getSemesterByStudentId);
router.post('/api/events/register', registerEvent);
router.put('/api/events/checkin', checkinEvent);

module.exports = router;
