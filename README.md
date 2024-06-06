### Dokumentasi API dan Cara Penggunaan

#### Deskripsi
Library ini menyediakan kelas untuk manajemen kunci enkripsi dan enkripsi/dekripsi pesan menggunakan kombinasi AES-GCM dan RSA-OAEP. Kunci AES digunakan untuk enkripsi simetris pesan, sementara RSA digunakan untuk mengenkripsi kunci AES.

#### Instalasi
Pastikan Anda telah menginstal Node.js dan npm. Kemudian, instal dependensi yang diperlukan:
```bash
npm install crypto node-rsa
```

#### Struktur
Library ini terdiri dari dua kelas utama:
1. `KeyManager`: Mengelola pembuatan dan penyimpanan kunci AES dan pasangan kunci RSA.
2. `HarmoniousEncryption`: Menyediakan metode untuk enkripsi dan dekripsi pesan menggunakan AES-GCM dan RSA-OAEP.

### KeyManager

#### Metode

1. **Constructor**: Menginisialisasi objek `KeyManager` dengan kunci AES dan pasangan kunci RSA.
    ```javascript
    const keyManager = new KeyManager();
    ```

2. **generateAESKey**: Menghasilkan kunci AES secara acak.
    ```javascript
    keyManager.generateAESKey(); // return 32-byte AES key in hex format
    ```

3. **generateRSAKeyPair**: Menghasilkan pasangan kunci RSA.
    ```javascript
    keyManager.generateRSAKeyPair(); // return { publicKey, privateKey }
    ```

4. **getAESKey**: Mengambil kunci AES.
    ```javascript
    const aesKey = keyManager.getAESKey(); // return AES key in hex format
    ```

5. **getRSAPublicKey**: Mengambil kunci publik RSA.
    ```javascript
    const rsaPublicKey = keyManager.getRSAPublicKey(); // return RSA public key in PEM format
    ```

6. **getRSAPrivateKey**: Mengambil kunci privat RSA.
    ```javascript
    const rsaPrivateKey = keyManager.getRSAPrivateKey(); // return RSA private key in PEM format
    ```

### HarmoniousEncryption

#### Metode

1. **encrypt**: Mengenkripsi pesan menggunakan AES-GCM dan RSA-OAEP.
    ```javascript
    static encrypt(message, aesKey, rsaPublicKey)
    // Parameters:
    // - message: String, pesan yang akan dienkripsi.
    // - aesKey: String, kunci AES dalam format hex.
    // - rsaPublicKey: String, kunci publik RSA dalam format PEM.
    // Return: String, pesan terenkripsi dalam format base64.
    ```

2. **decrypt**: Mendekripsi pesan menggunakan RSA-OAEP dan AES-GCM.
    ```javascript
    static decrypt(encryptedMessage, rsaPrivateKey, aesKey)
    // Parameters:
    // - encryptedMessage: String, pesan terenkripsi dalam format base64.
    // - rsaPrivateKey: String, kunci privat RSA dalam format PEM.
    // - aesKey: String, kunci AES dalam format hex.
    // Return: String, pesan asli yang telah didekripsi.
    ```

3. **encryptAESGCM**: Mengenkripsi pesan menggunakan AES-GCM.
    ```javascript
    static encryptAESGCM(message, key)
    // Parameters:
    // - message: String, pesan yang akan dienkripsi.
    // - key: String, kunci AES dalam format hex.
    // Return: String, pesan terenkripsi dalam format hex (iv + encrypted data + auth tag).
    ```

4. **decryptAESGCM**: Mendekripsi pesan menggunakan AES-GCM.
    ```javascript
    static decryptAESGCM(encryptedMessage, key)
    // Parameters:
    // - encryptedMessage: String, pesan terenkripsi dalam format hex.
    // - key: String, kunci AES dalam format hex.
    // Return: String, pesan asli yang telah didekripsi.
    ```

5. **encryptRSAOAEP**: Mengenkripsi pesan menggunakan RSA-OAEP.
    ```javascript
    static encryptRSAOAEP(message, publicKey)
    // Parameters:
    // - message: String, pesan yang akan dienkripsi.
    // - publicKey: String, kunci publik RSA dalam format PEM.
    // Return: String, pesan terenkripsi dalam format base64.
    ```

6. **decryptRSAOAEP**: Mendekripsi pesan menggunakan RSA-OAEP.
    ```javascript
    static decryptRSAOAEP(encryptedMessage, privateKey)
    // Parameters:
    // - encryptedMessage: String, pesan terenkripsi dalam format base64.
    // - privateKey: String, kunci privat RSA dalam format PEM.
    // Return: String, pesan asli yang telah didekripsi.
    ```

### Contoh Penggunaan

Berikut adalah contoh cara menggunakan library ini dalam sebuah skrip Node.js:

```javascript
const { KeyManager, HarmoniousEncryption } = require('./path/to/your/module');

// Inisialisasi manajer kunci
const keyManager = new KeyManager();

// Dapatkan kunci AES dan kunci publik RSA
const aesKey = keyManager.getAESKey();
const rsaPublicKey = keyManager.getRSAPublicKey();
const rsaPrivateKey = keyManager.getRSAPrivateKey();

// Pesan yang akan dienkripsi
const message = "Ini adalah pesan rahasia";

// Enkripsi pesan
const encryptedMessage = HarmoniousEncryption.encrypt(message, aesKey, rsaPublicKey);
console.log("Pesan terenkripsi:", encryptedMessage);

// Dekripsi pesan
const decryptedMessage = HarmoniousEncryption.decrypt(encryptedMessage, rsaPrivateKey, aesKey);
console.log("Pesan terdekripsi:", decryptedMessage);
```

### Penjelasan Tambahan

- **AES-GCM**: Algoritma enkripsi simetris yang cepat dan aman, menggunakan 256-bit key dengan mode GCM untuk memastikan integritas data.
- **RSA-OAEP**: Algoritma enkripsi asimetris yang menggunakan padding OAEP untuk keamanan lebih baik, biasanya digunakan untuk mengenkripsi kunci simetris seperti AES.

Dengan struktur ini, Anda dapat dengan mudah mengelola kunci enkripsi dan melakukan enkripsi/dekripsi pada pesan sensitif menggunakan kombinasi metode enkripsi simetris dan asimetris.
