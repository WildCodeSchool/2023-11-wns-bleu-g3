const nodemailer = require('nodemailer');
const nodemailermock = require('nodemailer-mock').getMockFor(nodemailer);
module.exports = nodemailermock;