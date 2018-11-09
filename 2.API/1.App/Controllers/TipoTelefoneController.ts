import ReturnMessage from "../../2.Domain/Commom/ReturnMessage";
import TipoTelefoneDto from "../../2.Domain/TipoTelefone/Dtos/TipoTelefoneDto";
import TipoTelefoneService from "../../2.Domain/TipoTelefone/TipoTelefoneService";

export default class TipoTelefoneController
{
    public async Get(dto: TipoTelefoneDto): Promise<ReturnMessage<TipoTelefoneDto>>
    {
        return await new TipoTelefoneService().Get(dto);
    }

    public async Post(dto: TipoTelefoneDto): Promise<ReturnMessage<null>>
    {
        return await new TipoTelefoneService().Post(dto);
    }

    public async Put(dto: TipoTelefoneDto): Promise<ReturnMessage<null>>
    {
        return await new TipoTelefoneService().Put(dto);
    }

    public async Delete(dto: TipoTelefoneDto): Promise<ReturnMessage<null>>
    {
        return await new TipoTelefoneService().Delete(dto);
    }    
}
