const asyncHandler = require('../utils/asyncHandler');
const db = require('../../dbconnection');

exports.thesis_create = asyncHandler(async (req, res, next) => {
    const thesis = {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        filepath: req.file.path
    };
    const rows = await db.query('INSERT INTO thesis SET ?;', thesis);
    thesis.id = rows.insertId;
    return res.status(201).json({
        message: 'Thesis added in database successfully.',
        data: thesis
    });
});

exports.thesis_get = asyncHandler(async (req, res, next) => {
    const id = req.params.thesisId;
    const rows = await db.query('SELECT * FROM thesis WHERE is_deleted = 0 AND id = ?;', id);
    if (rows && rows.length > 0)
        return res.status(200).json({ message: 'Data fetched with success.', data: rows });
    else
        return res.status(404).json({ message: 'Thesis not found' });
});

exports.thesis_get_all = asyncHandler(async (req, res, next) => {
    const rows = await db.query('SELECT id, title, description, category, filepath FROM thesis WHERE is_deleted = 0;');
    const response = {
        message: 'Data fetched with success',
        count: rows.length,
        data: rows
    };
    return res.status(200).json(response);
});

exports.thesis_update = asyncHandler(async (req, res, next) => {
    const updateThesis = {
        title: req.body.name,
        description: req.body.description,
        category: req.body.category,
        filepath: req.file.path
    };
    await db.query('UPDATE thesis SET ? WHERE id = ?;', [updateThesis, req.params.thesisId]);
    updateThesis.id = req.param.thesisId;
    return res.status(201).json({ message: 'Thesis updated with success', data: updateThesis });
});

exports.thesis_delete = asyncHandler(async (req, res, next) => {
    await db.query('UPDATE thesis SET is_deleted = 1 WHERE id = ?;', req.params.thesisId);
    return res.status(201).json({ message: 'Successfully deleted!' });
});




