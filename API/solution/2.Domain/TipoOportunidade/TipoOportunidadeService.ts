import ReturnMessage from "../../2.Domain/Commom/ReturnMessage";
import ReturnResultDB from "../../2.Domain/Commom/ReturnResultDB";
import TipoOportunidadeDto from "./Dtos/TipoOportunidadeDto";
import TipoOportunidadeRepository from "../../3.Infra/Repositories/TipoOportunidadeRepository";

export default class TipoOportunidadeService
{
    public async Get(dto: TipoOportunidadeDto): Promise<ReturnMessage<ReturnResultDB<TipoOportunidadeDto[]>>>
    {
        if(dto.isValid(true).Content)
            return await new TipoOportunidadeRepository().Get(dto.id_tipo_oportunidade);

        return new ReturnMessage<ReturnResultDB<TipoOportunidadeDto[]>>(400, "O parâmetro informado não foi aceito", new ReturnResultDB<TipoOportunidadeDto[]>([]));
    }

    public async Post(dto: TipoOportunidadeDto): Promise<ReturnMessage<boolean>>
    {
        let valid = dto.isValid();
        if(valid.Content)
            return await new TipoOportunidadeRepository().Post(dto);

        return valid;
    }

    public async Put(dto: TipoOportunidadeDto): Promise<ReturnMessage<boolean>>
    {
        let valid = dto.isValid();
        if(valid.Content)
            return await new TipoOportunidadeRepository().Put(dto);

        return valid;
    }

    public async Delete(dto: TipoOportunidadeDto): Promise<ReturnMessage<boolean>>
    {
        if(dto.isValid().Content)
            return await new TipoOportunidadeRepository().Delete(dto.id_tipo_oportunidade);

        return new ReturnMessage<boolean>(400, "O parâmetro informado não foi aceito", false);
    }
}
