import ReturnMessage from "../../2.Domain/Commom/ReturnMessage";
import TipoOportunidadeDto from "./Dtos/TipoOportunidadeDto";
import TipoOportunidadeRepository from "../../3.Infra/Repositories/TipoOportunidadeRepository";

export default class TipoOportunidadeService
{
    public async Get(dto: TipoOportunidadeDto): Promise<ReturnMessage<TipoOportunidadeDto>>
    {
        if(dto.isValid(true).Content)
            return await new TipoOportunidadeRepository().Get(dto.id_tipo_oportunidade);

        return new ReturnMessage<TipoOportunidadeDto>(400, "O parâmetro informado não foi aceito", false);
    }

    public async Post(dto: TipoOportunidadeDto): Promise<ReturnMessage<null>>
    {
        let valid = dto.isValid();
        if(valid.Content)
            return await new TipoOportunidadeRepository().Post(dto);

        return valid;
    }

    public async Put(dto: TipoOportunidadeDto): Promise<ReturnMessage<null>>
    {
        let valid = dto.isValid();
        if(valid.Content)
            return await new TipoOportunidadeRepository().Put(dto);

        return valid;
    }

    public async Delete(dto: TipoOportunidadeDto): Promise<ReturnMessage<null>>
    {
        if(dto.isValid().Content)
            return await new TipoOportunidadeRepository().Delete(dto.id_tipo_oportunidade);

        return new ReturnMessage<null>(400, "O parâmetro informado não foi aceito", false);
    }
}
