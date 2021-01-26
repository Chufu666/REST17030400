'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HomeworkSchema extends Schema {
  up () {
    this.create('homework', (table) => {
      table.increments()
      table.integer('proyecto_id').unsigned().references('id').inTable('proyectos')
      table.string('descripcion', 255).notNullable()
      table.boolean('completada').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('homework')
  }
}

module.exports = HomeworkSchema
