import ReturnMessage from "../Commom/ReturnMessage";
import ReturnResultDB from "../Commom/ReturnResultDB";
import OportunidadeDto from "./Dtos/OportunidadeDto";
import OportunidadeRepository from "../../3.Infra/Repositories/OportunidadeRepository";

export default class OportunidadeService
{
    public async Get(dto: OportunidadeDto): Promise<ReturnMessage<ReturnResultDB<OportunidadeDto[]>>>
    {
        if(dto.isValid(true).Content)
            return await new OportunidadeRepository().Get(dto.id_empresa, dto.id_tipo_oportunidade);

        return new ReturnMessage<ReturnResultDB<OportunidadeDto[]>>(400, "O parâmetro informado não foi aceito", new ReturnResultDB<OportunidadeDto[]>([]));
    }

    public async Post(dto: OportunidadeDto): Promise<ReturnMessage<boolean>>
    {
        let valid = dto.isValid();
        if(valid.Content)
            return await new OportunidadeRepository().Post(dto);

        return valid;
    }

    public async Put(dto: OportunidadeDto): Promise<ReturnMessage<boolean>>
    {
        let valid = dto.isValid();
        if(valid.Content)
            return await new OportunidadeRepository().Put(dto);

        return valid;
    }

    public async Delete(dto: OportunidadeDto): Promise<ReturnMessage<boolean>>
    {
        if(dto.isValid(true).Content)
            return await new OportunidadeRepository().Delete(dto.id_oportunidade);

        return new ReturnMessage<boolean>(400, "O parâmetro informado não foi aceito", false);
    }
}
