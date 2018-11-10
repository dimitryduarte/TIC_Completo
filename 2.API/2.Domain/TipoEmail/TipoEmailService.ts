import ReturnMessage from "../Commom/ReturnMessage";
import TipoEmailDto from "./Dtos/TipoEmailDto";
import TipoEmailRepository from "../../3.Infra/Repositories/TipoEmailRepository";

export default class TipoemailService
{
    public async Get(dto: TipoEmailDto): Promise<ReturnMessage<TipoEmailDto>>
    {
        if(dto.isValid("GET").Content)
            return await new TipoEmailRepository().Get(dto.id_tipo_email);

        return new ReturnMessage<TipoEmailDto>(400, "O parâmetro informado não foi aceito", false);
    }

    public async Post(dto: TipoEmailDto): Promise<ReturnMessage<null>>
    {
        let valid = dto.isValid("POST");
        if(valid.Content)
            return await new TipoEmailRepository().Post(dto);

        return valid;
    }

    public async Put(dto: TipoEmailDto): Promise<ReturnMessage<null>>
    {
        let valid = dto.isValid("PUT");
        if(valid.Content)
            return await new TipoEmailRepository().Put(dto);

        return valid;
    }

    public async Delete(dto: TipoEmailDto): Promise<ReturnMessage<null>>
    {
        if(dto.isValid("DELETE").Content)
            return await new TipoEmailRepository().Delete(dto.id_tipo_email);

        return new ReturnMessage<null>(400, "O parâmetro informado não foi aceito", false);
    }
}
