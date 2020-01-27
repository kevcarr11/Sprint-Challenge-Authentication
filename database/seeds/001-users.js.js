
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'Kevin', password: 'abc123'},
        {id: 2, username: 'Carlos', password: 'abc123'},
        {id: 3, username: 'Mary', password: 'password'}
      ]);
    });
};
