import ReturnMessage from "../../2.Domain/Commom/ReturnMessage";
import CandidaturaDto from "./Dtos/CandidaturaDto";
import EmailContatoDto from "../EmailContato/Dtos/EmailContatoDto";
import TelefoneContatoDto from "../TelefoneContato/Dtos/TelefoneContatoDto";
import EmailContatoService from "../EmailContato/EmailContatoService";
import TelefoneContatoService from "../TelefoneContato/TelefoneContatoService";
import CandidaturaRepository from "../../3.Infra/Repositories/CandidaturaRepository";

export default class CandidaturaService
{
    public async Get(dto: CandidaturaDto): Promise<ReturnMessage<CandidaturaDto>>
    {
        if(dto.isValid("GET").Content)
            return await new CandidaturaRepository().Get(dto.id_oportunidade, dto.id_candidatura, dto.id_candidatura);
        
        return new ReturnMessage<CandidaturaDto>(400, "O parâmetro informado não foi aceito", false);
    }

    public async Post(dto: CandidaturaDto): Promise<ReturnMessage<null>>
    {
        let valid = dto.isValid("POST");
        if(valid.Content)
        {
            let rContato = await this.VerifyContato(dto.id_contato);
            if (rContato.StatusCode == 400)
                return rContato;
                
            return await new CandidaturaRepository().Post(dto);
        }

        return valid;
    }

    public async Delete(dto: CandidaturaDto): Promise<ReturnMessage<null>>
    {
        let valid = dto.isValid("DELETE");
        if(valid.Content)
            return await new CandidaturaRepository().Delete(dto.id_candidatura);
        
        return valid;
    }

    private async VerifyContato(idContato: number): Promise<ReturnMessage<null>>
    {
        // Verifica se a Contato possui um e-mail cadastrado
        let dtoEmailCont = new EmailContatoDto();
        dtoEmailCont.id_contato = idContato;

        let rEmail = await new EmailContatoService().Get(dtoEmailCont);
        if (rEmail.List.length == 0)
            return new ReturnMessage<null>(400, "Por favor, cadastre um E-mail válido para o Contato", false);

        // Verifica se a Contato possui um telefone cadastrado
        let dtoTelCont = new TelefoneContatoDto();
        dtoTelCont.id_contato = idContato;

        let rTelefone = await new TelefoneContatoService().Get(dtoTelCont);
        if (rTelefone.List.length == 0)
            return new ReturnMessage<null>(400, "Por favor, cadastre um Telefone válido para o Contato", false);

        return new ReturnMessage<null>(200, "Dados do Contato válidos", true);
    }
}
