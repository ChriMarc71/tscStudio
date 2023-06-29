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
const connection_1 = __importDefault(require("../../database/connection"));
const mailTransporter_1 = require("../../utils/mailTransporter");
const makeId_1 = require("../../utils/makeId");
const express_1 = __importDefault(require("express"));
const mailValidator_1 = __importDefault(require("../../utils/mailValidator"));
const app2 = (0, express_1.default)();
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    if (!(0, mailValidator_1.default)(email)) {
        res.send("invalid email");
    }
    else {
        const fname = req.body.fname;
        const lname = req.body.lname;
        const username = req.body.username;
        const password = req.body.password;
        const phoneNumber = req.body.phoneNumber;
        const doctor = req.body.doctor;
        yield connection_1.default.patients.create({
            data: {
                Email: email,
                Username: username,
                Password: password,
                FirstName: fname,
                LastName: lname,
                PhoneNumber: phoneNumber,
                Doctor: doctor,
                DoctorConfirmed: false,
                IsEnable: false,
                Token: (0, makeId_1.makeId)(64),
            },
        });
        const randomString = (0, makeId_1.makeId)("string");
        const subject = "CONFIRM EMAIL";
        const text = "Click the button or paste the following link in the search bar 'http://localhost:3001/${randomString}'";
        const html = `<a href='http://localhost:3001/${randomString}'>Cliccami</a>`;
        (0, mailTransporter_1.sendEmail)(email, subject, text, html);
        res.send("Registration done, check emails to confirm the account");
        const confirmRegistration = (_req, _res) => __awaiter(void 0, void 0, void 0, function* () {
            yield connection_1.default.patients.updateMany({
                where: {
                    Email: email,
                },
                data: {
                    IsEnable: true,
                },
            });
            _res.send("Registration confirmed");
        });
        app2.get("/" + randomString, confirmRegistration);
    }
});
app2.listen(3001);
exports.default = register;
