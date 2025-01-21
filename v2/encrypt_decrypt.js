// import crypto from 'crypto';
const crypto = require('crypto');

const ALGORITHM = 'aes-256-cbc'; // AES with 256-bit key in CBC mode
const KEY = Buffer.from("41glplb1973c398490d5d6805f90b33e", 'utf8'); // 32-byte key from env
const SALT = Buffer.from("bgxl6taf1f9ff34b", 'utf8'); // 16-byte salt from env

console.log(KEY.length)
console.log(SALT.length)
// if (KEY.length !== 32) {
//   throw new Error('Invalid ENCRYPTION_KEY length. Must be 32 bytes for AES-256.');
// }

// if (SALT.length !== 16) {
//   throw new Error('Invalid ENCRYPTION_SALT length. Must be 16 bytes.');
// }

// Derive a deterministic IV from the plaintext and salt
function deriveIv() {
  return crypto.createHash('sha256').update(SALT.toString('hex')).digest().subarray(0, 16); // 16-byte IV
}

// Encrypt function
function encrypt(text) {
  const iv = deriveIv();
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

// Decrypt function
function decrypt(encryptedData) {
  const iv = deriveIv();
  const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv);
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

console.log(encrypt("asif"));
console.log(decrypt("62486a712f51f781d59718fe8bfea50e"));
// 62486a712f51f781d59718fe8bfea50e
// 62486a712f51f781d59718fe8bfea50e