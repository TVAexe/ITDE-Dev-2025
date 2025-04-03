const pool = require('../db.js');

const getAllSemesters = async (req, res) => {
    try {
        const query = 'SELECT * FROM semester';
        const semesters = await pool.query(query);
        res.status(200).json(semesters.rows);
    } catch (error) {
        console.error('Error fetching semesters:', error);
        res.status(500).json({ message: "Error fetching semesters", error: error.message });
    }
}

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
    const {studentId} = req.params;
    console.log(studentId);
    try {
        const query = 'SELECT semester_id FROM score WHERE student_id = $1';
        const semester = await pool.query(query, [studentId]);
        const query2 = 'SELECT id, name FROM semester WHERE id = ANY($1)';
        const semester2 = await pool.query(query2, [semester.rows.map(row => row.semester_id)]);
        res.status(200).json(semester2.rows);
    } catch (error) {
        console.error('Error fetching semester:', error);
        res.status(500).json({ message: "Error fetching semester", error: error.message });
    }
}

const getTrainingPointsForm = async (req, res) => {
    try {
        const query = 'SELECT * FROM form';
        const form = await pool.query(query);
        console.log(form.rows);
        res.status(200).json(form.rows);
    } catch (error) {
        console.error('Error fetching training points form:', error);
        res.status(500).json({ message: "Error fetching training points form", error: error.message });
    }
}

const submitTrainingPoints = async (req, res) => {
    const { studentId, semesterId, score } = req.body;
    console.log(studentId, semesterId, score);
    try {
        const query = `UPDATE score SET 
        scores = jsonb_set(
            scores,
            '{"self_score"}',
            to_jsonb($1::int),
            true
        )
        WHERE student_id = $2 AND semester_id = $3`;
        await pool.query(query, [score, studentId, semesterId]);
        res.status(200).json({ message: "Training points submitted successfully" });
    } catch (error) {
        console.error('Error submitting training points:', error);
        res.status(500).json({ message: "Error submitting training points", error: error.message });
    }
}


module.exports = {
    getAllSemesters,
    getScoreByStudent,
    getSemesterByStudentId,
    getTrainingPointsForm,
    submitTrainingPoints
};

