import ReturnMessage from "../Commom/ReturnMessage";
import EmailContatoDto from "./Dtos/EmailContatoDto";
import EmailContatoRepository from "../../3.Infra/Repositories/EmailContatoRepository";

export default class EmailContatoService
{
    public async Get(dto: EmailContatoDto): Promise<ReturnMessage<EmailContatoDto>>
    {
        if(dto.isValid(true).Content)
            return await new EmailContatoRepository().Get(dto.id_contato, dto.id_email);
        
        return new ReturnMessage<EmailContatoDto>(400, "O parâmetro informado não foi aceito", false);
    }

    public async Post(dto: EmailContatoDto): Promise<ReturnMessage<null>>
    {
        let valid = dto.isValid();
        if(valid.Content)
        {
            await this.Delete(dto);
            
            return await new EmailContatoRepository().Post(dto);
        }
        
        return valid;
    }

    public async Delete(dto: EmailContatoDto): Promise<ReturnMessage<null>>
    {
        if(dto.isValid().Content)
            return await new EmailContatoRepository().Delete(dto.id_email);
        
        return new ReturnMessage<null>(400, "O parâmetro informado não foi aceito", false);
    }
}
