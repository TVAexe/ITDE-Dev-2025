const express = require('express');
const router = express.Router();
const multer = require('multer');
const XLSX = require('xlsx');
const upload = multer({ storage: multer.memoryStorage() });
const pool = require('../db.js');

const { login, signup, getStudents } = require('../controllers/authController');
const { getEvents, getEventById, registerEvent, checkinEvent, getCheckinCount, checkoutEvent } = require('../controllers/eventController');
const { getScoreByStudent, getSemesterByStudentId, getTrainingPointsForm, submitTrainingPoints, getAllSemesters } = require('../controllers/trainingPointController');

router.post('/signup', signup);
router.post('/api/auth/login', login);

router.get('/api/events', getEvents);
router.get('/api/events/:id', getEventById);
router.get('/api/checkincnt', getCheckinCount);
router.get('/api/training-points', getScoreByStudent);
router.get('/api/semester/:studentId', getSemesterByStudentId);
router.post('/api/events/register', registerEvent);
router.put('/api/events/checkin', checkinEvent);
router.put('/api/events/checkout', checkoutEvent);
router.get('/api/training-points/form', getTrainingPointsForm);
router.post('/api/training-points/submit', submitTrainingPoints);
router.get('/api/semester', getAllSemesters);
router.get('/api/students', getStudents);

router.post('/api/semester/upload', upload.single('file'), async (req, res) => {
    const { semesterId } = req.body;
    try {
        const file = req.file;
        if (!file) {
          return res.status(400).json({ error: 'No file uploaded' });
        }
    
        const workbook = XLSX.read(file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        console.log(jsonData);
        const query = 'UPDATE semester SET status = 2 WHERE id = $1';
        await pool.query(query, [semesterId]);
        res.json({ message: 'Semester uploaded successfully' });
      } catch (error) {
        console.error('Error processing file:', error);
        res.status(500).json({ error: 'Error processing file' });
      }
});

router.post('/api/research/upload', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    res.json({ data: jsonData });
  } catch (error) {
    console.error('Error processing file:', error);
    res.status(500).json({ error: 'Error processing file' });
  }
});



module.exports = router;
