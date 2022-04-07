import { MemberInfo } from "./MemberInfo";

export class MethordInfo extends MemberInfo
{    
    Invoke(inst: any, ...parm: any):any
    {
        if (Object.getPrototypeOf(inst) != this.type.getProto())
            throw "所提供的实例无法调用类型 " + this.type.Name + " 的方法";
        return inst[this.name](...parm);
    }
}