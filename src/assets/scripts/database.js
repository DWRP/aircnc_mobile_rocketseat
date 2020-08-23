class Database{

    constructor(){
        this._database = this._loadData()
    }

    async _loadData(){
        return await fetch('./src/database/projects.json').then(async data=>await data.json())
    }

    async readData(){
        return this._database
    }
}