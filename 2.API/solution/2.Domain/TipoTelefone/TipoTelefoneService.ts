import ReturnMessage from "../Commom/ReturnMessage";
import ReturnResultDB from "../Commom/ReturnResultDB";
import TipoTelefoneDto from "./Dtos/TipoTelefoneDto";
import TipoTelefoneRepository from "../../3.Infra/Repositories/TipoTelefoneRepository";

export default class TipotelefoneService
{
    public async Get(dto: TipoTelefoneDto): Promise<ReturnMessage<ReturnResultDB<TipoTelefoneDto[]>>>
    {
        if(dto.isValid(true).Content)
            return await new TipoTelefoneRepository().Get(dto.id_tipo_telefone);

        return new ReturnMessage<ReturnResultDB<TipoTelefoneDto[]>>(400, "O parâmetro informado não foi aceito", new ReturnResultDB<TipoTelefoneDto[]>([]));
    }

    public async Post(dto: TipoTelefoneDto): Promise<ReturnMessage<boolean>>
    {
        let valid = dto.isValid();
        if(valid.Content)
            return await new TipoTelefoneRepository().Post(dto);

        return valid;
    }

    public async Put(dto: TipoTelefoneDto): Promise<ReturnMessage<boolean>>
    {
        let valid = dto.isValid();
        if(valid.Content)
            return await new TipoTelefoneRepository().Put(dto);

        return valid;
    }

    public async Delete(dto: TipoTelefoneDto): Promise<ReturnMessage<boolean>>
    {
        if(dto.isValid().Content)
            return await new TipoTelefoneRepository().Delete(dto.id_tipo_telefone);

        return new ReturnMessage<boolean>(400, "O parâmetro informado não foi aceito", false);
    }
}
