import ReturnMessage from "../Commom/ReturnMessage";
import ReturnResultDB from "../Commom/ReturnResultDB";
import TelefoneContatoDto from "./Dtos/TelefoneContatoDto";
import TelefoneContatoRepository from "../../3.Infra/Repositories/TelefoneContatoRepository";

export default class TelefoneContatoService
{
    public async Get(dto: TelefoneContatoDto): Promise<ReturnMessage<ReturnResultDB<TelefoneContatoDto[]>>>
    {
        if(dto.isValid(true).Content)
            return await new TelefoneContatoRepository().Get(dto.id_contato, dto.id_telefone);
        
            return new ReturnMessage<ReturnResultDB<TelefoneContatoDto[]>>(400, "O parâmetro informado não foi aceito", new ReturnResultDB<TelefoneContatoDto[]>([]));
    }

    public async Post(dto: TelefoneContatoDto): Promise<ReturnMessage<boolean>>
    {
        let valid = dto.isValid();
        if(valid.Content)
        {
            this.Delete(dto);
            
            return await new TelefoneContatoRepository().Post(dto);
        }

        return valid;
    }

    public async Delete(dto: TelefoneContatoDto): Promise<ReturnMessage<boolean>>
    {
        if(dto.isValid().Content)
            return await new TelefoneContatoRepository().Delete(dto.id_telefone);
        
        return new ReturnMessage<boolean>(400, "O parâmetro informado não foi aceito", false);
    }
}
