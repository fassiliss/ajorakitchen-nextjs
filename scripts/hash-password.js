/* eslint-disable @typescript-eslint/no-require-imports */
const bcrypt = require('bcryptjs');

const password = 'admin123';
const hash = bcrypt.hashSync(password, 10);

console.log('Password:', password);
console.log('Hash:', hash);
console.log('\nUse this value as ADMIN_PASSWORD_HASH in your environment:');
console.log(hash);
