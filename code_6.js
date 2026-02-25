/**
 * Affine Cipher Implementation
 * Encrypts using the formula: E(x) = (ax + b) mod 26
 */

const AffineCipher = {
    name: 'Affine Cipher',
    description: 'Encrypts using the formula: E(x) = (ax + b) mod 26. Where "a" and "b" are keys and gcd(a, 26) must equal 1.',
    
    /**
     * Encrypt text using Affine cipher
     * @param {string} text - Text to encrypt
     * @param {number} a - Key A (must be coprime with 26)
     * @param {number} b - Key B
     * @returns {string|null} - Encrypted text or null if keys are invalid
     */
    encryptText: function(text, a, b) {
        if (gcd(a, 26) !== 1) {
            return null;
        }
        
        let result = "";
        for (let char of text) {
            if (char.match(/[A-Z]/)) {
                let x = char.charCodeAt(0) - 65;
                let encrypted = (a * x + b) % 26;
                result += String.fromCharCode(encrypted + 65);
            } else if (char.match(/[a-z]/)) {
                let x = char.charCodeAt(0) - 97;
                let encrypted = (a * x + b) % 26;
                result += String.fromCharCode(encrypted + 97);
            } else {
                result += char;
            }
        }
        return result;
    },
    
    /**
     * Decrypt text using Affine cipher
     * @param {string} text - Text to decrypt
     * @param {number} a - Key A (must be coprime with 26)
     * @param {number} b - Key B
     * @returns {string|null} - Decrypted text or null if keys are invalid
     */
    decryptText: function(text, a, b) {
        if (gcd(a, 26) !== 1) {
            return null;
        }
        
        const aInverse = modInverse(a, 26);
        let result = "";
        
        for (let char of text) {
            if (char.match(/[A-Z]/)) {
                let y = char.charCodeAt(0) - 65;
                let decrypted = (aInverse * (y - b + 26)) % 26;
                result += String.fromCharCode(decrypted + 65);
            } else if (char.match(/[a-z]/)) {
                let y = char.charCodeAt(0) - 97;
                let decrypted = (aInverse * (y - b + 26)) % 26;
                result += String.fromCharCode(decrypted + 97);
            } else {
                result += char;
            }
        }
        return result;
    },
    
    encrypt: function() {
        const text = document.getElementById('affine-text').value;
        const a = parseInt(document.getElementById('affine-a').value);
        const b = parseInt(document.getElementById('affine-b').value);
        
        if (!text) {
            alert('Please enter a message');
            return;
        }
        
        const result = this.encryptText(text, a, b);
        
        if (result === null) {
            alert('Key A must be coprime with 26. Valid values: 1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 25');
            return;
        }
        
        displayResult('affine-result', result);
    },
    
    decrypt: function() {
        const text = document.getElementById('affine-text').value;
        const a = parseInt(document.getElementById('affine-a').value);
        const b = parseInt(document.getElementById('affine-b').value);
        
        if (!text) {
            alert('Please enter a message');
            return;
        }
        
        const result = this.decryptText(text, a, b);
        
        if (result === null) {
            alert('Key A must be coprime with 26. Valid values: 1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 25');
            return;
        }
        
        displayResult('affine-result', result);
    },
    
    render: function() {
        const content = `
            ${createInfoBox('Affine Cipher:', 'Encrypts using the formula: E(x) = (ax + b) mod 26. Where "a" and "b" are keys and gcd(a, 26) must equal 1.')}
            <div class="row">
                <div>
                    ${createFormGroup('affine-a', 'Key A (coprime with 26):', 'number', '5', 'Enter key A')}
                    <small style="color: #999;">Valid values: 1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 25</small>
                </div>
                <div>
                    ${createFormGroup('affine-b', 'Key B:', 'number', '8', 'Enter key B', 'min="0" max="25"')}
                </div>
            </div>
            ${createTextareaGroup('affine-text', 'Message:', 'Enter message (letters only)')}
            ${createButtonGroup(
                createButton('Encrypt', 'AffineCipher.encrypt()'),
                createButton('Decrypt', 'AffineCipher.decrypt()')
            )}
            <div id="affine-result"></div>
        `;
        document.getElementById('affine').innerHTML = content;
    }
};