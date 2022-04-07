import { DictionaryArray } from "./DictionaryArray";
import { Type } from "./Type";

export class Attribute
{    
    name: string;
}
export class AttributeInfo
{   
    attributeName: string;
    type: Type;
    propertyName: string;
    extra: any[];
}
export class AttributeMgr
{
    private static _infos: DictionaryArray<string,AttributeInfo> = new DictionaryArray<string, AttributeInfo>();
    private static _keys: Array<string> = [];
    static AddAttributeInfo(attributeName:string,proto: any, key: string, ...extra: any):void
    {
        let info = new AttributeInfo();
        info.attributeName = attributeName;
        info.type = new Type(proto);
        info.propertyName = key;
        info.extra = extra;
        if (this._infos.add(attributeName, info))
            this._keys.push(attributeName);
    }
    static getAttributeInfo(attributeName:string): Array<AttributeInfo>
    {
        return this._infos.getValues(attributeName);
    }
    static Foreach(f:( attributeName:string,array:Array<AttributeInfo>)=>void):void
    {
        this._keys.forEach(k =>
        {
            f(k, this.getAttributeInfo(k));
        });
    }
}