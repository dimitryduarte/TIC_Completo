export default class ReturnMessage<T>
{
    public StatusCode: number = 0;
    public Message: string = "";
    public Content: boolean;
    public List: T[];
    public Lines: number;

    constructor(_statusCode: number, _message: string, _content: boolean, _list: T[] = [], _lines: number = 0)
    {
        this.StatusCode = _statusCode;
        this.Message = _message;
        this.Content = _content;
        this.List = _list;
        this.Lines = _lines;
    }

    public updateStatus(_statusCode: number, _message: string, _content: boolean, _list: T[] = [], _lines: number = 0)
    {
        this.StatusCode = _statusCode;
        this.Message = _message;
        this.Content = _content;
        this.List = _list;
        this.Lines = _lines;
    }
}
