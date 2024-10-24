import objUtil from "../utils/objUtil"
class Page {

    get submitBtn() {return $('//button[@id="submit"]')}
    get emailEdit() {return $('//input[@id="email"]')}
    get passwordEdit() {return $('//input[@id="password"]')}
    get contactListHeaderElm() {return $('/html/body/div/header/h1')}

    async navigate() {
        await browser.url('https://thinking-tester-contact-list.herokuapp.com/')
    }

    async login(email="test_20241024124123@test.com", password="SamplePassword") {
        await objUtil.setObjectValue(this.emailEdit, email)
        await objUtil.setObjectValue(this.passwordEdit, password)
        await objUtil.clickObject(this.submitBtn)
    }
}

export default new Page()