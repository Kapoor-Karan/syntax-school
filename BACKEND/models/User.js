const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['student', 'instructor'], required: true },
});

// Hash the password before saving
UserSchema.pre('save', async function (next) {
    if (!this.isModified('passwordHash')) return next();
    this.passwordHash = await bcrypt.hash(this.passwordHash, 10);
    next();
});

module.exports = mongoose.model('User', UserSchema);
