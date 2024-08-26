"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post('/blog', (req, res) => {
    res.json({
        'msg': 'Create Blog Page'
    });
});
router.put('/blog', (req, res) => {
    res.json({
        'msg': 'Update Blog Page'
    });
});
router.get('/blog/:id', (req, res) => {
    res.json({
        'msg': `Get Blog Post with ID: ${req.params.id}`
    });
});
router.get('/blog/bulk', (req, res) => {
    res.json({
        'msg': 'Get Multiple Blog Posts'
    });
});
exports.default = router;
