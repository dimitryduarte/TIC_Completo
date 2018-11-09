import ReturnMessage from "../../2.Domain/Commom/ReturnMessage";
import ReturnResultDB from "../../2.Domain/Commom/ReturnResultDB";
import ContatoDto from "../../2.Domain/Contato/Dtos/ContatoDto";
import ContatoService from "../../2.Domain/Contato/ContatoService";

export default class ContatoController
{
    public async Get(dto: ContatoDto): Promise<ReturnMessage<ContatoDto>>
    {
        return await new ContatoService().Get(dto);
    }

    public async Post(dto: ContatoDto): Promise<ReturnMessage<null>>
    {
        return await new ContatoService().Post(dto);
    }

    public async Put(dto: ContatoDto): Promise<ReturnMessage<null>>
    {
        return await new ContatoService().Put(dto);
    }

    public async Delete(dto: ContatoDto): Promise<ReturnMessage<null>>
    {
        return await new ContatoService().Delete(dto);
    }   
}
