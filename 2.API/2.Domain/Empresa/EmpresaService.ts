import ReturnMessage from "../Commom/ReturnMessage";
import EmpresaDto from "./Dtos/EmpresaDto";
import EmailEmpresaDto from "../EmailEmpresa/Dtos/EmailEmpresaDto";
import TelefoneEmpresaDto from "../TelefoneEmpresa/Dtos/TelefoneEmpresaDto";
import EnderecoEmpresaDto from "../EnderecoEmpresa/Dtos/EnderecoEmpresaDto";
import EmailEmpresaService from "../EmailEmpresa/EmailEmpresaService";
import TelefoneEmpresaService from "../TelefoneEmpresa/TelefoneEmpresaService";
import EnderecoEmpresaService from "../EnderecoEmpresa/EnderecoEmpresaService";
import EmpresaRepository from "../../3.Infra/Repositories/EmpresaRepository";

export default class EmpresaService
{
    public async Get(dto: EmpresaDto): Promise<ReturnMessage<EmpresaDto>>
    {
        if(dto.isValid(true).Content)
            return await new EmpresaRepository().Get(dto.id_empresa);

        return new ReturnMessage<EmpresaDto>(400, "O parâmetro informado não foi aceito", false);
    }

    public async Post(dto: EmpresaDto): Promise<ReturnMessage<null>>
    {
        let valid = dto.isValid();
        if (!valid.Content)
            return valid;

        // Salva Informações Básicas do Empresa
        let rEmpresa = await new EmpresaRepository().Post(dto);
        if(rEmpresa.Lista == null)
            return new ReturnMessage<null>(rEmpresa.StatusCode, rEmpresa.Message, false); 

        if (rEmpresa.Lista.length == 0)
            return new ReturnMessage<null>(rEmpresa.StatusCode, rEmpresa.Message, false);

        Object.assign(dto, rEmpresa.Lista[0]);

        return await this.SaveAnotherInfo(dto);
    }

    public async Put(dto: EmpresaDto): Promise<ReturnMessage<null>>
    {
        let valid = dto.isValid();
        if (!valid.Content)
            return valid;

        // Salva Informações Básicas do Empresa
        let rEmpresa = await new EmpresaRepository().Put(dto);
        if (!rEmpresa.Content)
            return rEmpresa;

        return await this.SaveAnotherInfo(dto);
    }

    public async Delete(dto: EmpresaDto): Promise<ReturnMessage<null>>
    {
        if(dto.isValid().Content)
            return await new EmpresaRepository().Delete(dto.id_empresa);

        return new ReturnMessage<null>(400, "O parâmetro informado não foi aceito", false);
    }

    private async SaveAnotherInfo(dto: EmpresaDto): Promise<ReturnMessage<null>>
    {
        // Salva Email do Empresa
        for (let i = 0; i < dto.emailEmpresa.length; i++)
        {
            let email: EmailEmpresaDto =  new EmailEmpresaDto();

            Object.assign(email, dto.emailEmpresa[i]);
            email.id_empresa = dto.id_empresa;

            let rEmail = await new EmailEmpresaService().Post(email);

            if (!rEmail.Content)
                return rEmail;
        }

        // Salva Telefone do Empresa
        for (let i = 0; i < dto.telefoneEmpresa.length; i++)
        {
            let telefone: TelefoneEmpresaDto =  new TelefoneEmpresaDto();

            Object.assign(telefone, dto.telefoneEmpresa[i]);
            telefone.id_empresa = dto.id_empresa;

            let rTelefone = await new TelefoneEmpresaService().Post(telefone);

            if (!rTelefone.Content)
                return rTelefone;
        }

        // Salva Endereço do Empresa
        for (let i = 0; i < dto.enderecoEmpresa.length; i++)
        {
            let endereco: EnderecoEmpresaDto =  new EnderecoEmpresaDto();

            Object.assign(endereco, dto.enderecoEmpresa[i]);
            endereco.id_empresa = dto.id_empresa;

            let rEndereco = await new EnderecoEmpresaService().Post(endereco);

            if (!rEndereco.Content)
                return rEndereco;
        }
        
        return new ReturnMessage<null>(200, "SUCESSO !!!", true);
    }
}
