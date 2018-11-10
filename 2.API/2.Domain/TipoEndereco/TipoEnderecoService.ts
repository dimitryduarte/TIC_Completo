import ReturnMessage from "../Commom/ReturnMessage";
import TipoEnderecoDto from "./Dtos/TipoEnderecoDto";
import TipoEnderecoRepository from "../../3.Infra/Repositories/TipoEnderecoRepository";

export default class TipoenderecoService
{
    public async Get(dto: TipoEnderecoDto): Promise<ReturnMessage<TipoEnderecoDto>>
    {
        if(dto.isValid("GET").Content)
            return await new TipoEnderecoRepository().Get(dto.id_tipo_endereco);

        return new ReturnMessage<TipoEnderecoDto>(400, "O parâmetro informado não foi aceito", false);
    }

    public async Post(dto: TipoEnderecoDto): Promise<ReturnMessage<null>>
    {
        let valid = dto.isValid("POST");
        if(valid.Content)
            return await new TipoEnderecoRepository().Post(dto);

        return valid;
    }

    public async Put(dto: TipoEnderecoDto): Promise<ReturnMessage<null>>
    {
        let valid = dto.isValid("PUT");
        if(valid.Content)
            return await new TipoEnderecoRepository().Put(dto);

        return valid;
    }

    public async Delete(dto: TipoEnderecoDto): Promise<ReturnMessage<null>>
    {
        if(dto.isValid("DELETE").Content)
            return await new TipoEnderecoRepository().Delete(dto.id_tipo_endereco);

        return new ReturnMessage<null>(400, "O parâmetro informado não foi aceito", false);
    }
}
