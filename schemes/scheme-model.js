const db = require('../data/db-config');

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
}

function find() {
    return db('schemes');
}

function findById(id) {
    return db('schemes')
      .where({ id })
      .first();
}

function findSteps(id) {
    return db.select('steps.id', 'steps.step_number', 'steps.instructions', 'schemes.scheme_name')
      .from('steps')
      .join('schemes', 'steps.scheme_id', 'schemes.id')
      .where('scheme_id', id)
      .orderBy('step_number');
}

function add(scheme) {
    return db('schemes')
      .insert(scheme)
      .then(ids => findById(ids[0]));
}

function update(changes, id) {
    return db('schemes')
      .where({ id })
      .update(changes)
      .then(() => findById(id));
}

function remove(id) {
    return db('schemes')
      .where({ id })
      .delete()
}