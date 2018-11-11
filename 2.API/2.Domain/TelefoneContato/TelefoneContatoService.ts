import ReturnMessage from "../Commom/ReturnMessage";
import TelefoneContatoDto from "./Dtos/TelefoneContatoDto";
import TelefoneContatoRepository from "../../3.Infra/Repositories/TelefoneContatoRepository";

export default class TelefoneContatoService
{
    public async Get(dto: TelefoneContatoDto): Promise<ReturnMessage<TelefoneContatoDto>>
    {
        if(dto.isValid("GET").Content)
            return await new TelefoneContatoRepository().Get(dto.id_contato, dto.id_telefone);
        
            return new ReturnMessage<TelefoneContatoDto>(400, "O parâmetro informado não foi aceito", false);
    }

    public async Post(dto: TelefoneContatoDto): Promise<ReturnMessage<null>>
    {
        let valid = dto.isValid("POST");
        if(valid.Content)
        {
            await this.Delete(dto);
            
            return await new TelefoneContatoRepository().Post(dto);
        }

        return valid;
    }

    public async Delete(dto: TelefoneContatoDto): Promise<ReturnMessage<null>>
    {
        let valid = dto.isValid("DELETE");
        if(valid.Content)
            return await new TelefoneContatoRepository().Delete(dto.id_telefone);
        
        return valid;
    }
}
