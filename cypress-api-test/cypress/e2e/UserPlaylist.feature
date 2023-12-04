Feature: Free User Access to Playlists, Check Premium User Playlist Access And Validate Playlist API Response for Invalid User Types


  Scenario: Free user requests playlists
    When I make an API request as a free user
    Then I should receive the correct playlists

  Scenario: Premium user accesses play lists
    When I request my play lists
    Then I should see the "Premium" playlist in the response


  Scenario: Request play lists with an unknown user type
    When I request playlists for this user type
    Then I should receive a HTTP 400 Bad Request response
    And the response message should indicate an "Unknown user type"