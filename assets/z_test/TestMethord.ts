import { TypeOf } from "../Reflection/Type";
import { Assert } from "./Assert";
import { UnitTest } from "./TestHelper";
class TestClass
{
    testField: number = 10;
    test():number
    {
        return 100;
    }
    testA(m:number):number
    {
        return 100 + m;
    }
}
export class TestClass1
{
    get testField(): number
    {
        return 10;
    }
    set testField(v: number)
    {
        
    }
}
export class TestMethord
{    
    @UnitTest
    test_invoke()
    {
        let type = TypeOf(TestClass);
        let mtn = type.GetMethord("test");
        Assert.IsEqual(100, mtn.Invoke(type.CreateInstance()));
    }
    @UnitTest
    test_invoke1()
    {
        let type = TypeOf(TestClass);
        let mtn = type.GetMethord("testA");
        Assert.IsEqual(200, mtn.Invoke(type.CreateInstance(),100));
    }
    @UnitTest
    test_invoke2()
    {
        let type = TypeOf(TestClass1);
        let mtn = type.GetMethord("testField");
        Assert.IsTrue(mtn==null);
    }
}