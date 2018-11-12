import ReturnMessage from "../Commom/ReturnMessage";
import EmailEmpresaDto from "./Dtos/EmailEmpresaDto";
import EmailEmpresaRepository from "../../3.Infra/Repositories/EmailEmpresaRepository";

export default class EmailEmpresaService
{
    public async Get(dto: EmailEmpresaDto): Promise<ReturnMessage<EmailEmpresaDto>>
    {
        if(dto.isValid("GET").Content)
            return await new EmailEmpresaRepository().Get(dto.id_empresa, dto.id_email);
        
        return new ReturnMessage<EmailEmpresaDto>(400, "O parâmetro informado não foi aceito", false);
    }

    public async Post(dto: EmailEmpresaDto): Promise<ReturnMessage<null>>
    {
        let valid = dto.isValid("POST");
        if(valid.Content)
        {
            if(dto.id_email != 0)
                await this.Delete(dto, true);

            return await new EmailEmpresaRepository().Post(dto);
        }

        return valid;
    }

    public async Delete(dto: EmailEmpresaDto, isPost: boolean = false): Promise<ReturnMessage<null>>
    {
        let valid = dto.isValid("DELETE");
        if(valid.Content)
        {
            if (!isPost)
            {
                let rEmail = await this.Get(dto);
                if(rEmail.List.length < 2)
                    return new ReturnMessage<null>(400, "A Empresa deve possuir ao menos um E-mail cadastrado", false);
            }

            return await new EmailEmpresaRepository().Delete(dto.id_email);
        }

        return valid;
    }
}
