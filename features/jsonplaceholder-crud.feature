@api @posts
Feature: Posts CRUD against the JSONPlaceholder dummy API
  As an API tester
  I want to exercise GET, POST, PUT and DELETE endpoints
  So that I can showcase Playwright + Cucumber + Allure working together

  @get
  Scenario: GET an existing post
    When I send a GET request for post "1"
    Then the response status should be 200
    And the response body should have field "id" equal to 1
    And the response body should have a non-empty field "title"

  @post
  Scenario: POST creates a new post
    Given I have a new post payload
    When I send a POST request to create the post
    Then the response status should be 201
    And the response body should echo the sent "title"
    And the response body should have a non-empty field "id"

  @put
  Scenario: PUT updates an existing post
    Given I have an updated payload for post "1"
    When I send a PUT request to update the post
    Then the response status should be 200
    And the response body should echo the sent "title"
    And the response body should have field "id" equal to 1

  @delete
  Scenario: DELETE removes a post
    When I send a DELETE request for post "1"
    Then the response status should be 200

  @get @data-driven
  Scenario Outline: GET multiple posts by id
    When I send a GET request for post "<id>"
    Then the response status should be 200
    And the response body should have field "id" equal to <id>

    Examples:
      | id |
      | 2  |
      | 5  |
      | 10 |

      
