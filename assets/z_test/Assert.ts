export class Assert
{
    static IsTrue(v: boolean): void
    {
        // if (!v)
        //     console.error("TestFaild");
        // else
        //     console.warn("test success");

        if (!v)
            throw Error("Assert.test.error");
    }
    static IsFalse(v: boolean): void
    {
        // if (v)
        //     console.error("TestFaild");
        // else
        //     console.warn("test success");
        if (v)
            throw Error("Assert.test.error");
    }
    static IsEqual<T>(exp: T, ac: T): void
    {
        if (exp != ac)
            throw Error("Assert.test.error");// console.error("TestFaild");
        // else
        //     console.warn("test success");
    }
    static IsAllEqual<T>(exp: T[], ac: T[]): void
    {
        if (exp.length != ac.length)
        {
            // console.error("TestFaild");
            throw Error("Assert.test.error");
            // return;
        }
        
        for (let i = 0; i < exp.length; i++)
        {
            if (exp[i] != ac[i])
            {
                // console.error("TestFaild");
                throw Error("Assert.test.error");
                // return;
            }
        }
        // console.warn("test success");
    }
}