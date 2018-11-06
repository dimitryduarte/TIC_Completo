import Connection from "../Connections/PostgreSQLConnection";
import ReturnMessage from "../../2.Domain/Commom/ReturnMessage";
import ReturnResultDB from "../../2.Domain/Commom/ReturnResultDB";
import TipoOportunidadeDto from "../../2.Domain/TipoOportunidade/Dtos/TipoOportunidadeDto";

export default class TipoOportunidadeRepository extends Connection
{
    constructor()
    {
        super();
    }

    public async Get(idTipoOportunidade: number): Promise<ReturnMessage<ReturnResultDB<TipoOportunidadeDto[]>>>
    {
        await this.addProcedure("PR_TipoOportunidadeGet");
        await this.addParameter(idTipoOportunidade ? [ idTipoOportunidade ] : []);

        return await this.executeQuery<TipoOportunidadeDto>();
    }

    public async Post(dto: TipoOportunidadeDto): Promise<ReturnMessage<boolean>>
    {
        await this.addProcedure("PR_TipoOportunidadePost");
        await this.addParameter([
            dto.str_descricao
        ]);

        return await this.executeNonQuery();
    }

    public async Put(dto: TipoOportunidadeDto): Promise<ReturnMessage<boolean>>
    {
        await this.addProcedure("PR_TipoOportunidadePut");
        await this.addParameter([
            dto.id_tipo_oportunidade,
            dto.str_descricao
        ]);

        return await this.executeNonQuery();
    }

    public async Delete(idTipoOportunidade: number): Promise<ReturnMessage<boolean>>
    {
        await this.addProcedure("PR_TipoOportunidadeDelete");
        await this.addParameter([ idTipoOportunidade ]);

        return await this.executeNonQuery();
    }
}
