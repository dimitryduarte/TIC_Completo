import ReturnMessage from "../../2.Domain/Commom/ReturnMessage";
import ReturnResultDB from "../../2.Domain/Commom/ReturnResultDB";
import CandidaturaDto from "./Dtos/CandidaturaDto";
import CandidaturaRepository from "../../3.Infra/Repositories/CandidaturaRepository";

export default class CandidaturaService
{
    public async Get(dto: CandidaturaDto): Promise<ReturnMessage<ReturnResultDB<CandidaturaDto[]>>>
    {
        if(dto.isValid(true).Content)
            return await new CandidaturaRepository().Get(dto.id_oportunidade, dto.id_candidatura, dto.id_candidatura);
        
        return new ReturnMessage<ReturnResultDB<CandidaturaDto[]>>(400, "O parâmetro informado não foi aceito", new ReturnResultDB<CandidaturaDto[]>([]));
    }

    public async Post(dto: CandidaturaDto): Promise<ReturnMessage<boolean>>
    {
        let valid = dto.isValid();
        if(valid.Content)
            return await new CandidaturaRepository().Post(dto);

        return valid;
    }

    public async Delete(dto: CandidaturaDto): Promise<ReturnMessage<boolean>>
    {
        if(dto.isValid().Content)
            return await new CandidaturaRepository().Delete(dto.id_candidatura);
        
        return new ReturnMessage<boolean>(400, "O parâmetro informado não foi aceito", false);
    }
}
