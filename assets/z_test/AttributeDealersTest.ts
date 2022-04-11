import { AttributeInfo, AttributeMgr } from "../Reflection/Attribute";
import { AttributeDealers, IAttributeDealer } from "../Reflection/AttributeDealers";
import { Type } from "../Reflection/Type";
import { Assert } from "./Assert";
import { Testfield } from "./AttributeTest";
import { UnitTest } from "./TestHelper";
class TestDealer implements IAttributeDealer
{
    tt: TTT2;
    get Attribute(): Function
    {
        return Testfield1;
    }
    Deal(array: AttributeInfo[]): void
    {
        array.forEach(n =>
        {
            let f = n.type.GetField(n.propertyName);
            if (f)
            {
                f.SetValue(this.tt, 100);
            }
        });
    }
}
class TestFunc implements IAttributeDealer
{
    get Attribute(): Function
    {
        return Testfield;
    }
    Deal(array: AttributeInfo[]): void
    {
        array.forEach(n =>
        {
            Assert.IsEqual("_d", n.propertyName);
        });
    }
}
export function Testfield1(fieldType:any)
{
    return function (p, k)
    {
        AttributeMgr.AddAttributeInfo(Testfield, p, k,fieldType);
    }
}
class TTT2
{
    @Testfield1(Number)
    _d: number;
}
export class AttributeDealersTest
{
    @UnitTest
    Test()
    {
        AttributeDealers.Add(TestFunc);
        AttributeDealers.Run();
    }
    @UnitTest
    TestDealer()
    {
        let d = new TestDealer();
        d.tt = new TTT2();
        Assert.IsEqual(Testfield1, d.Attribute);
        let info = new AttributeInfo(Testfield1, TTT2.prototype, "_d", [Number]);
        d.Deal([info]);
        Assert.IsEqual(100, d.tt._d);
        
    }
}