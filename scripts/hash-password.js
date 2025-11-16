const bcrypt = require('bcryptjs');

const password = 'admin123';
const hash = bcrypt.hashSync(password, 10);

console.log('Password:', password);
console.log('Hash:', hash);
console.log('\nUse this hash in your SQL:');
console.log(`UPDATE admin_users SET password_hash = '${hash}' WHERE username = 'admin';`);