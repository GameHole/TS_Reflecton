import { AttributeMgr } from "../Reflection/Attribute";
import { Assert } from "./Assert";
import { UnitTest } from "./TestHelper";
function TestAttribute(type:any)
{
    return function (p, k)
    {
        AttributeMgr.AddAttributeInfo("TestAttribute", p, k,type);
    }
}
function Testfield(fieldType:any)
{
    return function (p, k)
    {
        AttributeMgr.AddAttributeInfo("Testfield", p, k,fieldType);
    }
}
class TTT
{
    
}
class TTT1
{
    @Testfield(Number)
    _d: number;
}
export class AttributeTest
{
    @TestAttribute(TTT)
    @UnitTest
    testd()
    {
        //AttributeMgr.AddAttributeInfo("test", AttributeTest.prototype, "TestAdd");
        let res = AttributeMgr.getAttributeInfo("TestAttribute");
        Assert.IsEqual(1, res.length);
        let info = res[0];
        Assert.IsEqual("TestAttribute", info.attributeName);
        Assert.IsEqual("testd", info.propertyName);
        Assert.IsEqual(AttributeTest.prototype, info.type.getProto());
        Assert.IsEqual(1, info.extra.length);
        Assert.IsEqual(TTT, info.extra[0]);
    }
    

    @UnitTest
    testu()
    {
        
        let infos = AttributeMgr.getAttributeInfo("Testfield");
        infos.forEach(info =>
        {
            let p = info.type.GetField(info.propertyName);
            let inst = info.type.CreateInstance();
            p.SetValue(inst, 100);
        });
    }
}