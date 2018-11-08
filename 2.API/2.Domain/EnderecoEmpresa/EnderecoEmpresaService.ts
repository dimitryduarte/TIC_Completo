import ReturnMessage from "../Commom/ReturnMessage";
import ReturnResultDB from "../Commom/ReturnResultDB";
import EnderecoEmpresaDto from "./Dtos/EnderecoEmpresaDto";
import EnderecoEmpresaRepository from "../../3.Infra/Repositories/EnderecoEmpresaRepository";

export default class EnderecoEmpresaService
{
    public async Get(dto: EnderecoEmpresaDto): Promise<ReturnMessage<EnderecoEmpresaDto>>
    {
        if(dto.isValid(true).Content)
            return await new EnderecoEmpresaRepository().Get(dto.id_empresa, dto.id_endereco);
        
        return new ReturnMessage<EnderecoEmpresaDto>(400, "O parâmetro informado não foi aceito", false, new ReturnResultDB<EnderecoEmpresaDto>([]));
    }

    public async Post(dto: EnderecoEmpresaDto): Promise<ReturnMessage<null>>
    {
        let valid = dto.isValid();
        if(valid.Content)
        {
            await this.Delete(dto);

            return await new EnderecoEmpresaRepository().Post(dto);
        }

        return valid;
    }

    public async Delete(dto: EnderecoEmpresaDto): Promise<ReturnMessage<null>>
    {
        if(dto.isValid().Content)
            return await new EnderecoEmpresaRepository().Delete(dto.id_endereco);
        
        return new ReturnMessage<null>(400, "O parâmetro informado não foi aceito", false);
    }
}
