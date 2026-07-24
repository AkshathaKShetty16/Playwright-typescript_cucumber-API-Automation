@user
Feature: User Management
    As a user of the application
    I want to manage user accounts
    So that I can get create, update, and delete users

    @sanity
    Scenario: Get existing user details

        Given the user ID "users/2" exists
        When a GET request is made to fetch the user details
        Then the response status code should be 200
        And the response body should contain the user details "Janet"

    @expectedFailure
    Scenario Outline: Get existing user details with different authentication

        Given the user ID "users/2" exists
        And the request authentication is "<auth>"
        When a GET request is made to fetch the user details
        Then the response status code should be <status>

        Examples:
            | auth    | status |
            | missing | 401    |
            | invalid | 403    |

    @regression
    Scenario: Create a new user successfully

        Given the user has the create user payload
        When POST request is made to create the user with endpoint "/users" with payload
        Then the response status code should be 201
        And the response should contain the created user details

    Scenario Outline: Create user with different authentication

        Given the user has the create user payload
        And the request authentication is "<auth>"
        When POST request is made to create the user with endpoint "/users" with payload
        Then the response status code should be <status>


        Examples:
            | auth    | status |
            | missing | 401    |
            | invalid | 403    |

    @regression
    Scenario: Update an existing user

        Given the user ID "users/2" exists
        When PUT request is made to update the existing data
        Then the response status code should be 200
        And the response should contain the updated user data



    Scenario Outline: Update an existing user with different authentication

        Given the user ID "users/2" exists
        And the request authentication is "<auth>"
        When PUT request is made to update the existing data
        Then the response status code should be <status>


        Examples:
            | auth    | status |
            | missing | 401    |
            | invalid | 403    |


    Scenario: Delete an existing user
        Given the user ID "users/2" exists
        When DELETE request is made to the user deletion endpoint
        Then the response status code should be 204


    Scenario Outline: Delete an existing user with different authentication
        Given the user ID "users/2" exists
        And the request authentication is "<auth>"
        When DELETE request is made to the user deletion endpoint
        Then the response status code should be <status>

        Examples:
            | auth    | status |
            | missing | 401    |
            | invalid | 403    |