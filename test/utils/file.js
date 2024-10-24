import fs from 'fs'
import moment from 'moment'

class File {
    async createTxtFile(strPath, strText) {
        fs.writeFileSync(`${strPath}.txt`, `${strText} \n`, {flag: 'a+'}, (err) => {
            if (err) {
                console.error(err);
            }
        });
    }

    async appendTxtFile(strPath, strText) {
        const strDateTime = moment().format('YYYY-MM-DD_HH:mm:ss')
        await fs.appendFile(`${strPath}.txt`, `[${strDateTime}] - ${strText}\n`, { flag: 'a+' }, async (err) => {if(err) throw err})
    }

    async deleteFolderContents(strFolder) {
        const arrDir = await fs.readdirSync(strFolder)
        for (const strFile of arrDir) {
            await fs.unlinkSync(`${strFolder}/${strFile}`)
        }
    }

}

export default new File()