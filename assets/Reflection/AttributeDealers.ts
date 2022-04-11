import { AttributeInfo, AttributeMgr } from "./Attribute";

export abstract class IAttributeDealer
{
    abstract get Attribute(): Function;
    abstract Deal(array:Array<AttributeInfo>): void;
}
export class AttributeDealers
{
    private static dealers: Array<IAttributeDealer> = new Array<IAttributeDealer>();
    static Add<T extends IAttributeDealer>(type: {new():T})
    {
        this.dealers.push(new type());
    }
    static Run()
    {
        this.dealers.forEach(d =>
        {
            try
            {
                if (d.Attribute == undefined)
                {
                    d.Deal(null);
                } else
                {
                    let infos = AttributeMgr.getAttributeInfo(d.Attribute);
                    if (infos)
                    {
                        d.Deal(infos);
                    }
                }
            } catch (err)
            {
                console.error(err);
            }
        });
        this.dealers = undefined;
    }
}