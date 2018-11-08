import ReturnMessage from "../../2.Domain/Commom/ReturnMessage";
import EmailContatoDto from "../../2.Domain/EmailContato/Dtos/EmailContatoDto";
import EmailContatoService from "../../2.Domain/EmailContato/EmailContatoService";
import ReturnResultDB from "../../2.Domain/Commom/ReturnResultDB";

export default class EmailContatoController
{
    public async Get(dto: EmailContatoDto): Promise<ReturnMessage<EmailContatoDto>>
    {
        return await new EmailContatoService().Get(dto);
    }

    public async Post(dto: EmailContatoDto): Promise<ReturnMessage<null>>
    {
        return await new EmailContatoService().Post(dto);
    }

    public async Delete(dto: EmailContatoDto): Promise<ReturnMessage<null>>
    {
        return await new EmailContatoService().Delete(dto);
    }   
}
