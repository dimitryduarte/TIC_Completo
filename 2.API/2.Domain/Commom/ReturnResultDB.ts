export default class ReturnResultDB<T>
{
    public lista: T[] | null;
    public totalLinhas: number;

    constructor(_lista: T[] | null = null, _totalLinhas: number = 0) 
    {
        this.lista = _lista;
        this.totalLinhas = _totalLinhas;
    }

    public toString(): string
    {
        return `{ lista: ${this.lista}, totalLinhas: "${this.totalLinhas}" }`;
    }
}
