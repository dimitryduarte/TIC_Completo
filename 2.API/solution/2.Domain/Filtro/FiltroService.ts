import ReturnMessage from "../Commom/ReturnMessage";
import ReturnResultDB from "../Commom/ReturnResultDB";
import FiltroDto from "./Dtos/FiltroDto";
import FiltroRepository from "../../3.Infra/Repositories/FiltroRepository";

export default class FiltroService
{
    public async Get(dto: FiltroDto): Promise<ReturnMessage<ReturnResultDB<FiltroDto[]>>>
    {
        if(dto.isValid(true).Content)
            return await new FiltroRepository().Get(dto.id_filtro);

        return new ReturnMessage<ReturnResultDB<FiltroDto[]>>(400, "O parâmetro informado não foi aceito", new ReturnResultDB<FiltroDto[]>([]));
    }

    public async Post(dto: FiltroDto): Promise<ReturnMessage<boolean>>
    {
        let valid = dto.isValid(true);
        if(valid.Content)
            return await new FiltroRepository().Post(dto);

        return valid;
    }

    public async Put(dto: FiltroDto): Promise<ReturnMessage<boolean>>
    {
        let valid = dto.isValid();
        if(valid.Content)
            return await new FiltroRepository().Put(dto);

        return valid;
    }

    public async Delete(dto: FiltroDto): Promise<ReturnMessage<boolean>>
    {
        if(dto.isValid().Content)
            return await new FiltroRepository().Delete(dto.id_filtro);

        return new ReturnMessage<boolean>(400, "O parâmetro informado não foi aceito", false);
    }
}
