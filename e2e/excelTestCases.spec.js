const ExcelJs = require('exceljs')
import { test, expect } from '@playwright/test';

async function writeExcel(searchText, path, replaceWith, change) {
    const workbook = new ExcelJs.Workbook();

    await workbook.xlsx.readFile(path)
    const sheet1 = workbook.getWorksheet('Sheet1');
    let output = await readExcel(sheet1, searchText);
    const cell = sheet1.getCell(output.row + change.rowChange, output.column + change.columnChange)
    cell.value = replaceWith;
    await workbook.xlsx.writeFile(path);
}

async function readExcel(worksheet, searchText) {
    let output = { row: -1, column: -1 };
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, cellNumber) => {
            if (cell.value === searchText) {
                output.row = rowNumber;
                output.column = cellNumber;
            }
        })
    })
    return output;
}

test('upload_download_excel', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html')
    const downloadPromise = page.waitForEvent('download')
    await page.getByRole('button', { name: 'Download' }).click();
    await downloadPromise;
    writeExcel('Apple', 'C:\\Users\\rosha\\Downloads\\download.xlsx', 350, { rowChange: 0, columnChange: 2 });
    await page.locator('#fileinput').setInputFiles('C:\\Users\\rosha\\Downloads\\download.xlsx')
    await expect(page.locator('div[role=row]').filter({hasText:'Apple'}).locator('div[data-column-id="4"]')).toHaveText('350')
})