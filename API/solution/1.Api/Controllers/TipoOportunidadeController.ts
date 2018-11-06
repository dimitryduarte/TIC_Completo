import ReturnMessage from "../../2.Domain/Commom/ReturnMessage";
import ReturnResultDB from "../../2.Domain/Commom/ReturnResultDB";
import TipoOportunidadeDto from "../../2.Domain/TipoOportunidade/Dtos/TipoOportunidadeDto";
import TipoOportunidadeService from "../../2.Domain/TipoOportunidade/TipoOportunidadeService";

export default class TipoOportunidadeController
{
    public async Get(dto: TipoOportunidadeDto): Promise<ReturnMessage<ReturnResultDB<TipoOportunidadeDto[]>>>
    {
        return await new TipoOportunidadeService().Get(dto);
    }

    public async Post(dto: TipoOportunidadeDto): Promise<ReturnMessage<boolean>>
    {
        return await new TipoOportunidadeService().Post(dto);
    }

    public async Put(dto: TipoOportunidadeDto): Promise<ReturnMessage<boolean>>
    {
        return await new TipoOportunidadeService().Put(dto);
    }

    public async Delete(dto: TipoOportunidadeDto): Promise<ReturnMessage<boolean>>
    {
        return await new TipoOportunidadeService().Delete(dto);
    }    
}
