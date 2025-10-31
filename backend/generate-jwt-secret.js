import crypto from 'crypto';

// Generate a secure JWT secret
const secret = crypto.randomBytes(32).toString('hex');

console.log('\n🔐 Generated JWT Secret:\n');
console.log(secret);
console.log('\n📋 Copy this value and use it as your JWT_SECRET environment variable\n');
