export class AttributeDealers
{
    private static dealers: Array<VoidFunction> = new Array<VoidFunction>();
    static Add(dealer: VoidFunction)
    {
        this.dealers.push(dealer);
    }
    static Run()
    {
        this.dealers.forEach(d => d());
        this.dealers = undefined;
    }
}