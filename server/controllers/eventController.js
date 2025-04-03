const pool = require('../db.js');

const getEvents = async (req, res) => {
    const { studentId } = req.query;
    try {
        if (studentId) {
            const query = 'SELECT event_id FROM event_parti WHERE student_id = $1';
            const events = await pool.query(query, [studentId]);
            const query2 = 'SELECT * FROM event_details WHERE id = ANY($1)';
            const events2 = await pool.query(query2, [events.rows.map(event => event.event_id)]);
            return res.status(200).json(events2.rows);
        } else {
            const query = 'SELECT * FROM event_details';
            const events = await pool.query(query);
            return res.status(200).json(events.rows);
        }
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ message: "Error fetching events", error: error.message });
    }
};

const getEventById = async (req, res) => {
    const { id } = req.params;
    try {
        const query = 'SELECT * FROM event_details WHERE id = $1';
        const event = await pool.query(query, [id]);
        return res.status(200).json(event.rows[0]);
    } catch (error) {
        console.error('Error fetching event by id:', error);
        res.status(500).json({ message: "Error fetching event by id", error: error.message });
    }
};  

const registerEvent = async (req, res) => {
    const { studentId, eventId } = req.body;
    try {
        const query = 'INSERT INTO event_parti (student_id, event_id) VALUES ($1, $2)';
        await pool.query(query, [studentId, eventId]);
        return res.status(200).json({ message: "Event registered successfully" });
    } catch (error) {
        console.error('Error registering event:', error);
        res.status(500).json({ message: "Error registering event", error: error.message });
    }
}


const checkinEvent = async (req, res) => {
    const { studentId, eventId } = req.body;
    try {
        const query = 'UPDATE event_parti SET checkin_count = checkin_count + 1 WHERE student_id = $1 AND event_id = $2';
        await pool.query(query, [studentId, eventId]);
        return res.status(200).json({ message: "Event checked in successfully"});
    } catch (error) {
        console.error('Error checking in event:', error);
        res.status(500).json({ message: "Error checking in event", error: error.message });
    }
}

const getCheckinCount = async (req, res) => {
    const { studentId, eventId } = req.query;
    try {
        const query = 'SELECT checkin_count FROM event_parti WHERE student_id = $1 AND event_id = $2';
        const result = await pool.query(query, [studentId, eventId]);
        return res.status(200).json({ message: "Checkin count fetched successfully", checkinCount: result.rows[0].checkin_count });
    } catch (error) {
        console.error('Error getting checkin count:', error);
        res.status(500).json({ message: "Error getting checkin count", error: error.message });
    }
}

const checkoutEvent = async (req, res) => {
    const { studentId, eventId } = req.body;
    try {
        const query1 = `
            UPDATE event_parti 
            SET checkin_count = checkin_count + 1 
            WHERE student_id = $1 AND event_id = $2
        `;
        await pool.query(query1, [studentId, eventId]);

        const query2 = `SELECT semester_id FROM event WHERE event_id = $1`;
        const result = await pool.query(query2, [eventId]);
        const semesterId = result.rows[0].semester_id;

        const query3 = `
            UPDATE score 
            SET scores = jsonb_set(
                scores, 
                '{"event_score"}', 
                to_jsonb(COALESCE((scores->>'event_score')::int, 0) + 0.5),
                true
            ) 
            WHERE student_id = $1 AND semester_id = $2
        `;
        await pool.query(query3, [studentId, semesterId]);

        return res.status(200).json({ message: "Event checked out successfully" });
    } catch (error) {
        console.error('Error checking out event:', error);
        res.status(500).json({ message: "Error checking out event", error: error.message });
    }
};

module.exports = {
    getEvents,
    getEventById,
    registerEvent,
    checkinEvent,
    getCheckinCount,
    checkoutEvent,
};

