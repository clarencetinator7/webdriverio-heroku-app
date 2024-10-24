import reporter from "../utils/reporter.js"
import loginPage from "../pageobjects/heroku_app_login.page.js"
import contactPage from "../pageobjects/heroku_app_contact.page.js"
import objUtil from "../utils/objUtil.js"
import file from "../utils/file.js"

const SAMPLE_DATA = [
    {
        firstName: 'Arthur',
        lastName: 'Morgan',
        birthDate: '1873-07-10',
        email: 'arthurmorgan1873@gmail.com',
        phone: '0987654321',
        street1: 'Valentine',
        street2: 'Cumberland Forest',
        city: 'New Hanover',
        state: 'West Elizabeth',
        postalCode: '54321',
        country: 'USA'
    },
    {
        firstName: 'Geralt',
        lastName: 'Rivia',
        birthDate: '1230-05-20',
        email: 'geraltrivia@gmail.com',
        phone: '1357924680',
        street1: 'Kaer Morhen',
        street2: 'Vizima',
        city: 'Temeria',
        state: 'Northern Kingdoms',
        postalCode: '67890',
        country: 'Aedirn'
    },
    {
        firstName: 'Luke',
        lastName: 'Skywalker',
        birthDate: '1977-05-25',
        email: 'lukeskywalker1977@gmail.com',
        phone: '1234567890',
        street1: 'Tatooine',
        street2: 'Mos Eisley',
        city: 'Galactic City',
        state: 'Outer Rim',
        postalCode: '12345',
        country: 'Naboo'
    },
]

describe('Heroku App Contacts', () => {
    it('should add new contacts_TC003', async () => {
        await reporter.addLog(`Navigate to Thinking Tester Website`)
        await loginPage.navigate()
        await loginPage.login()
        await expect(browser).toHaveUrl('https://thinking-tester-contact-list.herokuapp.com/contactList')

        for (const USER_DATA of SAMPLE_DATA) {
            await objUtil.clickObject(contactPage.addContactBtn)
            await expect(browser).toHaveUrl('https://thinking-tester-contact-list.herokuapp.com/addContact')

            await objUtil.setObjectValue(contactPage.firstNameEdit, USER_DATA.firstName)
            await objUtil.setObjectValue(contactPage.lastNameEdit, USER_DATA.lastName)
            await objUtil.setObjectValue(contactPage.birthDateEdit, USER_DATA.birthDate)
            await objUtil.setObjectValue(contactPage.emailEdit, USER_DATA.email)
            await objUtil.setObjectValue(contactPage.phoneEdit, USER_DATA.phone)
            await objUtil.setObjectValue(contactPage.street1Edit, USER_DATA.street1)
            await objUtil.setObjectValue(contactPage.street2Edit, USER_DATA.street2)
            await objUtil.setObjectValue(contactPage.cityEdit, USER_DATA.city)
            await objUtil.setObjectValue(contactPage.stateEdit, USER_DATA.state)
            await objUtil.setObjectValue(contactPage.postalCodeEdit, USER_DATA.postalCode)
            await objUtil.setObjectValue(contactPage.countryEdit, USER_DATA.country)

            await objUtil.clickObject(contactPage.submitBtn)
            await expect(browser).toHaveUrl('https://thinking-tester-contact-list.herokuapp.com/contactList')  
        };

        // Verify the contacts
        const tableRows = await contactPage.tableRows
        await expect(tableRows).toBeElementsArrayOfSize(SAMPLE_DATA.length)

        for (let i=0; i<SAMPLE_DATA.length; i++) {
            await expect(contactPage.tableRows[i].$('./td[2]')).toHaveText(`${SAMPLE_DATA[i].firstName} ${SAMPLE_DATA[i].lastName}`)
            await expect(contactPage.tableRows[i].$('./td[3]')).toHaveText(SAMPLE_DATA[i].birthDate)
            await expect(contactPage.tableRows[i].$('./td[4]')).toHaveText(SAMPLE_DATA[i].email)
            await expect(contactPage.tableRows[i].$('./td[5]')).toHaveText(SAMPLE_DATA[i].phone)
            await expect(contactPage.tableRows[i].$('./td[6]')).toHaveText(`${SAMPLE_DATA[i].street1} ${SAMPLE_DATA[i].street2}`)
            await expect(contactPage.tableRows[i].$('./td[7]')).toHaveText(`${SAMPLE_DATA[i].city} ${SAMPLE_DATA[i].state} ${SAMPLE_DATA[i].postalCode}`)
            await expect(contactPage.tableRows[i].$('./td[8]')).toHaveText(SAMPLE_DATA[i].country)
        }
    })

    it('should successfully edit a contact_TC004', async () => {
        await reporter.addLog(`Navigate to Thinking Tester Website`)
        await loginPage.navigate()
        await loginPage.login()
        await expect(browser).toHaveUrl('https://thinking-tester-contact-list.herokuapp.com/contactList')

        await objUtil.clickObject(contactPage.firstRow)
        await expect(browser).toHaveUrl('https://thinking-tester-contact-list.herokuapp.com/contactDetails')
        
        await objUtil.clickObject(contactPage.editContactBtn)
        await expect(browser).toHaveUrl('https://thinking-tester-contact-list.herokuapp.com/editContact')

        const newPostal = Math.floor(1000 + Math.random() * 9000)

        await contactPage.postalCodeEdit.click();
        // Clear the value of the postal code field
        await browser.execute(s => {
            s.value = null;
        },contactPage.postalCodeEdit);
        await contactPage.postalCodeEdit.setValue(newPostal);

        await objUtil.clickObject(contactPage.submitBtn)
        await objUtil.clickObject(contactPage.returnBtn)
        await expect(browser).toHaveUrl('https://thinking-tester-contact-list.herokuapp.com/contactList')

        await expect(contactPage.firstRow.$('./td[7]')).toHaveText(expect.stringContaining(newPostal.toString()))
    })

    it('should successfully delete a contact_TC005', async () => {
        await reporter.addLog(`Navigate to Thinking Tester Website`)
        await loginPage.navigate()
        await loginPage.login()
        await expect(browser).toHaveUrl('https://thinking-tester-contact-list.herokuapp.com/contactList')

        await objUtil.clickObject(contactPage.lastRow)

        await expect(browser).toHaveUrl('https://thinking-tester-contact-list.herokuapp.com/contactDetails')

        await objUtil.clickObject(contactPage.deleteContactBtn)
        await browser.acceptAlert()

        await expect(browser).toHaveUrl('https://thinking-tester-contact-list.herokuapp.com/contactList')
        
    })

    it('should successfully export the contact on a text file_TC006', async () => {
        await reporter.addLog(`Navigate to Thinking Tester Website`)
        await loginPage.navigate()
        await loginPage.login()
        await expect(browser).toHaveUrl('https://thinking-tester-contact-list.herokuapp.com/contactList')

        const exportSavePath = '/home/citco/robot-framework/webdriver-app/contact-details';
    
        await $('//table/tr').waitForExist({timeout: 5000})

        const rows = await $$('/html/body/div/div/table/tr');
        const rowsCount = await rows.length;

        for (let i = 0; i < rowsCount; i++) {
            const contact = contactPage.tableRows[i].$$('td');

            const contactDetails = await contact.map(async (element) => {
                return await element.getText();
            });

            const contactDetailsString = contactDetails.join(' | ');

            file.createTxtFile(`${exportSavePath}/contact-details`, `${contactDetailsString}`)
        }

        

        

    })


})