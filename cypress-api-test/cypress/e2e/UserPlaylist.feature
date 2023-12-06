Feature: Free User Access to Playlists, Check Premium User Playlist Access And Validate Playlist API Response for Invalid User Types


  Scenario: Free user requests playlists
    When I make an API request as a free user
    Then I should receive a 200 OK response

  Scenario: Premium user accesses playlists
    When I request my playlists
    Then I should receive a 200 OK response


  Scenario: Request play lists with an unknown user type
    When I request playlists for this user type
    Then I should receive a HTTP 400 Bad Request response
    And the response message should indicate an "Unknown user type"