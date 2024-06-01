const express = require('express');
const cors = require('cors');
const connection = require('./database/koneksi');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Buat Notes Baru
app.post('/notes', (req, res) => {
    const { title, datetime, note } = req.body;
    const query = 'INSERT INTO notes (title, datetime, note) VALUES (?, ?, ?)';
    connection.query(query, [title, datetime, note], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, title, datetime, note });
    });
});

// Ambek Semua Notes
app.get('/notes', (req, res) => {
    const query = 'SELECT * FROM notes';
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
});

// Ambek Notes By ID
app.get('/notes/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM notes WHERE id = ?';
    connection.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Gak Ketemu Cuy' });
        }
        res.status(200).json(results[0]);
    });
});

// Apdet Notes By ID
app.put('/notes/:id', (req, res) => {
    const { id } = req.params;
    const { title, datetime, note } = req.body;
    const query = 'UPDATE notes SET title = ?, datetime = ?, note = ? WHERE id = ?';
    connection.query(query, [title, datetime, note, id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Gak Ketemu Cuy' });
        }
        res.status(200).json({ message: 'Terupdate!' });
    });
});

// Hapus Notes By ID
app.delete('/notes/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM notes WHERE id = ?';
    connection.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Gak Ketemu Cuy' });
        }
        res.status(200).json({ message: 'Terhapus!' });
    });
});

const PORT = process.env.APP_PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}/notes`);
});
