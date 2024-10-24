import Reporter from "../utils/reporter"
import signUpPage from "../pageobjects/heroku_app_signup.page.js"
import objUtil from "../utils/objUtil"
import moment from "moment"

// test_20241024124123@test.com

describe('Heroku App Sign Up', () => {
    it.skip('should sign up a new user_TC001', async () => {
        await Reporter.addLog(`Navigate to Thinking Tester Website`)
        await signUpPage.navigate()

        await objUtil.clickObject(signUpPage.signUpBtn)
        await expect(browser).toHaveUrl('https://thinking-tester-contact-list.herokuapp.com/addUser')

        await objUtil.setObjectValue(signUpPage.firstNameEdit, 'SampleFirstName')
        await objUtil.setObjectValue(signUpPage.lastNameEdit, 'SampleLastName')
        
        const dateToday = moment().format('YYYYMMDDHHmm')
        const email = `test_${dateToday}23@test.com`
        console.log(`Email: ${email}`)
        const password = 'SamplePassword'

        await objUtil.setObjectValue(signUpPage.emailEdit, email)
        await objUtil.setObjectValue(signUpPage.passwordEdit, password)

        await objUtil.clickObject(signUpPage.submitBtn)
        await expect(browser).toHaveUrl('https://thinking-tester-contact-list.herokuapp.com/contactList')
    })
})