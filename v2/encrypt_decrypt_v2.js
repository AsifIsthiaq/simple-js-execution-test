const crypto = require('crypto');

const ALGORITHM = 'aes-256-cbc'; // AES with 256-bit key in CBC mode
const KEY = Buffer.from("41glplb1973c398490d5d6805f90b33e", 'utf8'); // 32-byte key from env
const SALT = Buffer.from("bgxl6taf1f9ff34a", 'utf8'); // 16-byte salt from env

console.log(KEY.length);  // Should be 32
console.log(SALT.length); // Should be 16

// Derive a key from the password and salt (optional, only if you need it)
function deriveKey() {
  return crypto.pbkdf2Sync(KEY, SALT, 10000, 32, 'sha256'); // 32-byte key derived from salt and password
}

// Encrypt function
function encrypt(text) {
  const iv = crypto.randomBytes(16); // Generate a random 16-byte IV for each encryption
  const cipher = crypto.createCipheriv(ALGORITHM, deriveKey(), iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  // Return IV + encrypted text (IV is prepended to ciphertext)
  return iv.toString('hex') + encrypted;
}

// Decrypt function
function decrypt(encryptedData) {
  // Extract the IV (first 16 bytes from the data)
  const iv = Buffer.from(encryptedData.substring(0, 32), 'hex'); // The first 32 characters represent the 16-byte IV
  const encryptedText = encryptedData.substring(32); // The rest is the encrypted data

  const decipher = crypto.createDecipheriv(ALGORITHM, deriveKey(), iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

console.log(encrypt("ISTHIAQ"));
console.log(decrypt("7774c78bb263ffcdb7579303ea26b8cfd0da1ba9867c48bc189eee806223b175"))
console.log(decrypt("9a41edb084fabbe771901af5e98e222084a9e86154b07ddbe5b09a1df7678745"))

console.log(decrypt("f716838a7616da73de3337829c23276e7a1e9ae4dfaa1cc6200609a1c83ecf11"))
console.log(decrypt("12dbac01b3348238519e90d1bf8c46398f22fc0b9362c5b3433a119fcf3c42de"))
