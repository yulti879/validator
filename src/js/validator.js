export function luhnCheck(cardNumber) {    
    if (cardNumber.length === 0 || cardNumber.length < 13 || cardNumber.length > 19) {
        return false;
    }

    const digits = cardNumber.split('').map(Number);
    let sum = 0;

    for (let i = 0; i < digits.length; i++) {
        let digit = digits[digits.length - 1 - i];
        if (i % 2 === 1) {
            digit *= 2;
            if (digit > 9) {
                digit = digit - 9;
            }
        }
        sum += digit;
    }

    return sum % 10 === 0;
}

export function getCardType(cardNumber) {
    const length = cardNumber.length;

    if (/^3[47]/.test(cardNumber) && length === 15) {
        return 'American Express';
    } else if (/^(30[0-5]|36|38)/.test(cardNumber) && length === 14) {
        return "Diner's Club";
    } else if (/^(6011|65|64[4-9]|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[01][0-9]|92[0-5]))/.test(cardNumber) && (length >= 16 && length <= 19)) {
        return 'Discover';
    } else if (/^(352[8-9]|35[3-8][0-9])/.test(cardNumber) && (length >= 16 && length <= 19)) {
        return 'JCB';
    } else if (/^(5[1-5]|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)/.test(cardNumber) && length === 16) {
        return 'Mastercard';
    } else if (/^(4026|417500|4508|4844|4913|4917)/.test(cardNumber) && length === 16) {
        return 'Visa Electron';
    } else if (/^4/.test(cardNumber) && (length === 13 || length === 16 || length === 19)) {
        return 'Visa';
    } else if (/^220[0-4]/.test(cardNumber) && length === 16) {
        return 'МИР';
    } else {
        return 'unknown';
    }
}