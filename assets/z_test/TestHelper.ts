export function ForeachObject<T extends object>(obj:T,callback:(a:any)=>void) {
    for (let k in obj) {
        callback(obj[k]);
    }
}
class Dic<TKey,TValue>
{
    _dic = {};
    add(key: TKey, value: TValue):boolean
    {
        let _key = key as any;
        let m = this._dic[_key] as Array<TValue>;
        if (m == undefined)
        {
            m = new Array<TValue>();
            this._dic[_key] = m;
            m.push(value);
            return true;
        }
        m.push(value);
        return false;
    }
    getValues(key: TKey): Array<TValue>
    {
        let _key = key as any;
        return this._dic[_key] as Array<TValue>;
    }
}
export class TestContainer
{
    static _dicTest = new Dic<string, string>();
    static _dicSetUp = new Dic<string, string>();
    static ps:Array<any> = [];
    static addTest(proto:any, key:string)
    { //console.log("addTest",proto, key);
        this.addInternal(this._dicTest,proto, key);
       
    }
    private static addInternal(dic:Dic<string, string>,proto: any, key: string)
    {
        if (dic.add(this.getKey(proto), key))
        {
            //console.log("addInternal",proto, key);
            this.addproto(proto);
        }
    }

    static addSetUp(proto, key)
    {
        //console.log("addSetUp",proto, key);
        this.addInternal(this._dicSetUp,proto, key);
    }
    static addproto(proto)
    {
        if (this.ps.indexOf(proto) < 0)
            this.ps.push(proto);
    }
    static run()
    {
        //console.log(this.ps);
        for (let i = 0; i < this.ps.length; i++)
        {
            let p = this.ps[i];
            let s = this._dicSetUp.getValues(this.getKey(p));
            let t = this._dicTest.getValues(this.getKey(p));
            let instP = new p.constructor();
            this.runSetUp(s, instP);
            if (t)
            {
                this.runTests(t, instP);
            }    
        }
    }
    private static getKey(p: any)
    {
        return p.constructor.name;
    }

    private static runTests(t: string[], instP: any)
    {
        t.forEach(tk =>
        {
            this.runOne(tk, instP);
        });
    }

    private static runSetUp(s: string[], instP: any)
    {
        //console.log(s);
        if (s)
            s.forEach(sk => instP[sk]());
    }

    static runTest(type: any, testName?: string): void
    {
        let f = this.ps.find(v => v == type.prototype);
        if (f)
        {
            let inst = new f.constructor();
            this.runSetUp(this._dicSetUp.getValues(this.getKey(f)), inst);
            let t = this._dicTest.getValues(this.getKey(f));
            if (t)
            {
                if (testName)
                {
                    let tf = t.find(tk => tk == testName);
                    if (tf)
                    {
                        this.runOne(tf, inst);
                    } else
                    {
                        console.log("methord name = " + testName + " is not a testable methord");
                    }
                } else
                {
                    this.runTests(t, inst);
                }
                
            }
        }
    }
    private static runOne(tk: string, instP: any)
    {
        let name = instP.constructor.name + "." + tk;
        try
        {
            console.time(name);
            instP[tk]();
            console.timeEnd(name);
            // console.warn("Success: " + name);
            console.warn("%c%s", "color:#00920C;", "Success: " + name);
        } catch (error)
        {
            let m = (error as Error);
            // console.log(m);
            if (m.message == "Assert.test.error")
            {
                m.name = "Faild";
                m.message = name;
                console.error("", error);
            } else
            {
                console.error(error);
            }
        }
    }
}
export function UnitTest(proto, key)
{
    // console.log(RulesTest.prototype === proto);
    // console.log(proto, key);
    TestContainer.addTest(proto, key);
}
export function SetUp(proto, key)
{
    // console.log(RulesTest.prototype === proto);
    // console.log("SetUp",proto, key);
    TestContainer.addSetUp(proto, key);
}
