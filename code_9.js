/**
 * RSA Cryptography Implementation
 * Public-key cryptosystem for educational purposes
 */

const RSACryptography = {
    name: 'RSA Cryptography',
    description: 'A public-key cryptosystem. Generate keys, then encrypt/decrypt. This demo uses small numbers for educational purposes.',
    
    keys: null,
    
    /**
     * Generate RSA key pair
     * @param {number} p - Prime number P
     * @param {number} q - Prime number Q
     * @returns {object|null} - Generated keys or null if primes are invalid
     */
    generateKeys: function(p, q) {
        if (!isPrime(p) || !isPrime(q)) {
            return null;
        }
        
        if (p === q) {
            return null;
        }
        
        const n = p * q;
        const phi = (p - 1) * (q - 1);
        
        // Find e (public exponent)
        let e = 2;
        while (gcd(e, phi) !== 1) {
            e++;
        }
        
        // Find d (private exponent)
        let d = 1;
        while ((e * d) % phi !== 1) {
            d++;
        }
        
        return {
            n: n,
            e: e,
            d: d,
            p: p,
            q: q,
            phi: phi
        };
    },
    
    /**
     * Encrypt message using public key
     * @param {number} message - Message to encrypt
     * @param {number} e - Public exponent
     * @param {number} n - Modulus
     * @returns {number} - Encrypted message
     */
    encryptMessage: function(message, e, n) {
        return Math.pow(message, e) % n;
    },
    
    /**
     * Decrypt message using private key
     * @param {number} message - Message to decrypt
     * @param {number} d - Private exponent
     * @param {number} n - Modulus
     * @returns {number} - Decrypted message
     */
    decryptMessage: function(message, d, n) {
        return Math.pow(message, d) % n;
    },
    
    generateKeys: function() {
        const p = parseInt(document.getElementById('rsa-p').value);
        const q = parseInt(document.getElementById('rsa-q').value);
        
        if (!isPrime(p) || !isPrime(q)) {
            alert('Both P and Q must be prime numbers');
            return;
        }
        
        if (p === q) {
            alert('P and Q must be different');
            return;
        }
        
        this.keys = this.generateKeys(p, q);
        
        const keysHTML = `
            <div class="result-box">
                <div class="result-label">Generated Keys:</div>
                <div style="background: white; padding: 15px; border-radius: 4px; border: 1px solid #e0e0e0;">
                    <p><strong>Public Key (n, e):</strong> (${this.keys.n}, ${this.keys.e})</p>
                    <p><strong>Private Key (n, d):</strong> (${this.keys.n}, ${this.keys.d})</p>
                    <p style="font-size: 12px; color: #666; margin-top: 10px;">
                        <strong>Parameters:</strong><br>
                        p = ${this.keys.p}, q = ${this.keys.q}<br>
                        n = p × q = ${this.keys.n}<br>
                        φ(n) = (p-1) × (q-1) = ${this.keys.phi}
                    </p>
                </div>
            </div>
        `;
        document.getElementById('rsa-keys-display').innerHTML = keysHTML;
    },
    
    encryptMsg: function() {
        if (!this.keys) {
            alert('Please generate keys first');
            return;
        }
        
        const message = parseInt(document.getElementById('rsa-message').value);
        
        if (message >= this.keys.n) {
            alert(`Message must be less than n (${this.keys.n})`);
            return;
        }
        
        const encrypted = this.encryptMessage(message, this.keys.e, this.keys.n);
        
        displayResult('rsa-result', `
Original Message: ${message}
Public Key (n, e): (${this.keys.n}, ${this.keys.e})
Encrypted Message: ${encrypted}
Formula: ${message}^${this.keys.e} mod ${this.keys.n} = ${encrypted}
        `.trim());
    },
    
    decryptMsg: function() {
        if (!this.keys) {
            alert('Please generate keys first');
            return;
        }
        
        const message = parseInt(document.getElementById('rsa-message').value);
        
        if (message >= this.keys.n) {
            alert(`Encrypted message must be less than n (${this.keys.n})`);
            return;
        }
        
        const decrypted = this.decryptMessage(message, this.keys.d, this.keys.n);
        
        displayResult('rsa-result', `
Encrypted Message: ${message}
Private Key (n, d): (${this.keys.n}, ${this.keys.d})
Decrypted Message: ${decrypted}
Formula: ${message}^${this.keys.d} mod ${this.keys.n} = ${decrypted}
        `.trim());
    },
    
    render: function() {
        const content = `
            ${createInfoBox('RSA Cryptography:', 'A public-key cryptosystem. Generate keys, then encrypt/decrypt. This demo uses small numbers for educational purposes.')}
            
            <h3>Key Generation</h3>
            <div class="row">
                <div>
                    ${createFormGroup('rsa-p', 'Prime P:', 'number', '61', 'Enter prime number')}
                </div>
                <div>
                    ${createFormGroup('rsa-q', 'Prime Q:', 'number', '53', 'Enter prime number')}
                </div>
            </div>
            <button onclick="RSACryptography.generateKeys()" style="width: 100%; margin-bottom: 20px;">Generate Keys</button>
            <div id="rsa-keys-display"></div>
            
            <h3>Encryption/Decryption</h3>
            ${createFormGroup('rsa-message', 'Number to Encrypt (0-9):', 'number', '7', 'Enter single digit')}
            ${createButtonGroup(
                createButton('Encrypt', 'RSACryptography.encryptMsg()'),
                createButton('Decrypt', 'RSACryptography.decryptMsg()')
            )}
            <div id="rsa-result"></div>
        `;
        document.getElementById('rsa').innerHTML = content;
    }
};