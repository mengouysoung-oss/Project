/**
 * General Shift Cipher Implementation
 * Extends Caesar cipher to work with any ASCII character and shift amount
 */

const GeneralShiftCipher = {
    name: 'General Shift Cipher',
    description: 'Similar to Caesar, but can work with any size shift value and handles the entire ASCII character set.',
    
    /**
     * Shift all characters by a value
     * @param {string} text - Text to shift
     * @param {number} shift - Shift amount
     * @returns {string} - Shifted text
     */
    generalShift: function(text, shift) {
        let result = "";
        for (let i = 0; i < text.length; i++) {
            let code = text.charCodeAt(i);
            result += String.fromCharCode(code + shift);
        }
        return result;
    },
    
    encrypt: function() {
        const text = document.getElementById('shift-text').value;
        const shift = parseInt(document.getElementById('shift-amount').value);
        
        if (!text) {
            alert('Please enter a message');
            return;
        }
        
        const result = this.generalShift(text, shift);
        displayResult('shift-result', result);
    },
    
    decrypt: function() {
        const text = document.getElementById('shift-text').value;
        const shift = parseInt(document.getElementById('shift-amount').value);
        
        if (!text) {
            alert('Please enter a message');
            return;
        }
        
        const result = this.generalShift(text, -shift);
        displayResult('shift-result', result);
    },
    
    render: function() {
        const content = `
            ${createInfoBox('General Shift Cipher:', 'Similar to Caesar, but can work with any size shift value and handles the entire ASCII character set.')}
            ${createTextareaGroup('shift-text', 'Message:', 'Enter message to encrypt/decrypt')}
            ${createFormGroup('shift-amount', 'Shift Amount:', 'number', '5', 'Enter any shift value')}
            ${createButtonGroup(
                createButton('Encrypt', 'GeneralShiftCipher.encrypt()'),
                createButton('Decrypt', 'GeneralShiftCipher.decrypt()')
            )}
            <div id="shift-result"></div>
        `;
        document.getElementById('shift').innerHTML = content;
    }
};