'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Proyecto extends Model {
    user (){
        return this.belongsTo('App/Models/User')
    }
    homeworks (){
        return this.hasMany('App/Models/Homework')
    }
}

module.exports = Proyecto
