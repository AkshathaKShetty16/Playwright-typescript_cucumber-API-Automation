Feature: User Management
    # As a user of the application
    # I want to manage user accounts
    # So that I can get create, update, and delete users

    Scenario: Get existing user details
        Given I have valid user data
        When GET request is made to fetch the user details with the user ID "2"
        Then the response status code should be 200
        And the response body should contain the user details "Janet"


    # Scenario: Create a new user
    #     Given I have valid user data 
    #     When I send a POST request to the user creation endpoint
    #     Then the response status code should be 201
    #     And the response body should contain the created user's details
    
    # Scenario: Update an existing user
    #     Given I have an existing user ID and updated user data
    #     When I send a PUT request to the user update endpoint with the user ID
    #     Then the response status code should be 200
    #     And the response body should contain the updated user's details
    
    # Scenario: Delete an existing user
    #     Given I have an existing user ID
    #     When I send a DELETE request to the user deletion endpoint with the user ID
    #     Then the response status code should be 204