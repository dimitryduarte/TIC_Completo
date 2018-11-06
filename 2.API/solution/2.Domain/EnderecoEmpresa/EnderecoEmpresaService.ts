import ReturnMessage from "../Commom/ReturnMessage";
import ReturnResultDB from "../Commom/ReturnResultDB";
import EnderecoEmpresaDto from "./Dtos/EnderecoEmpresaDto";
import EnderecoEmpresaRepository from "../../3.Infra/Repositories/EnderecoEmpresaRepository";

export default class EnderecoEmpresaService
{
    public async Get(dto: EnderecoEmpresaDto): Promise<ReturnMessage<ReturnResultDB<EnderecoEmpresaDto[]>>>
    {
        if(dto.isValid(true).Content)
            return await new EnderecoEmpresaRepository().Get(dto.id_empresa, dto.id_endereco);
        
        return new ReturnMessage<ReturnResultDB<EnderecoEmpresaDto[]>>(400, "O parâmetro informado não foi aceito", new ReturnResultDB<EnderecoEmpresaDto[]>([]));
    }

    public async Post(dto: EnderecoEmpresaDto): Promise<ReturnMessage<boolean>>
    {
        let valid = dto.isValid();
        if(valid.Content)
        {
            await this.Delete(dto);

            return await new EnderecoEmpresaRepository().Post(dto);
        }

        return valid;
    }

    public async Delete(dto: EnderecoEmpresaDto): Promise<ReturnMessage<boolean>>
    {
        if(dto.isValid().Content)
            return await new EnderecoEmpresaRepository().Delete(dto.id_endereco);
        
        return new ReturnMessage<boolean>(400, "O parâmetro informado não foi aceito", false);
    }
}
