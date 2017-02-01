'use strict';

// in your app this would be require('targaryen/plugins/chai')
const targaryen = require('../../../plugins/chai');
const chai = require('chai');
const expect = chai.expect;
const users = targaryen.users;
const path = require('path');
const rules = targaryen.json.loadSync(path.join(__dirname, 'issue-113.json'));

chai.use(targaryen);

describe('multi location', function() {

  beforeEach(function() {
    targaryen.setFirebaseData(require('./data.json'));
    targaryen.setFirebaseRules(rules);
  });

  it('fails, not allow to write parent nodes', function() {
    expect(users.unauthenticated).cannot.patch({
      foo1: {requests: {foo2: true}},
      foo2: {requests: {foo1: true}}
    }).path('groupRelations');
  });

  it('works, targetting the right node', function() {
    expect(users.unauthenticated).can.patch({
      'foo1/requests/foo2': true,
      'foo2/requests/foo1': true
    }).path('groupRelations');
  });

});

