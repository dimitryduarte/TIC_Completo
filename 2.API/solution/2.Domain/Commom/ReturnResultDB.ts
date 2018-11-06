export default class ReturnResultDB<T>
{
    public result: T;
    public totalLinhas: number;

    constructor(_result: T, _totalLinhas: number = 0) 
    {
        this.result = _result;
        this.totalLinhas = _totalLinhas;
    }

    public toString(): string
    {
        return `{ result: ${this.result}, totalLinhas: "${this.totalLinhas}" }`;
    }
}
