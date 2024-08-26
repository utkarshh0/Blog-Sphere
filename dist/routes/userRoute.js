"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post('/signin', (req, res) => {
    res.json({
        'msg': 'Signin Page'
    });
});
router.post('/signup', (req, res) => {
    res.json({
        'msg': 'Signup Page'
    });
});
exports.default = router;
