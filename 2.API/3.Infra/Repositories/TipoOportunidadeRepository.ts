import Connection from "../Connections/PostgreSQLConnection";
import ReturnMessage from "../../2.Domain/Commom/ReturnMessage";
import TipoOportunidadeDto from "../../2.Domain/TipoOportunidade/Dtos/TipoOportunidadeDto";

export default class TipoOportunidadeRepository extends Connection
{
    constructor()
    {
        super();
    }

    public async Get(idTipoOportunidade: number): Promise<ReturnMessage<TipoOportunidadeDto>>
    {
        await this.addProcedure("PR_TipoOportunidadeGet");
        await this.addParameter([
            idTipoOportunidade ? idTipoOportunidade : null
        ]);

        return await this.executeQuery<TipoOportunidadeDto>();
    }

    public async Post(dto: TipoOportunidadeDto): Promise<ReturnMessage<null>>
    {
        await this.addProcedure("PR_TipoOportunidadePost");
        await this.addParameter([
            dto.str_descricao
        ]);

        return await this.executeNonQuery();
    }

    public async Put(dto: TipoOportunidadeDto): Promise<ReturnMessage<null>>
    {
        await this.addProcedure("PR_TipoOportunidadePut");
        await this.addParameter([
            dto.id_tipo_oportunidade,
            dto.str_descricao
        ]);

        return await this.executeNonQuery();
    }

    public async Delete(idTipoOportunidade: number): Promise<ReturnMessage<null>>
    {
        await this.addProcedure("PR_TipoOportunidadeDelete");
        await this.addParameter([ idTipoOportunidade ]);

        return await this.executeNonQuery();
    }
}
