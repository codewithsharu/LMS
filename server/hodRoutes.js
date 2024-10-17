
const express = require('express');
const router = express.Router();
const Applied = require('./models/Applied');
// GET route to fetch applications assigned to HOD
router.get('/hod-applications', async (req, res) => {
    try {
      const applications = await Applied.find({ assignedTo: 'HOD' });
      res.status(200).json(applications);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching hh applications', error: err });
    }
  });

module.exports = router;
