/**
 * Caesar Cipher Implementation
 * Classic substitution cipher that shifts each letter by a fixed number
 */

const CaesarCipher = {
    name: 'Caesar Cipher',
    description: 'A simple substitution cipher that shifts each letter by a fixed number of positions in the alphabet.',
    
    /**
     * Encrypt/Decrypt text using Caesar cipher
     * @param {string} text - Text to encrypt/decrypt
     * @param {number} shift - Shift value
     * @returns {string} - Encrypted/Decrypted text
     */
    caesar: function(text, shift) {
        let result = "";
        for (let i = 0; i < text.length; i++) {
            let char = text[i];
            
            if (char.match(/[a-z]/i)) {
                let code = text.charCodeAt(i);
                
                if (code >= 65 && code <= 90) {
                    // Uppercase letters
                    char = String.fromCharCode((code - 65 + shift + 260) % 26 + 65);
                } else if (code >= 97 && code <= 122) {
                    // Lowercase letters
                    char = String.fromCharCode((code - 97 + shift + 260) % 26 + 97);
                }
            }
            result += char;
        }
        return result;
    },
    
    encrypt: function() {
        const text = document.getElementById('caesar-text').value;
        const shift = parseInt(document.getElementById('caesar-shift').value);
        
        if (!text) {
            alert('Please enter a message');
            return;
        }
        
        const result = this.caesar(text, shift);
        displayResult('caesar-result', result);
    },
    
    decrypt: function() {
        const text = document.getElementById('caesar-text').value;
        const shift = parseInt(document.getElementById('caesar-shift').value);
        
        if (!text) {
            alert('Please enter a message');
            return;
        }
        
        const result = this.caesar(text, -shift);
        displayResult('caesar-result', result);
    },
    
    render: function() {
        const content = `
            ${createInfoBox('Caesar Cipher:', 'A simple substitution cipher that shifts each letter by a fixed number of positions in the alphabet.')}
            ${createTextareaGroup('caesar-text', 'Message:', 'Enter message to encrypt/decrypt')}
            ${createFormGroup('caesar-shift', 'Shift Value (0-25):', 'number', '3', 'Enter shift value', 'min="0" max="25"')}
            ${createButtonGroup(
                createButton('Encrypt', 'CaesarCipher.encrypt()'),
                createButton('Decrypt', 'CaesarCipher.decrypt()')
            )}
            <div id="caesar-result"></div>
        `;
        document.getElementById('caesar').innerHTML = content;
    }
};