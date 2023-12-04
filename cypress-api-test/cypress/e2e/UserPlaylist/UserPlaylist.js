import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

let response;

When('I make an API request as a free user', () => {
    cy.request('GET', 'https://a8e38tulbj.execute-api.eu-west-2.amazonaws.com/api/playlists/free')
      .then((res) => {
          response = res;
      });
});

Then('I should receive the correct playlists', () => {
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property('playlists');
    expect(response.body.playlists).to.be.an('array');

    // Check if "Premium" playlist is not included
    const premiumPlaylist = response.body.playlists.find(playlist => playlist.name === 'Premium');
    expect(premiumPlaylist).to.be.undefined;
});


//Premium User Access Play List
When('I request my play lists', () => {
    cy.request('GET', 'https://a8e38tulbj.execute-api.eu-west-2.amazonaws.com/api/playlists/premium')
      .then((res) => {
          response = res;
      });
});

Then('I should see the "Premium" playlist in the response', () => {
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property('playlists');
    expect(response.body.playlists).to.be.an('array');

    // Check for the presence of the "Premium" playlist
    const premiumPlaylist = response.body.playlists.find(playlist => playlist.name === 'Premium');
    expect(premiumPlaylist).to.not.be.undefined;
});


//Unknown User Access Playlist
When('I request playlists for this user type', () => {
    cy.request({
        method: 'GET',
        url: 'https://a8e38tulbj.execute-api.eu-west-2.amazonaws.com/api/playlists/plus',
        failOnStatusCode: false // to prevent Cypress from failing the test on 400 response
    }).then((res) => {
        response = res;
    });
});

Then('I should receive a HTTP 400 Bad Request response', () => {
    expect(response.status).to.eq(400);
});

Then('the response message should indicate an "Unknown user type"', () => {
    expect(response.body.messsage).to.eq('Unknown user type');
});