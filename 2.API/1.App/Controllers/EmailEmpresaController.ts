import ReturnMessage from "../../2.Domain/Commom/ReturnMessage";
import EmailEmpresaDto from "../../2.Domain/EmailEmpresa/Dtos/EmailEmpresaDto";
import EmailEmpresaService from "../../2.Domain/EmailEmpresa/EmailEmpresaService";

export default class EmailEmpresaController
{
    public async Get(dto: EmailEmpresaDto): Promise<ReturnMessage<EmailEmpresaDto>>
    {
        return await new EmailEmpresaService().Get(dto);
    }

    public async Post(dto: EmailEmpresaDto): Promise<ReturnMessage<null>>
    {
        return await new EmailEmpresaService().Post(dto);
    }

    public async Delete(dto: EmailEmpresaDto): Promise<ReturnMessage<null>>
    {
        return await new EmailEmpresaService().Delete(dto);
    }   
}
