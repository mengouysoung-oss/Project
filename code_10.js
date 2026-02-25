/**
 * Main application file
 * Initializes all ciphers and renders them
 */

document.addEventListener('DOMContentLoaded', function() {
    // Render all ciphers
    CaesarCipher.render();
    GeneralShiftCipher.render();
    AffineCipher.render();
    TranspositionCipher.render();
    RSACryptography.render();
});