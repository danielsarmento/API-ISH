const ExcelJS = require('exceljs')


async function createExcel() {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Teste de Folha', {properties:{tabColor:{argb:'FFC0000'}}})
    
    sheet.addRow(["Id", "Email", "Username", "Password", "Hashed Password"]);
    
    try{
        await workbook.xlsx.writeFile("estudoXLSX.xlsx")
    
    } catch (err){
        console.log(err)
    }
}

createExcel()