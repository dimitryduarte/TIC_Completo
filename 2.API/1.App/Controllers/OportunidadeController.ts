import ReturnMessage from "../../2.Domain/Commom/ReturnMessage";
import ReturnResultDB from "../../2.Domain/Commom/ReturnResultDB";
import OportunidadeDto from "../../2.Domain/Oportunidade/Dtos/OportunidadeDto";
import OportunidadeService from "../../2.Domain/Oportunidade/OportunidadeService";

export default class OportunidadeController
{
    public Get(dto: OportunidadeDto): Promise<ReturnMessage<OportunidadeDto>>
    {
        return new OportunidadeService().Get(dto);
    }

    public Post(dto: OportunidadeDto): Promise<ReturnMessage<null>>
    {
        return new OportunidadeService().Post(dto);
    }

    public Put(dto: OportunidadeDto): Promise<ReturnMessage<null>>
    {
        return new OportunidadeService().Put(dto);
    }

    public Delete(dto: OportunidadeDto): Promise<ReturnMessage<null>>
    {
        return new OportunidadeService().Delete(dto);
    }
}
