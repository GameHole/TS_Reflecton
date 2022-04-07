import { MemberInfo } from "./MemberInfo";

export class PropertyInfo extends MemberInfo
{    
    GetValue(inst: any):any
    {
        this.checkProto(inst);
        return inst[this.name];
    }
    private checkProto(inst: any)
    {
        if (Object.getPrototypeOf(inst) != this.type.getProto())
            throw "所提供的实例无法设置类型 " + this.type.Name + " 的属性";
    }

    SetValue(inst: any,value:any):void
    {
        this.checkProto(inst);
        inst[this.name] = value;
    }
    
}