const {
                isValidPriority,
                isValidStatus
} = require('../utils/taskUtils');

describe('Tests unitaires', () => {

                test('medium est une priorité valide', () => {
                                expect(isValidPriority('medium')).toBe(true);
                });

                test('urgent est une priorité invalide', () => {
                                expect(isValidPriority('urgent')).toBe(false);
                });

                test('done est un statut valide', () => {
                                expect(isValidStatus('done')).toBe(true);
                });

                test('finished est un statut invalide', () => {
                                expect(isValidStatus('finished')).toBe(false);
                });

});