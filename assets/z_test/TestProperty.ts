import { TypeOf } from "../Reflection/Type";
import { Assert } from "./Assert";
import { UnitTest } from "./TestHelper";
class TestM
{
    test(){}
}
export class TestClass
{
    _p: number = 10;
    get testP(): number
    {
        return this._p;
    }
    set testP(v: number)
    {
        this._p = v;
    }
}
export class TestClass1
{
    _p: TestM;
    get testP(): TestM
    {
        return this._p;
    }
    set testP(v: TestM)
    {
        this._p = v;
    }
}
export class TestProperty
{    
    @UnitTest
    test_getvalue()
    {
        console.log(TestClass.prototype);
        let type = TypeOf(TestClass);
        let p = type.GetPropertity("testP");
        let d = p.GetValue(type.CreateInstance());
        Assert.IsEqual(10, d);
    }
    @UnitTest
    test_setvalue()
    {
        let type = TypeOf(TestClass);
        let p = type.GetPropertity("testP");
        let inst = type.CreateInstance();
        p.SetValue(inst, 100);
        Assert.IsEqual(100, p.GetValue(inst));
    }
    @UnitTest
    test_getvalue1()
    {
        console.log(TestClass.prototype);
        let type = TypeOf(TestClass1);
        let p = type.GetPropertity("testP");
        let d = p.GetValue(type.CreateInstance());
        Assert.IsEqual(undefined, d);
    }
    @UnitTest
    test_setvalue1()
    {
        let type = TypeOf(TestClass1);
        let p = type.GetPropertity("testP");
        let inst = type.CreateInstance();
        let s = new TestM();
        console.log(s);
        p.SetValue(inst, s);
        Assert.IsEqual(s, p.GetValue(inst));
    }
}