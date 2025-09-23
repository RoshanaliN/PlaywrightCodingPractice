function needs to be marked as async to use await in the functions.
await is used for syncronus execution of all steps in serial fashion.
Fixture are global variable. to have playwright fixtures we enclose browser with {}
multiple spec files will run parallels but test in the spec file will run serially
test.only allows you to run only that test skipping all other test while running them from npx playwright test command
wrap multiple step to run in parallel using promise.all
default execution time is 5 sec in cucumber but we can override it
use npx playwright test --ui to launch the test runner
@tag should be part of test case name in mocha and playwright. Use --grep @tagName to run the test cases based on the tags
Allure Report: npm install -D allure-playwright
npx playwright test --config playwright.config1.js --project=chromium --grep '@Web' --reporter=line,allure-playwright
npx allure generate ./allure-results --clean
npx allure open ./allure-report