import {When, Then } from 'cypress-cucumber-preprocessor/steps';
const { BASE_URL } = require('../../../config');

let response;

//Free User Access Test
When('I make an API request as a free user', () => {
    cy.request(`${BASE_URL}/free`)
      .then((res) => {
          response = res;
      });
});

Then('I should receive a {string} response', (statusCode) => {
    expect(response.status).to.eq(parseInt(statusCode));
});

//Premium User Access Test
When('I request my playlists', () => {
    cy.request(`${BASE_URL}/premium`)
      .then((res) => {
          response = res;
      });
});

Then('I should receive a {string} response back', (statusCode) => {
    expect(response.status).to.eq(parseInt(statusCode));
});

//Unknown User Access Playlist
When('I request playlists for this user type', () => {
    cy.request({
        method: 'GET',
        url: `${BASE_URL}/plus`,
        failOnStatusCode: false
    }).then((res) => {
        response = res;
    });
});

Then('I should receive a HTTP {string} Bad Request response', () => {
    expect(response.status).to.eq(400);
});

Then('the response message should indicate an "Unknown user type"', () => {
    expect(response.body.messsage).to.eq('Unknown user type');
});