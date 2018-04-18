
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('employees', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('email');
      table.string('job');
      table.string('salary');
      table.string('notes');
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users');
    }),
  ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
	knex.schema.dropTable('employees'),
    ]);  
};
