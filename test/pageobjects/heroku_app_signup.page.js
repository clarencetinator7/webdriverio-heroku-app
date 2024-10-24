class Page {

    get signUpBtn() {return $('//button[@id="signup"]')}
    get firstNameEdit() {return $('//input[@id="firstName"]')}
    get lastNameEdit() {return $('//input[@id="lastName"]')}
    get emailEdit() {return $('//input[@id="email"]')}
    get passwordEdit() {return $('//input[@id="password"]')}
    get submitBtn() {return $('//button[@id="submit"]')}


    async navigate() {
        await browser.url('https://thinking-tester-contact-list.herokuapp.com/')
    }
}

export default new Page()