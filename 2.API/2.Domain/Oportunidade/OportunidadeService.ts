import ReturnMessage from "../Commom/ReturnMessage";
import OportunidadeDto from "./Dtos/OportunidadeDto";
import OportunidadeRepository from "../../3.Infra/Repositories/OportunidadeRepository";

export default class OportunidadeService
{
    public async Get(dto: OportunidadeDto): Promise<ReturnMessage<OportunidadeDto>>
    {
        if(dto.isValid(true).Content)
            return await new OportunidadeRepository().Get(dto.id_empresa, dto.id_tipo_oportunidade);

        return new ReturnMessage<OportunidadeDto>(400, "O parâmetro informado não foi aceito", false);
    }

    public async Post(dto: OportunidadeDto): Promise<ReturnMessage<null>>
    {
        let valid = dto.isValid();
        if(valid.Content)
            return await new OportunidadeRepository().Post(dto);

        return valid;
    }

    public async Put(dto: OportunidadeDto): Promise<ReturnMessage<null>>
    {
        let valid = dto.isValid();
        if(valid.Content)
            return await new OportunidadeRepository().Put(dto);

        return valid;
    }

    public async Delete(dto: OportunidadeDto): Promise<ReturnMessage<null>>
    {
        if(dto.isValid(true).Content)
            return await new OportunidadeRepository().Delete(dto.id_oportunidade);

        return new ReturnMessage<null>(400, "O parâmetro informado não foi aceito", false);
    }
}
