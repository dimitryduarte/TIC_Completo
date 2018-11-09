import ReturnMessage from "../../2.Domain/Commom/ReturnMessage";
import TipoEnderecoDto from "../../2.Domain/TipoEndereco/Dtos/TipoEnderecoDto";
import TipoEnderecoService from "../../2.Domain/TipoEndereco/TipoEnderecoService";

export default class TipoEnderecoController
{
    public async Get(dto: TipoEnderecoDto): Promise<ReturnMessage<TipoEnderecoDto>>
    {
        return await new TipoEnderecoService().Get(dto);
    }

    public async Post(dto: TipoEnderecoDto): Promise<ReturnMessage<null>>
    {
        return await new TipoEnderecoService().Post(dto);
    }

    public async Put(dto: TipoEnderecoDto): Promise<ReturnMessage<null>>
    {
        return await new TipoEnderecoService().Put(dto);
    }

    public async Delete(dto: TipoEnderecoDto): Promise<ReturnMessage<null>>
    {
        return await new TipoEnderecoService().Delete(dto);
    }    
}
