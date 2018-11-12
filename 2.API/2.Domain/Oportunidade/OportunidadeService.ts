import ReturnMessage from "../Commom/ReturnMessage";
import OportunidadeDto from "./Dtos/OportunidadeDto";
import OportunidadeRepository from "../../3.Infra/Repositories/OportunidadeRepository";
import EmailEmpresaDto from "../EmailEmpresa/Dtos/EmailEmpresaDto";
import EnderecoEmpresaDto from "../EnderecoEmpresa/Dtos/EnderecoEmpresaDto";
import TelefoneEmpresaDto from "../TelefoneEmpresa/Dtos/TelefoneEmpresaDto";
import EmailEmpresaService from "../EmailEmpresa/EmailEmpresaService";
import EnderecoEmpresaService from "../EnderecoEmpresa/EnderecoEmpresaService";
import TelefoneEmpresaService from "../TelefoneEmpresa/TelefoneEmpresaService";

export default class OportunidadeService
{
    public async Get(dto: OportunidadeDto): Promise<ReturnMessage<OportunidadeDto>>
    {
        if(dto.isValid("GET").Content)
            return await new OportunidadeRepository().Get(dto.id_empresa, dto.id_tipo_oportunidade);

        return new ReturnMessage<OportunidadeDto>(400, "O parâmetro informado não foi aceito", false);
    }

    public async Post(dto: OportunidadeDto): Promise<ReturnMessage<null>>
    {
        let valid = dto.isValid("POST");
        if(valid.Content)
        {
            let rEmpresa = await this.VerifyEmpresa(dto.id_empresa);
            if (rEmpresa.StatusCode == 400)
                return rEmpresa;
            
            return await new OportunidadeRepository().Post(dto);
        }

        return valid;
    }

    public async Put(dto: OportunidadeDto): Promise<ReturnMessage<null>>
    {
        let valid = dto.isValid("PUT");
        if(valid.Content)
        {
            let rEmpresa = await this.VerifyEmpresa(dto.id_empresa);
            if (rEmpresa.StatusCode == 400)
                return rEmpresa;
            
            return await new OportunidadeRepository().Put(dto);
        }

        return valid;
    }

    public async Delete(dto: OportunidadeDto): Promise<ReturnMessage<null>>
    {
        let valid = dto.isValid("DELETE");
        if(valid.Content)
            return await new OportunidadeRepository().Delete(dto.id_oportunidade);

        return valid;
    }

    private async VerifyEmpresa(idEmpresa: number): Promise<ReturnMessage<null>>
    {
        // Verifica se a Empresa possui um e-mail cadastrado
        let dtoEmailEmp = new EmailEmpresaDto();
        dtoEmailEmp.id_empresa = idEmpresa;

        let rEmail = await new EmailEmpresaService().Get(dtoEmailEmp);
        if (rEmail.List.length == 0)
            return new ReturnMessage<null>(400, "Por favor, cadastre um E-mail válido para a Empresa", false);

        // Verifica se a Empresa possui um endereço cadastrado
        let dtoEndEmp = new EnderecoEmpresaDto();
        dtoEndEmp.id_empresa = idEmpresa;

        let rEndereco = await new EnderecoEmpresaService().Get(dtoEndEmp);
        if (rEndereco.List.length == 0)
            return new ReturnMessage<null>(400, "Por favor, cadastre um Endereço válido para a Empresa", false);

        // Verifica se a Empresa possui um telefone cadastrado
        let dtoTelEmp = new TelefoneEmpresaDto();
        dtoTelEmp.id_empresa = idEmpresa;

        let rTelefone = await new TelefoneEmpresaService().Get(dtoTelEmp);
        if (rTelefone.List.length == 0)
            return new ReturnMessage<null>(400, "Por favor, cadastre um Telefone válido para a Empresa", false);

        return new ReturnMessage<null>(200, "Dados da Empresa válidos", true);
    }
}
