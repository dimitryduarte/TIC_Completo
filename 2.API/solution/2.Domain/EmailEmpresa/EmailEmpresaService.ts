import ReturnMessage from "../Commom/ReturnMessage";
import ReturnResultDB from "../Commom/ReturnResultDB";
import EmailEmpresaDto from "./Dtos/EmailEmpresaDto";
import EmailEmpresaRepository from "../../3.Infra/Repositories/EmailEmpresaRepository";

export default class EmailEmpresaService
{
    public async Get(dto: EmailEmpresaDto): Promise<ReturnMessage<ReturnResultDB<EmailEmpresaDto[]>>>
    {
        if(dto.isValid(true).Content)
            return await new EmailEmpresaRepository().Get(dto.id_empresa, dto.id_email);
        
        return new ReturnMessage<ReturnResultDB<EmailEmpresaDto[]>>(400, "O parâmetro informado não foi aceito", new ReturnResultDB<EmailEmpresaDto[]>([]));
    }

    public async Post(dto: EmailEmpresaDto): Promise<ReturnMessage<boolean>>
    {
        let valid = dto.isValid();
        if(valid.Content)
        {
            await this.Delete(dto);

            return await new EmailEmpresaRepository().Post(dto);
        }

        return valid;
    }

    public async Delete(dto: EmailEmpresaDto): Promise<ReturnMessage<boolean>>
    {
        if(dto.isValid().Content)
            return await new EmailEmpresaRepository().Delete(dto.id_email);
        
        return new ReturnMessage<boolean>(400, "O parâmetro informado não foi aceito", false);
    }
}
