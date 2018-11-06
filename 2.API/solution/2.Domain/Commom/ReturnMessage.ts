export default class ReturnMessage<T>
{
    public StatusCode: number = 0;
    public Message: string = "";
    public Content: T;

    constructor(_statusCode: number = 0, _message: string = "", _content: T) 
    {
        this.StatusCode = _statusCode;
        this.Message = _message;
        this.Content = _content;
    }

    public updateStatus(_statusCode: number = 0, _message: string = "", _content: T): void
    {
        this.StatusCode = _statusCode;
        this.Message = _message;
        this.Content = _content;
    }

    public toString(): string
    {
        return `{ StatusCode: ${this.StatusCode}, Message: "${this.Message}", Content: [${this.Content.toString()}] }`;
    }
}
