import bcrypt from 'bcrypt';

const generateHash = async () => {
    const password = 'password123';
    const hash = await bcrypt.hash(password, 10);
    console.log(`Password: ${password}`);
    console.log(`Hash: ${hash}`);
    console.log('\nSQL para actualizar:');
    console.log(`UPDATE user SET password = '${hash}' WHERE user_name = 'admin';`);
};

generateHash();
