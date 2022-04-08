import { AttributeMgr } from "../Reflection/Attribute";
import { AttributeDealers } from "../Reflection/AttributeDealers";
import { Assert } from "./Assert";
import { Testfield } from "./AttributeTest";
import { UnitTest } from "./TestHelper";
export class AttributeDealersTest
{
    @UnitTest
    Test()
    {
        AttributeDealers.Add(() =>
        {
            let infos = AttributeMgr.getAttributeInfo(Testfield);
            Assert.IsTrue(infos != undefined);
            infos.forEach(n =>
            {
                Assert.IsEqual("_d", n.propertyName);
            });
        });
        AttributeDealers.Run();
    }
}