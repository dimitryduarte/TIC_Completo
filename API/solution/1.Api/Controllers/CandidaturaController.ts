import ReturnMessage from "../../2.Domain/Commom/ReturnMessage";
import ReturnResultDB from "../../2.Domain/Commom/ReturnResultDB";
import CandidaturaDto from "../../2.Domain/Candidatura/Dtos/CandidaturaDto";
import CandidaturaService from "../../2.Domain/Candidatura/CandidaturaService";

export default class CandidaturaController
{
    public async Get(dto: CandidaturaDto): Promise<ReturnMessage<ReturnResultDB<CandidaturaDto[]> | null>>
    {
        return await new CandidaturaService().Get(dto);
    }

    public async Post(dto: CandidaturaDto): Promise<ReturnMessage<ReturnResultDB<boolean> | boolean>>
    {
        return await new CandidaturaService().Post(dto);
    }

    public async Delete(dto: CandidaturaDto): Promise<ReturnMessage<ReturnResultDB<boolean> | boolean>>
    {
        return await new CandidaturaService().Delete(dto);
    }  
}
