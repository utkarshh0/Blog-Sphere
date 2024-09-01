"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blogModel_1 = __importDefault(require("../model/blogModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield blogModel_1.default.find();
        res.json(blogs);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
router.get('/blog/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid Blog ID' });
        }
        const blog = yield blogModel_1.default.findById(id);
        if (!blog)
            res.status(404).json({ msg: 'Blog not found' });
        res.json(blog);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
router.post('/post', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, author, content, email } = req.body;
        const blog = new blogModel_1.default({ title, content, author, email });
        yield blog.save();
        res.status(201).json(blog);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid Blog ID' });
        }
        const { title, content } = req.body;
        const blog = yield blogModel_1.default.findByIdAndUpdate(id, { title, content }, { new: true });
        if (!blog) {
            return res.status(404).json({ msg: 'Blog not found' });
        }
        res.json(blog);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
router.delete('/blog/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid Blog ID' });
        }
        const result = yield blogModel_1.default.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.json({ message: 'Blog deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
exports.default = router;
