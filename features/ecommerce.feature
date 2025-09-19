Feature: Ecommerce scenarios

Scenario: Placing an order
Given user loging in to ecommerce application using "rexw12345@gmail.com" and "Test@123"
When add "ADIDAS ORIGINAL" product to cart
Then verify "ADIDAS ORIGINAL" is displayed in cart
# When enter valid details and place order
# Then verify order is present in order history