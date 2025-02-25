import { luhnCheck, getCardType } from './validator';

describe('luhnCheck', () => {
    
    test('Проверяет валидность номера карты', () => {
        expect(luhnCheck('6389179456886001')).toBe(true);
        expect(luhnCheck('5018771287546613')).toBe(true);
        expect(luhnCheck('30492116671366')).toBe(true);
        expect(luhnCheck('0000000000000000')).toBe(true);
    });

    test('Проверяет невалидность номера карты', () => {
        expect(luhnCheck('4556318757725992')).toBe(false);
        expect(luhnCheck('9999999999999999')).toBe(false);        
        expect(luhnCheck('1234567890123456')).toBe(false);
    });

    test('Проверяет пустой ввод', () => {
        expect(luhnCheck('')).toBe(false);
    });

    test('Проверяет ввод с недопустимыми символами', () => {
        expect(luhnCheck('4111-1111-1111-1111')).toBe(false);
        expect(luhnCheck('4111 1111 1111 1111')).toBe(false);
        expect(luhnCheck('4111abc1111111111')).toBe(false);
    });
});

describe('getCardType', () => {    
    
    test('Возвращает "unknown" для неизвестных типов карт', () => {
        expect(getCardType('0604851340780929')).toBe('unknown');
        expect(getCardType('6393029881065974')).toBe('unknown');
    });
    
    test('Определяет тип карты American Express', () => {
        expect(getCardType('340729034040140')).toBe('American Express');
        expect(getCardType('378764944355259')).toBe('American Express');
    });

    test('Определяет тип карты Diner\'s Club', () => {
        expect(getCardType('30058938009000')).toBe("Diner's Club");
        expect(getCardType('36288198042185')).toBe("Diner's Club");        
    });

    test('Определяет тип карты Discover', () => {
        expect(getCardType('6011432115236290')).toBe('Discover');
        expect(getCardType('6011687743764495202')).toBe('Discover');
    });

    test('Определяет тип карты JCB', () => {
        expect(getCardType('3532062519421391')).toBe('JCB');
        expect(getCardType('3532885282075712466')).toBe('JCB');        
    });

    test('Определяет тип карты Mastercard', () => {
        expect(getCardType('2720994437833758')).toBe('Mastercard');
        expect(getCardType('5146674417375744')).toBe('Mastercard');
    });

    test('Определяет тип карты Visa', () => {
        expect(getCardType('4485775076008302')).toBe('Visa');
        expect(getCardType('4532740070754267751')).toBe('Visa');
    });

    test('Определяет тип карты Visa Electron', () => {
        expect(getCardType('4844450044541919')).toBe('Visa Electron');
        expect(getCardType('4917569016185330')).toBe('Visa Electron');
    });

    test('Определяет тип карты МИР', () => {
        expect(getCardType('2201382000000013')).toBe('МИР');
    });    
});