export default class ReturnMessage<T>
{
    public StatusCode: number = 0;
    public Message: string = "";
    public Content: boolean;
    public Lista: T[];
    public TotalLinhas: number;

    constructor(_statusCode: number, _message: string, _content: boolean, _lista: T[] = [], _totalLinhas: number = 0)
    {
        this.StatusCode = _statusCode;
        this.Message = _message;
        this.Content = _content;
        this.Lista = _lista;
        this.TotalLinhas = _totalLinhas;
    }

    public updateStatus(_statusCode: number, _message: string, _content: boolean, _lista: T[] = [], _totalLinhas: number = 0)
    {
        this.StatusCode = _statusCode;
        this.Message = _message;
        this.Content = _content;
        this.Lista = _lista;
        this.TotalLinhas = _totalLinhas;
    }
}
