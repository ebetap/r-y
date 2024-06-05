const crypto = require('crypto');
const NodeRSA = require('node-rsa');

class KeyManager {
  constructor() {
    // Inisialisasi kunci enkripsi saat pembuatan instance
    this.aesKey = this.generateAESKey();
    this.rsaKeyPair = this.generateRSAKeyPair();
  }

  // Fungsi untuk menghasilkan kunci AES secara acak
  generateAESKey() {
    return crypto.randomBytes(32).toString('hex'); // Menghasilkan kunci 256-bit (32 byte)
  }

  // Fungsi untuk menghasilkan pasangan kunci RSA
  generateRSAKeyPair() {
    return crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048, // Panjang modulus kunci RSA (dalam bit)
      publicKeyEncoding: {
        type: 'spki', // Format kunci publik
        format: 'pem' // Format keluaran kunci publik (Base64 PEM)
      },
      privateKeyEncoding: {
        type: 'pkcs8', // Format kunci privat
        format: 'pem' // Format keluaran kunci privat (Base64 PEM)
      }
    });
  }

  // Fungsi untuk mengambil kunci AES
  getAESKey() {
    return this.aesKey;
  }

  // Fungsi untuk mengambil kunci publik RSA
  getRSAPublicKey() {
    return this.rsaKeyPair.publicKey;
  }

  // Fungsi untuk mengambil kunci privat RSA
  getRSAPrivateKey() {
    return this.rsaKeyPair.privateKey;
  }
}

class HarmoniousEncryption {
  static encrypt(message, aesKey, rsaPublicKey) {
    const encryptedAES = this.encryptAESGCM(message, aesKey);
    return this.encryptRSAOAEP(encryptedAES, rsaPublicKey);
  }

  static decrypt(encryptedMessage, rsaPrivateKey, aesKey) {
    const decryptedRSA = this.decryptRSAOAEP(encryptedMessage, rsaPrivateKey);
    return this.decryptAESGCM(decryptedRSA, aesKey);
  }

  static encryptAESGCM(message, key) {
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(key, 'hex'), iv);
    let encrypted = cipher.update(message, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const tag = cipher.getAuthTag();
    return iv.toString('hex') + encrypted + tag.toString('hex');
  }

  static decryptAESGCM(encryptedMessage, key) {
    const iv = Buffer.from(encryptedMessage.slice(0, 24), 'hex');
    const tag = Buffer.from(encryptedMessage.slice(-32), 'hex');
    const encryptedData = encryptedMessage.slice(24, -32);
    const decipher = crypto.createDecipheriv('aes-256-gcm', Buffer.from(key, 'hex'), iv);
    decipher.setAuthTag(tag);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  static encryptRSAOAEP(message, publicKey) {
    const key = new NodeRSA(publicKey, 'pkcs8-public');
    return key.encrypt(message, 'base64');
  }

  static decryptRSAOAEP(encryptedMessage, privateKey) {
    const key = new NodeRSA(privateKey, 'pkcs8-private');
    return key.decrypt(encryptedMessage, 'utf8');
  }
}

module.exports = {
  KeyManager,
  HarmoniousEncryption
};
