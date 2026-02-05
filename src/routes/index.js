const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const backpack = JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/js/backpack.json'), 'utf-8'));
const notes = JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/js/notes.json'), 'utf-8'));

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

router.get('/main', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/main.html'));
});

router.get('/backpack', (req, res) => {
    res.json(backpack);
});

router.get('/notes', (req, res) => {
    res.json(notes);
});

module.exports = router;