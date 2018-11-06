import ReturnMessage from "../../2.Domain/Commom/ReturnMessage";
import ReturnResultDB from "../../2.Domain/Commom/ReturnResultDB";
import EnderecoEmpresaDto from "../../2.Domain/EnderecoEmpresa/Dtos/EnderecoEmpresaDto";
import EnderecoEmpresaService from "../../2.Domain/EnderecoEmpresa/EnderecoEmpresaService";

export default class EnderecoEmpresaController
{
    public async Get(dto: EnderecoEmpresaDto): Promise<ReturnMessage<ReturnResultDB<EnderecoEmpresaDto[]>>>
    {
        return await new EnderecoEmpresaService().Get(dto);
    }

    public async Post(dto: EnderecoEmpresaDto): Promise<ReturnMessage<boolean>>
    {
        return await new EnderecoEmpresaService().Post(dto);
    }

    public async Delete(dto: EnderecoEmpresaDto): Promise<ReturnMessage<boolean>>
    {
        return await new EnderecoEmpresaService().Delete(dto);
    }   
}
