import ReturnMessage from "../../2.Domain/Commom/ReturnMessage";
import EmailEmpresaDto from "../../2.Domain/EmailEmpresa/Dtos/EmailEmpresaDto";
import EmailEmpresaService from "../../2.Domain/EmailEmpresa/EmailEmpresaService";
import ReturnResultDB from "../../2.Domain/Commom/ReturnResultDB";

export default class EmailEmpresaController
{
    public async Get(dto: EmailEmpresaDto): Promise<ReturnMessage<ReturnResultDB<EmailEmpresaDto[]>>>
    {
        return await new EmailEmpresaService().Get(dto);
    }

    public async Post(dto: EmailEmpresaDto): Promise<ReturnMessage<boolean>>
    {
        return await new EmailEmpresaService().Post(dto);
    }

    public async Delete(dto: EmailEmpresaDto): Promise<ReturnMessage<boolean>>
    {
        return await new EmailEmpresaService().Delete(dto);
    }   
}