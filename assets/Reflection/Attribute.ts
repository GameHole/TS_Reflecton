import { DictionaryArray } from "./DictionaryArray";
import { Type } from "./Type";

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
    static AddAttributeInfo(attributeType:Function,proto: any, key: string, ...extra: any):void
    {
        let info = new AttributeInfo();
        info.attributeName = attributeType.name;
        info.type = new Type(proto);
        info.propertyName = key;
        info.extra = extra;
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