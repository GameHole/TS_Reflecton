import { Type } from "./Type";

export class MemberInfo
{    
    protected type: Type;
    protected name: string;
    constructor(type: Type, name: string)
    {
        this.type = type;
        this.name = name;
    }
    get Name()
    {
        return this.type.Name + "." + this.name;
    }
}