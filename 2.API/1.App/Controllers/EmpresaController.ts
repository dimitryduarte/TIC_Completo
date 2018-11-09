import ReturnMessage from "../../2.Domain/Commom/ReturnMessage";
import EmpresaDto from "../../2.Domain/Empresa/Dtos/EmpresaDto";
import EmpresaService from "../../2.Domain/Empresa/EmpresaService";

export default class EmpresaController
{
    public async Get(dto: EmpresaDto): Promise<ReturnMessage<EmpresaDto>>
    {
        return await new EmpresaService().Get(dto);
    }

    public async Post(dto: EmpresaDto): Promise<ReturnMessage<null>>
    {
        return await new EmpresaService().Post(dto);
    }

    public async Put(dto: EmpresaDto): Promise<ReturnMessage<null>>
    {
        return await new EmpresaService().Put(dto);
    }

    public async Delete(dto: EmpresaDto): Promise<ReturnMessage<null>>
    {
        return await new EmpresaService().Delete(dto);
    } 
}
