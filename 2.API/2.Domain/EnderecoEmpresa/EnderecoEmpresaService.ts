import ReturnMessage from "../Commom/ReturnMessage";
import EnderecoEmpresaDto from "./Dtos/EnderecoEmpresaDto";
import EnderecoEmpresaRepository from "../../3.Infra/Repositories/EnderecoEmpresaRepository";

export default class EnderecoEmpresaService
{
    public async Get(dto: EnderecoEmpresaDto): Promise<ReturnMessage<EnderecoEmpresaDto>>
    {
        if(dto.isValid("GET").Content)
            return await new EnderecoEmpresaRepository().Get(dto.id_empresa, dto.id_endereco);
        
        return new ReturnMessage<EnderecoEmpresaDto>(400, "O parâmetro informado não foi aceito", false);
    }

    public async Post(dto: EnderecoEmpresaDto): Promise<ReturnMessage<null>>
    {
        let valid = dto.isValid("POST");
        if(valid.Content)
        {
            if (dto.id_endereco != 0)
                await this.Delete(dto, true);

            return await new EnderecoEmpresaRepository().Post(dto);
        }

        return valid;
    }

    public async Delete(dto: EnderecoEmpresaDto, isPost: boolean = false): Promise<ReturnMessage<null>>
    {
        let valid = dto.isValid("DELETE");
        if(valid.Content)
        {
            if (!isPost)
            {
                let rEndereco = await this.Get(dto);
                if(rEndereco.List.length < 2)
                    return new ReturnMessage<null>(400, "A Empresa deve possuir ao menos um Endereço cadastrado", false);
            }

            return await new EnderecoEmpresaRepository().Delete(dto.id_endereco);
        }

        return valid;
    }
}
