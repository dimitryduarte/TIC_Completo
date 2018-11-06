import ReturnMessage from "../Commom/ReturnMessage";
import ReturnResultDB from "../Commom/ReturnResultDB";
import TipoEmailDto from "./Dtos/TipoEmailDto";
import TipoEmailRepository from "../../3.Infra/Repositories/TipoEmailRepository";

export default class TipoemailService
{
    public async Get(dto: TipoEmailDto): Promise<ReturnMessage<ReturnResultDB<TipoEmailDto[]>>>
    {
        if(dto.isValid(true).Content)
            return await new TipoEmailRepository().Get(dto.id_tipo_email);

        return new ReturnMessage<ReturnResultDB<TipoEmailDto[]>>(400, "O parâmetro informado não foi aceito", new ReturnResultDB<TipoEmailDto[]>([]));
    }

    public async Post(dto: TipoEmailDto): Promise<ReturnMessage<boolean>>
    {
        let valid = dto.isValid();
        if(valid.Content)
            return await new TipoEmailRepository().Post(dto);

        return valid;
    }

    public async Put(dto: TipoEmailDto): Promise<ReturnMessage<boolean>>
    {
        let valid = dto.isValid();
        if(valid.Content)
            return await new TipoEmailRepository().Put(dto);

        return valid;
    }

    public async Delete(dto: TipoEmailDto): Promise<ReturnMessage<boolean>>
    {
        if(dto.isValid().Content)
            return await new TipoEmailRepository().Delete(dto.id_tipo_email);

        return new ReturnMessage<boolean>(400, "O parâmetro informado não foi aceito", false);
    }
}
