/**
 * Transposition Cipher Implementation
 * Rearranges characters based on a keyword
 */

const TranspositionCipher = {
    name: 'Transposition Cipher',
    description: 'Rearranges characters based on a keyword. Characters are reordered according to the alphabetical position of the keyword letters.',
    
    /**
     * Get the order of key indices based on alphabetical order
     * @param {string} keyword - Keyword
     * @returns {array} - Order of indices
     */
    getKeyOrder: function(keyword) {
        let order = [];
        let keyArr = keyword.toUpperCase().split('');
        
        for (let i = 0; i < keyArr.length; i++) {
            order.push(i);
        }
        
        order.sort((a, b) => keyArr[a].localeCompare(keyArr[b]));
        return order;
    },
    
    /**
     * Encrypt text using Transposition cipher
     * @param {string} text - Text to encrypt
     * @param {string} keyword - Keyword
     * @returns {string|null} - Encrypted text or null if keyword is invalid
     */
    encryptText: function(text, keyword) {
        if (!/^[a-zA-Z]+$/.test(keyword)) {
            return null;
        }
        
        const keyLen = keyword.length;
        const keyOrder = this.getKeyOrder(keyword);
        
        // Pad text if necessary
        let padded = text;
        while (padded.length % keyLen !== 0) {
            padded += ' ';
        }
        
        // Create columns
        let columns = Array(keyLen).fill('').map(() => '');
        for (let i = 0; i < padded.length; i++) {
            columns[i % keyLen] += padded[i];
        }
        
        // Rearrange based on key order
        let result = '';
        for (let i = 0; i < keyLen; i++) {
            result += columns[keyOrder[i]];
        }
        
        return result;
    },
    
    /**
     * Decrypt text using Transposition cipher
     * @param {string} text - Text to decrypt
     * @param {string} keyword - Keyword
     * @returns {string|null} - Decrypted text or null if keyword is invalid
     */
    decryptText: function(text, keyword) {
        if (!/^[a-zA-Z]+$/.test(keyword)) {
            return null;
        }
        
        const keyLen = keyword.length;
        const keyOrder = this.getKeyOrder(keyword);
        const textLen = text.length;
        const colLen = textLen / keyLen;
        
        // Split encrypted text into columns
        let encColumns = Array(keyLen).fill('').map(() => '');
        let idx = 0;
        
        for (let i = 0; i < keyLen; i++) {
            for (let j = 0; j < colLen; j++) {
                encColumns[keyOrder[i]] += text[idx++];
            }
        }
        
        // Read row by row
        let result = '';
        for (let i = 0; i < colLen; i++) {
            for (let j = 0; j < keyLen; j++) {
                result += encColumns[j][i];
            }
        }
        
        return result.trim();
    },
    
    encrypt: function() {
        const text = document.getElementById('trans-text').value;
        const keyword = document.getElementById('trans-key').value;
        
        if (!text || !keyword) {
            alert('Please enter both message and keyword');
            return;
        }
        
        const result = this.encryptText(text, keyword);
        
        if (result === null) {
            alert('Keyword must contain only letters');
            return;
        }
        
        displayResult('transposition-result', result);
    },
    
    decrypt: function() {
        const text = document.getElementById('trans-text').value;
        const keyword = document.getElementById('trans-key').value;
        
        if (!text || !keyword) {
            alert('Please enter both message and keyword');
            return;
        }
        
        const result = this.decryptText(text, keyword);
        
        if (result === null) {
            alert('Keyword must contain only letters');
            return;
        }
        
        displayResult('transposition-result', result);
    },
    
    render: function() {
        const content = `
            ${createInfoBox('Transposition Cipher:', 'Rearranges characters based on a keyword. Characters are reordered according to the alphabetical position of the keyword letters.')}
            ${createTextareaGroup('trans-text', 'Message:', 'Enter message')}
            ${createFormGroup('trans-key', 'Keyword (letters only):', 'text', 'SECRET', 'Enter keyword')}
            ${createButtonGroup(
                createButton('Encrypt', 'TranspositionCipher.encrypt()'),
                createButton('Decrypt', 'TranspositionCipher.decrypt()')
            )}
            <div id="transposition-result"></div>
        `;
        document.getElementById('transposition').innerHTML = content;
    }
};