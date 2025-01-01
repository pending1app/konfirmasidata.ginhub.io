// Import library crypto untuk hashing dan enkripsi
const crypto = require('crypto');

// 1. Enkripsi Data
function encryptData(data, secretKey) {
    const cipher = crypto.createCipher('aes-256-cbc', secretKey);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

// 2. Dekripsi Data
function decryptData(encryptedData, secretKey) {
    const decipher = crypto.createDecipher('aes-256-cbc', secretKey);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

// 3. Hashing Data (SHA-256)
function hashData(data) {
    return crypto.createHash('sha256').update(data).digest('hex');
}

// 4. Rate Limiting untuk Brute Force Protection
let requestCount = 0;
const maxRequests = 100; // Maksimum request per menit
const resetTime = 60000; // Waktu reset 1 menit

setInterval(() => {
    requestCount = 0; // Reset request count tiap menit
}, resetTime);

function rateLimiter() {
    if (requestCount >= maxRequests) {
        throw new Error('Terlalu banyak permintaan! Tunggu sebentar.');
    }
    requestCount++;
}

// 5. Content Security Policy (CSP)
const cspHeader = "Content-Security-Policy: default-src 'self'; script-src 'self'";

// 6. Session Management
function createSession(userId) {
    const sessionId = crypto.randomBytes(16).toString('hex');
    // Simpan session ke database dengan HttpOnly, Secure, SameSite cookie
    console.log(`Session Created for User: ${userId}, Session ID: ${sessionId}`);
    return sessionId;
}

// 7. OTP Generator
function generateOTP(secretKey) {
    const otp = crypto.createHmac('sha256', secretKey).update(Date.now().toString()).digest('hex').slice(0, 6);
    console.log(`Generated OTP: ${otp}`);
    return otp;
}

// 8. Input Validation
function validateInput(input) {
    const sanitizedInput = input.replace(/[^a-zA-Z0-9]/g, '');
    if (sanitizedInput !== input) {
        throw new Error('Input tidak valid!');
    }
    return sanitizedInput;
}

// 9. Integrity Check
function verifyIntegrity(data, hash) {
    const calculatedHash = hashData(data);
    if (calculatedHash !== hash) {
        throw new Error('Integritas data tidak valid!');
    }
    console.log('Data integrity valid');
}

// 10. Logging dan Monitoring
function logActivity(activity) {
    console.log(`Activity: ${activity}, Timestamp: ${new Date().toISOString()}`);
}

// Contoh Penggunaan
try {
    rateLimiter(); // 4. Rate Limiting

    const data = "Ini adalah data penting.";
    const secretKey = "superSecretKey123";

    const encryptedData = encryptData(data, secretKey); // 1. Enkripsi
    console.log("Encrypted Data:", encryptedData);

    const decryptedData = decryptData(encryptedData, secretKey); // 2. Dekripsi
    console.log("Decrypted Data:", decryptedData);

    const hashedData = hashData(data); // 3. Hashing
    console.log("Hashed Data:", hashedData);

    validateInput("TestInput123"); // 8. Input Validation

    generateOTP(secretKey); // 7. OTP

    createSession("user123"); // 6. Session Management

    verifyIntegrity(data, hashedData); // 9. Integrity Check

    logActivity("User Login"); // 10. Logging
} catch (error) {
    console.error("Error:", error.message);
}