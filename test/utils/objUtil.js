import Reporter from '../utils/reporter'
class objUtil {
    
    /**
     * @function clickObject @author cdimafelix_20241023
     * @description Click ELement
     * @param {Object} objELement
     * @returns <none>
     */
    async clickObject(objELement) {
        await Reporter.addLog(`Started Function: clickObject`)
        await objELement.waitForExist();
        await objELement.click();
        const strXpath = await objELement.selector;
        await Reporter.addLog(`Finished Function: clickObject - Success: ${strXpath}`)
    }


    /**
     * @function setObjectValue @author cdimafelix_20241023
     * @description Set Object Value
     * @param {Object} objELement
     * @returns <none>
     */
    async setObjectValue(objELement, strText) {
        await Reporter.addLog(`Started Function: setObjectValue`)
        await objELement.waitForExist()
        await objELement.setValue(strText)
        const strXpath = await objELement.selector;
        await Reporter.addLog(`Finished Function: setObjectValue - Success: ${strXpath}`)
    }

    /**
     * @function getObjectText @author cdimafelix_20241023
     * @description Get Object Text
     * @param {Object} objELement
     * @returns {String}
     */
    async getObjectText(objELement) {
        await Reporter.addLog(`Started Function: getObjectText`)
        await objELement.waitForExist()
        const strText = await objELement.getText()
        const strXpath = await objELement.selector;
        await Reporter.addLog(`Finished Function: getObjectText - Success: ${strXpath}`)
        return strText
    }


}

export default new objUtil()