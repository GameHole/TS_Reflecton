export class DictionaryArray<TKey, TValue> {
    private _dic = {};
    add(key: TKey, value: TValue): boolean
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
