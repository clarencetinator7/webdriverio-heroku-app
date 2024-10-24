import objUtil from "../utils/objUtil"
class Page {

    get addContactBtn() { return $('//button[@id="add-contact"]') }
    get submitBtn() { return $('//button[@id="submit"]') }
    get editContactBtn() { return $('//button[@id="edit-contact"]') }
    get deleteContactBtn() { return $('//button[@id="delete"]') }
    get returnBtn() { return $('//button[@id="return"]') }
    get firstNameEdit() { return $('//input[@id="firstName"]') }
    get lastNameEdit() { return $('//input[@id="lastName"]') }
    get birthDateEdit() { return $('//input[@id="birthdate"]') }
    get emailEdit() { return $('//input[@id="email"]') }
    get phoneEdit() { return $('//input[@id="phone"]') }
    get street1Edit() { return $('//input[@id="street1"]') }
    get street2Edit() { return $('//input[@id="street2"]') }
    get cityEdit() { return $('//input[@id="city"]') }
    get stateEdit() { return $('//input[@id="stateProvince"]') }
    get postalCodeEdit() { return $('//input[@id="postalCode"]') }
    get countryEdit() { return $('//input[@id="country"]') }
    get tableRows() { return $$('//table[@class="contactTable"]/tr') }
    get lastRow() { return $('//table[@class="contactTable"]/tr[last()]') }
    get firstRow() { return $('//table[@class="contactTable"]/tr[1]') }
    
}

export default new Page()