const { Builder, By, until } = require('selenium-webdriver');

jest.setTimeout(30000);

describe('Tests E2E avec Selenium', () => {
                let driver;

                beforeAll(async () => {
                                driver = await new Builder()
                                                .forBrowser('chrome')
                                                .build();
                });

                afterAll(async () => {
                                if (driver) {
                                                await driver.quit();
                                }
                });

                test('Connexion utilisateur réussie', async () => {
                                await driver.get('http://localhost:3000');

                                const emailInput = await driver.findElement(By.id('email'));
                                const passwordInput = await driver.findElement(By.id('password'));

                                await emailInput.sendKeys('admin@test.com');
                                await passwordInput.sendKeys('password');

                                const loginButton = await driver.findElement(
                                                By.css('button[type="submit"]')
                                );

                                await loginButton.click();

                                await driver.wait(
                                                until.urlContains('/dashboard'),
                                                10000
                                );

                                const currentUrl = await driver.getCurrentUrl();

                                expect(currentUrl).toContain('/dashboard');
                });
});