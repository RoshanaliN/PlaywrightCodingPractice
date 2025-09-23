const base = require('@playwright/test')

exports.test = base.test.extend({
    testDataForOrder: {
        userName: "rexw12345@gmail.com",
        password: "Test@123",
        productName: "ADIDAS ORIGINAL"

    }
})