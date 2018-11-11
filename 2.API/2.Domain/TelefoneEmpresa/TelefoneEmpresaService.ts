import ReturnMessage from "../Commom/ReturnMessage";
import TelefoneEmpresaDto from "./Dtos/TelefoneEmpresaDto";
import TelefoneEmpresaRepository from "../../3.Infra/Repositories/TelefoneEmpresaRepository";

export default class TelefoneEmpresaService
{
    public async Get(dto: TelefoneEmpresaDto): Promise<ReturnMessage<TelefoneEmpresaDto>>
    {
        if(dto.isValid("GET").Content)
            return await new TelefoneEmpresaRepository().Get(dto.id_empresa, dto.id_telefone);
        
        return new ReturnMessage<TelefoneEmpresaDto>(400, "O parâmetro informado não foi aceito", false);
    }

    public async Post(dto: TelefoneEmpresaDto): Promise<ReturnMessage<null>>
    {
        let valid = dto.isValid("POST");
        if(valid.Content)
        {
            await this.Delete(dto);

            return await new TelefoneEmpresaRepository().Post(dto);
        }
        
        return valid;
    }

    public async Delete(dto: TelefoneEmpresaDto): Promise<ReturnMessage<null>>
    {
        let valid = dto.isValid("DELETE");
        if(valid.Content)
            return await new TelefoneEmpresaRepository().Delete(dto.id_telefone);
        
        return valid;
    }
}
