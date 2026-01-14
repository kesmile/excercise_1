import bcrypt from 'bcrypt';

const generateHash = async () => {
    const password = 'password123';
    // Hash from V2__insert_initial_data.sql
    const hashFromSql = '$2b$10$c68lXwdcdHf3bnfxbBxLAepX0FdiM7vgF70VOW9X0DZoyk7Voouuy';

    console.log(`Testing password: ${password}`);
    const isMatch = await bcrypt.compare(password, hashFromSql);
    console.log(`Does it match the SQL hash? ${isMatch}`);

    const newHash = await bcrypt.hash(password, 10);
    console.log(`\nNew generated hash for '${password}':`);
    console.log(newHash);
};

generateHash();
