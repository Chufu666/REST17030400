'use strict'

const Proyecto = use('App/Models/Proyecto');
const Homework = use('App/Models/Homework');
const AutorizacionService = use('App/Services/AutorizacionService');

class TareaController {
    async index({ auth, reques, params}){
        const user = await auth.getUser();
        const { id } = params;
        const proyecto = await Proyecto.find(id);
        AutorizacionService.verificarPermiso(proyecto, user);
        return await proyecto.homeworks().fetch();

    }
    
    async create({ auth, request, params }){
        const user = await auth.getUser();
        const { descripcion } = request.all();
        const { id } = params;
        const proyecto = await Proyecto.find(id);
        AutorizacionService.verificarPermiso(proyecto, user);
        const tarea = new Homework();
        tarea.fill({
            descripcion
        });
        await proyecto.homeworks().save(tarea);
        return tarea;
    }

    async update({ auth, params, request }){
        const user = await auth.getUser();
        const { id } = params;
        const tarea = await Homework.find(id);
        const proyecto = await tarea.proyecto().fetch();
        AutorizacionService.verificarPermiso(proyecto, user);
        tarea.merge(request.only([
            'descripcion', 
            'completada'
        ])) 
        await tarea.save();
        return tarea;    
    }

    async destroy({ auth, params }){
        const user = await auth.getUser();
        const { id } = params;
        const tarea = await Homework.find(id);
        const proyecto = await tarea.proyecto().fetch();
        AutorizacionService.verificarPermiso(proyecto, user);
        await tarea.delete();
        return tarea;    
    }

}

module.exports = TareaController
