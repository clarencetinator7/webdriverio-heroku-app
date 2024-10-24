// test_20241024124123@test.com
// SamplePassword
import reporter from "../utils/reporter"
import loginPage from "../pageobjects/heroku_app_login.page.js"
describe('Heroku App Login', () => {
    it('should login with valid credentials_TC002', async () => {
        await reporter.addLog(`Navigate to Thinking Tester Website`)
        await loginPage.navigate()
        
        const EMAIL = 'test_20241024124123@test.com'
        const PASSWORD = 'SamplePassword'

        await loginPage.login(EMAIL, PASSWORD)

        await expect(browser).toHaveUrl('https://thinking-tester-contact-list.herokuapp.com/contactList')
    })
})