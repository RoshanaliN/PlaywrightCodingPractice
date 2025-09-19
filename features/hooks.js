import { Before, AfterStep, Status } from "@cucumber/cucumber"
import playwright from 'playwright';
import { POManager } from '../pageObjects/POManager.js';
import path from 'path';

Before(async function() {
        const browser = await playwright.chromium.launch({
            headless: false
        })
        const context = await browser.newContext()
        this.page = await context.newPage()
        this.poManager = new POManager(this.page)    
})

AfterStep( async function({result}){

    if(result.status === Status.FAILED){
        await this.page.screenshot({path: 'screenshot1.png'})
    }
})