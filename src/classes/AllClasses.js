export class Human {
    constructor(id,name){
        this.id =id;
        this.name =name;
    }
}

export class Employee extends  Human{
    constructor(id,name, timeSkipped,type){
        super(id,name);
        this.timesSkipped = timeSkipped;
        this.type = type;
    }

    get toString(){
        return `${this.name} ${this.timesSkipped} ${this.type}`;
    }

}

export const EMPLOYEE_TYPE = {
    DEV:'DEV',
    SYSADMIN:'SYSADMIN'
}
