import ReturnMessage from "../Commom/ReturnMessage";
import TipoTelefoneDto from "./Dtos/TipoTelefoneDto";
import TipoTelefoneRepository from "../../3.Infra/Repositories/TipoTelefoneRepository";

export default class TipotelefoneService
{
    public async Get(dto: TipoTelefoneDto): Promise<ReturnMessage<TipoTelefoneDto>>
    {
        if(dto.isValid("GET").Content)
            return await new TipoTelefoneRepository().Get(dto.id_tipo_telefone);

        return new ReturnMessage<TipoTelefoneDto>(400, "O parâmetro informado não foi aceito", false);
    }

    public async Post(dto: TipoTelefoneDto): Promise<ReturnMessage<null>>
    {
        let valid = dto.isValid("POST");
        if(valid.Content)
            return await new TipoTelefoneRepository().Post(dto);

        return valid;
    }

    public async Put(dto: TipoTelefoneDto): Promise<ReturnMessage<null>>
    {
        let valid = dto.isValid("PUT");
        if(valid.Content)
            return await new TipoTelefoneRepository().Put(dto);

        return valid;
    }

    public async Delete(dto: TipoTelefoneDto): Promise<ReturnMessage<null>>
    {
        let valid = dto.isValid("DELETE");
        if(valid.Content)
            return await new TipoTelefoneRepository().Delete(dto.id_tipo_telefone);

        return valid
    }
}
