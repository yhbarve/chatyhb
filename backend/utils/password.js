const crypto = require('crypto');

function hashPassword(password) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return { salt, hash };
}

function verifyPassword(password, salt, hash) {
    const hashed = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512');
    const stored = Buffer.from(hash, 'hex');
    return crypto.timingSafeEqual(hashed, stored);
}

module.exports = { hashPassword, verifyPassword };
