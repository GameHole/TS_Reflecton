
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
    testA():number
    {
        return 100;
    }
    testB():number
    {
        return 100;
    }
    testC():number
    {
        return 100;
    }
}
class TestClass1
{
    testField: number = 10;
    constructor(tt: number)
    {
        this.testField += tt;
    }
}
class TestClass2
{
    get testField(): number
    {
        return 10;
    }
    set testField(v: number)
    {
        
    }
}
class TestClass3
{
    get testField0(): number{return 1;}
    get testField1(): number{return 1;}
    get testField2(): number{return 1;}
    get testField3(): number{return 1;}
    get testField4(): number{ return 1; }
    test0():number
    {
        return 100;
    }
    test1():number
    {
        return 100;
    }
    test2():number
    {
        return 100;
    }
}
class TestClass4
{
    constructor(d:any,d1:any)
    {
        this._m = d;
    }
    _m: number;
    get testField(): number
    {
        return this._m;
    }
    set testField(v: number)
    {
        this._m = v;
    }
}
abstract class TestAss0
{
    abstract Test();
}
abstract class TestAssGS
{
    abstract get test(): number;
}
class TestAss1 implements TestAss0
{
    Test()
    {
        throw new Error("Method not implemented.");
    }
}
class TestAss2 extends TestAss0
{
    Test()
    {
        throw new Error("Method not implemented.");
    }
    Test1()
    {
        
    }
}
class TestAss3 extends TestAss2
{
    
}
export class TestType
{    
    @UnitTest
    test_TypeOf()
    {
        let type = TypeOf(TestClass);
        Assert.IsTrue(type != null);
        Assert.IsTrue(type.Name=="TestClass");
    }
    @UnitTest
    test_TypeOf1()
    {
        let type = TypeOf(new TestClass());
        Assert.IsTrue(type != null);
        Assert.IsTrue(type.Name=="TestClass");
    }
    @UnitTest
    test_Name()
    {
        let type = TypeOf(TestClass);
        Assert.IsEqual("TestClass", type.Name);
    }
    @UnitTest
    test_CreateInstance()
    {
        let type = TypeOf(TestClass);
        let inst = type.CreateInstance() as TestClass;
        Assert.IsTrue(inst != null);
        Assert.IsEqual(10,inst.testField);
    }
    @UnitTest
    test_CreateInstance1()
    {
        let type = TypeOf(TestClass1);
        let inst = type.CreateInstance(100) as TestClass1;
        Assert.IsTrue(inst != null);
        Assert.IsEqual(110,inst.testField);
    }
    @UnitTest
    test_getMethord()
    {
        let type = TypeOf(TestClass);
        let meh = type.GetMethord("test");
        Assert.IsTrue(meh != null);
    }
    @UnitTest
    test_getMethord1()
    {
        let type = TypeOf(TestClass);
        let meh = type.GetMethord("test1");
        Assert.IsTrue(meh == null);
    }
    @UnitTest
    test_getMethords()
    {
        let type = TypeOf(TestClass);
        let meh = type.GetMethords();
        Assert.IsEqual(4, meh.length);
        let expf = ["TestClass.test", "TestClass.testA", "TestClass.testB", "TestClass.testC"];
        let exp = ["test", "testA", "testB", "testC"];
        for (let i = 0; i < meh.length; i++)
        {
            Assert.IsEqual(exp[i], meh[i].Name);
            Assert.IsEqual(expf[i], meh[i].FullName);
        }
    }
    @UnitTest
    test_getMethords1()
    {
        let type = TypeOf(TestClass2);
        let meh = type.GetMethords();
        Assert.IsEqual(0, meh.length);
    }
    @UnitTest
    test_getPropertity()
    {
        let type = TypeOf(TestClass2);
        let meh = type.GetPropertity("testField");
        Assert.IsTrue(meh != null);
        Assert.IsEqual("TestClass2.testField", meh.FullName);
        Assert.IsEqual("testField",meh.Name);
    }
    @UnitTest
    test_getPropertity1()
    {
        let type = TypeOf(TestClass);
        let meh = type.GetPropertity("Tests");
        Assert.IsTrue(meh == null);
    }
    @UnitTest
    test_getPropertitys()
    {
        let type = TypeOf(TestClass3);
        let meh = type.GetPropertitys();
        Assert.IsEqual(5, meh.length);
        let exp = ["TestClass3.testField0","TestClass3.testField1", "TestClass3.testField2", "TestClass3.testField3","TestClass3.testField4"];
        for (let i = 0; i < meh.length; i++)
        {
            Assert.IsEqual(exp[i], meh[i].FullName);
        }
    }
    @UnitTest
    test_getPropertitys1()
    {
        let type = TypeOf(TestClass2);
        let meh = type.GetPropertitys();
        Assert.IsEqual(1, meh.length);
        let exp = ["TestClass2.testField"];
        for (let i = 0; i < meh.length; i++)
        {
            Assert.IsEqual(exp[i], meh[i].FullName);
        }
    }
    @UnitTest
    test_getField()
    {
        let type = TypeOf(TestClass);
        let meh = type.GetField("testField");
        Assert.IsTrue(meh != null);
        Assert.IsEqual("TestClass.testField",meh.FullName);
    }
    @UnitTest
    test_getField1()
    {
        let type = TypeOf(TestClass4);
        let meh = type.GetField("_m");
        Assert.IsTrue(meh != null);
        Assert.IsEqual("TestClass4._m", meh.FullName);
        let inst = type.CreateInstance();
        Assert.IsEqual(undefined, meh.GetValue(inst));
        meh.SetValue(inst, 100);
        Assert.IsEqual(100, meh.GetValue(inst));
    }
    @UnitTest
    test_getFields()
    {
        let type = TypeOf(TestClass4);
        let meh = type.GetFields();
        Assert.IsEqual(1,meh.length);
    }
    
}