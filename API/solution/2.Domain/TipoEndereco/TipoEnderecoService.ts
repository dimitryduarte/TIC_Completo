import ReturnMessage from "../Commom/ReturnMessage";
import ReturnResultDB from "../Commom/ReturnResultDB";
import TipoEnderecoDto from "./Dtos/TipoEnderecoDto";
import TipoEnderecoRepository from "../../3.Infra/Repositories/TipoEnderecoRepository";

export default class TipoenderecoService
{
    public async Get(dto: TipoEnderecoDto): Promise<ReturnMessage<ReturnResultDB<TipoEnderecoDto[]>>>
    {
        if(dto.isValid(true).Content)
            return await new TipoEnderecoRepository().Get(dto.id_tipo_endereco);

        return new ReturnMessage<ReturnResultDB<TipoEnderecoDto[]>>(400, "O parâmetro informado não foi aceito", new ReturnResultDB<TipoEnderecoDto[]>([]));
    }

    public async Post(dto: TipoEnderecoDto): Promise<ReturnMessage<boolean>>
    {
        let valid = dto.isValid();
        if(valid.Content)
            return await new TipoEnderecoRepository().Post(dto);

        return valid;
    }

    public async Put(dto: TipoEnderecoDto): Promise<ReturnMessage<boolean>>
    {
        let valid = dto.isValid();
        if(valid.Content)
            return await new TipoEnderecoRepository().Put(dto);

        return valid;
    }

    public async Delete(dto: TipoEnderecoDto): Promise<ReturnMessage<boolean>>
    {
        if(dto.isValid().Content)
            return await new TipoEnderecoRepository().Delete(dto.id_tipo_endereco);

        return new ReturnMessage<boolean>(400, "O parâmetro informado não foi aceito", false);
    }
}
