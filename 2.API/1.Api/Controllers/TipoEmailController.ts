import ReturnMessage from "../../2.Domain/Commom/ReturnMessage";
import ReturnResultDB from "../../2.Domain/Commom/ReturnResultDB";
import TipoEmailDto from "../../2.Domain/TipoEmail/Dtos/TipoEmailDto";
import TipoEmailService from "../../2.Domain/TipoEmail/TipoEmailService";

export default class TipoEmailController
{
    public async Get(dto: TipoEmailDto): Promise<ReturnMessage<TipoEmailDto>>
    {
        return await new TipoEmailService().Get(dto);
    }

    public async Post(dto: TipoEmailDto): Promise<ReturnMessage<null>>
    {
        return await new TipoEmailService().Post(dto);
    }

    public async Put(dto: TipoEmailDto): Promise<ReturnMessage<null>>
    {
        return await new TipoEmailService().Put(dto);
    }

    public async Delete(dto: TipoEmailDto): Promise<ReturnMessage<null>>
    {
        return await new TipoEmailService().Delete(dto);
    }    
}
