import ReturnMessage from "../../2.Domain/Commom/ReturnMessage";
import TelefoneContatoDto from "../../2.Domain/TelefoneContato/Dtos/TelefoneContatoDto";
import TelefoneContatoService from "../../2.Domain/TelefoneContato/TelefoneContatoService";

export default class TelefoneContatoController
{
    public async Get(dto: TelefoneContatoDto): Promise<ReturnMessage<TelefoneContatoDto>>
    {
        return await new TelefoneContatoService().Get(dto);
    }

    public async Post(dto: TelefoneContatoDto): Promise<ReturnMessage<null>>
    {
        return await new TelefoneContatoService().Post(dto);
    }

    public async Delete(dto: TelefoneContatoDto): Promise<ReturnMessage<null>>
    {
        return await new TelefoneContatoService().Delete(dto);
    }   
}
