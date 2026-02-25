/**
 * Utility functions for cryptography operations
 */

// Switch between tabs
function switchTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
}

// Display result with copy button
function displayResult(elementId, result, type = 'normal') {
    const resultDiv = document.getElementById(elementId);
    const safeResult = result.replace(/'/g, "\\'").replace(/"/g, '\\"');
    
    resultDiv.innerHTML = `
        <div class="result-box">
            <div class="result-label">Result:</div>
            <div class="result-text">${result}</div>
            <button class="copy-button" onclick="copyToClipboard('${safeResult}')">Copy Result</button>
        </div>
    `;
}

// Copy text to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Copied to clipboard!');
    }).catch(() => {
        alert('Failed to copy');
    });
}

// GCD - Greatest Common Divisor
function gcd(a, b) {
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

// Modular Inverse
function modInverse(a, m) {
    for (let x = 1; x < m; x++) {
        if ((a * x) % m === 1) {
            return x;
        }
    }
    return -1;
}

// Check if number is prime
function isPrime(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
}

// Create form group HTML
function createFormGroup(id, label, type = 'text', value = '', placeholder = '', extra = '') {
    return `
        <div class="form-group">
            <label for="${id}">${label}</label>
            <input type="${type}" id="${id}" value="${value}" placeholder="${placeholder}" ${extra}>
        </div>
    `;
}

// Create textarea group HTML
function createTextareaGroup(id, label, placeholder = '') {
    return `
        <div class="form-group">
            <label for="${id}">${label}</label>
            <textarea id="${id}" placeholder="${placeholder}"></textarea>
        </div>
    `;
}

// Create button group HTML
function createButtonGroup(...buttons) {
    return `
        <div class="button-group">
            ${buttons.join('')}
        </div>
    `;
}

// Create button HTML
function createButton(text, onclick) {
    return `<button onclick="${onclick}">${text}</button>`;
}

// Create info box HTML
function createInfoBox(title, description) {
    return `
        <div class="info-box">
            <strong>${title}</strong> ${description}
        </div>
    `;
}