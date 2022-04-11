import { DictionaryArray } from "./DictionaryArray";
import { Type } from "./Type";

export class AttributeInfo
{   
    readonly attributeName: string;
    readonly type: Type;
    readonly propertyName: string;
    readonly extra: any[];
    constructor(attributeName: Function,proto: any,propertyName: string,extra: any[])
    {
        this.attributeName = attributeName.name;
        this.type = new Type(proto);
        this.propertyName = propertyName;
        this.extra = extra;
    }
}
export class AttributeMgr
{
    private static _infos: DictionaryArray<string,AttributeInfo> = new DictionaryArray<string, AttributeInfo>();
    private static _keys: Array<string> = [];
    static AddAttributeInfo(attributeType:Function,proto: any, key: string, ...extra: any):void
    {
        let info = new AttributeInfo(attributeType, proto, key, extra);
        if (this._infos.add(attributeType.name, info))
            this._keys.push(attributeType.name);
    }
    static getAttributeInfo(attributeType:Function): Array<AttributeInfo>
    {
        return this._infos.getValues(attributeType.name);
    }
    static Foreach(f:(attributeName:string,array:Array<AttributeInfo>)=>void):void
    {
        this._keys.forEach(k =>
        {
            f(k, this._infos.getValues(k));
        });
    }
}