const express = require('express');
const posting = express.Router();
const connection = require('../config/database');
const { body, validationResult } = require('express-validator');

// index
posting.get('/posting', function (req, res) {
  connection.query(
    'SELECT * FROM posting ORDER BY id desc',
    function (err, rows) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: 'Server Error',
        });
      } else {
        return res.status(200).json({
          status: true,
          message: 'List data',
          data: rows,
        });
      }
    }
  );
});

// insert
posting.post(
  '/posting',
  [body('title').notEmpty(), body('content').notEmpty()],
  (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    // define formData
    let formData = {
      title: req.body.title,
      content: req.body.content,
    };

    connection.query(
      'INSERT INTO posting SET ?',
      formData,
      function (err, rows) {
        if (err) {
          return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
          });
        } else {
          return res.status(200).json({
            status: true,
            message: 'Tambah data berhasil.',
          });
        }
      }
    );
  }
);

// get by id
posting.get('/posting/(:id)', function (req, res) {
  let id = req.params.id;

  connection.query(
    `SELECT * FROM posting WHERE id = ${id}`,
    function (err, rows) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: 'Internal Server Error',
        });
      }

      if (rows.length <= 0) {
        return res.status(404).json({
          status: false,
          message: 'Data tidak ditemukan!',
        });
      }

      return res.status(200).json({
        status: true,
        message: 'Detail data posting',
        data: rows[0],
      });
    }
  );
});

module.exports = posting;
