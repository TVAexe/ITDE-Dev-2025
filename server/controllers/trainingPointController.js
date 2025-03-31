const pool = require('../db.js');

const getScoreByStudent = async (req, res) => {
    const {studentId, semesterId} = req.query;
    try {
        const query = 'SELECT * FROM score WHERE student_id = $1 AND semester_id = $2';
        const events = await pool.query(query, [studentId, semesterId]);

        res.status(200).json(events.rows);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ message: "Error fetching events", error: error.message });
    }
};

const getSemesterByStudentId = async (req, res) => {
    const {studentId} = req.query;
    try {
        const query = 'SELECT semester_id FROM score WHERE student_id = $1';
        const semester = await pool.query(query, [studentId]);
        res.status(200).json(semester.rows);
    } catch (error) {
        console.error('Error fetching semester:', error);
        res.status(500).json({ message: "Error fetching semester", error: error.message });
    }
}

module.exports = {
    getScoreByStudent,
    getSemesterByStudentId
};

