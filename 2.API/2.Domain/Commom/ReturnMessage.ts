import ReturnResultDB from "./ReturnResultDB";

export default class ReturnMessage<T>
{
    public StatusCode: number = 0;
    public Message: string = "";
    public Content: boolean;
    public Result : ReturnResultDB<T | null>;

    constructor(_statusCode: number, _message: string, _content: boolean, _result: ReturnResultDB<T | null> = new ReturnResultDB<T | null>())
    {
        this.StatusCode = _statusCode;
        this.Message = _message;
        this.Content = _content;
        this.Result = _result;
    }

    public updateStatus(_statusCode: number, _message: string, _content: boolean, _result: ReturnResultDB<T | null> = new ReturnResultDB<T | null>())
    {
        this.StatusCode = _statusCode;
        this.Message = _message;
        this.Content = _content;
        this.Result = _result;
    }

    public toString(): string
    {
        return `{ StatusCode: ${this.StatusCode}, Message: "${this.Message}", Content: [${this.Content.toString()}] }`;
    }
}
