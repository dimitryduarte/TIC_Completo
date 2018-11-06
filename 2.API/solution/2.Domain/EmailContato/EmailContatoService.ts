import ReturnMessage from "../Commom/ReturnMessage";
import ReturnResultDB from "../Commom/ReturnResultDB";
import EmailContatoDto from "./Dtos/EmailContatoDto";
import EmailContatoRepository from "../../3.Infra/Repositories/EmailContatoRepository";

export default class EmailContatoService
{
    public async Get(dto: EmailContatoDto): Promise<ReturnMessage<ReturnResultDB<EmailContatoDto[]>>>
    {
        if(dto.isValid(true).Content)
            return await new EmailContatoRepository().Get(dto.id_contato, dto.id_email);
        
        return new ReturnMessage<ReturnResultDB<EmailContatoDto[]>>(400, "O parâmetro informado não foi aceito", new ReturnResultDB<EmailContatoDto[]>([]));
    }

    public async Post(dto: EmailContatoDto): Promise<ReturnMessage<boolean>>
    {
        let valid = dto.isValid();
        if(valid.Content)
        {
            await this.Delete(dto);
            
            return await new EmailContatoRepository().Post(dto);
        }
        
        return valid;
    }

    public async Delete(dto: EmailContatoDto): Promise<ReturnMessage<boolean>>
    {
        if(dto.isValid().Content)
            return await new EmailContatoRepository().Delete(dto.id_email);
        
        return new ReturnMessage<boolean>(400, "O parâmetro informado não foi aceito", false);
    }
}
