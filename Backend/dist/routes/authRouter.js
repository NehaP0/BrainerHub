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
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const router = express_1.default.Router();
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        //if user already exists
        const userExists = yield user_1.default.findOne({ username });
        if (userExists) {
            return res.status(409).send('Username already exists');
        }
        else {
            // create a new user
            const hashedPassword = yield bcrypt_1.default.hash(password, 5);
            const newUser = yield user_1.default.create({ username, password: hashedPassword });
            return res.status(201).send('User registered');
        }
    }
    catch (err) {
        return res.status(500).send('Registration failed');
    }
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        //if users username matches with the one that is there in the database
        const user = yield user_1.default.findOne({ username });
        if (!user) {
            return res.status(401).send('Invalid Credentials');
        }
        else {
            const matchPassword = yield bcrypt_1.default.compare(password, user.password);
            if (!matchPassword) {
                return res.status(401).send('Invalid credentials');
            }
            else {
                const token = jsonwebtoken_1.default.sign({ userId: user.id }, 'brainerhub', { expiresIn: '1h' });
                return res.status(200).send({ token });
            }
        }
    }
    catch (err) {
        return res.status(500).send('Login failed');
    }
}));
exports.default = router;
