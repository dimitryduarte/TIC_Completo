import ReturnMessage from "../../2.Domain/Commom/ReturnMessage";
import CandidaturaDto from "./Dtos/CandidaturaDto";
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
            return await new CandidaturaRepository().Post(dto);

        return valid;
    }

    public async Delete(dto: CandidaturaDto): Promise<ReturnMessage<null>>
    {
        let valid = dto.isValid("DELETE");
        if(valid.Content)
            return await new CandidaturaRepository().Delete(dto.id_candidatura);
        
        return valid;
    }
}
