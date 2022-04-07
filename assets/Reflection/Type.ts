import { FieldInfo } from "./FieldInfo";
import { MethordInfo } from "./MethordInfo";
import { PropertyInfo } from "./PropertyInfo";
export function TypeOf(type: any): Type
{
    return new Type(type.prototype);
}
export class Type
{    
    private _prototype: any;
    
    constructor(type:any)
    {
        this._prototype = type;
    }
    getProto(): any
    {
        return this._prototype;
    }
    CreateInstance(...pama:any): any
    {
        let proto = this.getProto();
        return new proto.constructor(...pama);
    }
    // getCustomAttribute(attriName:string):Attribute
    // {
        
    // }
    GetMethord(methordName: string): MethordInfo
    {
        let pto = this.getProto();
        let func = pto[methordName];
        if (func == undefined || !this.isFunction(func))
            return null;
        return new MethordInfo(this, methordName);
    }
    GetMethords(): Array<MethordInfo>
    {
        let res = new Array<MethordInfo>();
        let proto = this.getProto();
        for (let key of Reflect.ownKeys(proto))
        {
            if (key == "constructor") continue;
            if (this.isFunction(proto[key]))
                res.push(new MethordInfo(this, key as string));
        }
        return res;
    }
    private isFunction(func: any)
    {
        if (func == undefined)
            return false;
        let fStr: string = func.toString();
        return fStr.indexOf("{") > 0;
    }
    GetPropertity(propertityName:string): PropertyInfo
    {
        let pto = this.getProto();
        if (!Reflect.has(pto,propertityName) || this.isFunction(pto[propertityName]))
            return null;
        return new PropertyInfo(this, propertityName);
    }
    GetPropertitys():Array<PropertyInfo>
    {
        let res = new Array<PropertyInfo>();
        let proto = this.getProto();
        for (let key of Reflect.ownKeys(proto))
        {
            if (key == "constructor") continue;
            if (!this.isFunction(proto[key]))
                res.push(new PropertyInfo(this, key as string));
        }
        return res;
    }
    GetField(propertityName:string): FieldInfo
    {
        let pto = this.CreateInstance();
        if (!Reflect.has(pto,propertityName) || this.isFunction(pto[propertityName]))
            return null;
        return new PropertyInfo(this, propertityName);
    }
    GetFields():Array<FieldInfo>
    {
        let res = new Array<FieldInfo>();
        let pto = this.CreateInstance();
        for (let key of Reflect.ownKeys(pto))
        {
            if (!this.isFunction(pto[key]))
                res.push(new FieldInfo(this, key as string));
        }
        return res;
    }
    get Name(): string
    {
        return this.getProto().constructor.name;
    }
}