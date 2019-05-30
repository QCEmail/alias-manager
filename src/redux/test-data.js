export const TEST_ADMIN = {
  type: 'admin',
  displayname: 'Admin God',
  mailbox: 'admin@test.com',
  userid: 1,
  username: 'admin',
};

export function testUser(username) {
  return {
    type: 'user',
    displayname: 'User Dude',
    mailbox: `${username}@test.com`,
    userid: 2,
    username,
  };
}

export const TEST_ALIASES = [{
  address: 'alias1@test.com',
  status: 'active',
  notes: '',
},{
  address: 'alias2@test.com',
  status: 'active',
  notes: '',
},{
  address: 'alias3@test.com',
  status: 'active',
  notes: '',
},{
  address: 'alias4@test.com',
  status: 'active',
  notes: 'this is a really awesome website that I love',
},{
  address: 'alias5@testing.com',
  status: 'disabled',
  notes: 'spammer got a hold of this',
}];
