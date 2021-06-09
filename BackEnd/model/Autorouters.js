const Autorouter = require('../repository/Autorouter')
const {OTJSConflictException} = require('../Exceptions/OTJSErrors')

class Autorouters{
  static async createAutorouters(name,condition,rules,target,destination){
    const autorouter = await Autorouter.getOneByName(name)
    if(autorouter)throw new OTJSConflictException('This autorouter already exists !')
    return Autorouter.create(name,condition,rules,target,destination)
  }

  static async getAllAutorouters(){
    return await Autorouter.getAll()
  }

  static async getAutorouterById(id){
    return await Autorouter.getOneById(id)
  }

  static async switchRunning(id,running){
    return await Autorouter.modify(id,null,null,null,null,running,null)
  }

  static async modifyAutorouter(id,name=null,condition=null,rules=null,target=null,destination=null){
    return await Autorouter.modify(id,name,condition,rules,target,null,destination)
  }

  static async deleteAutorouter(id){
    return await Autorouter.delete(id)
  }
}

module.exports = Autorouters