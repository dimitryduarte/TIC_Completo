import Connection from "../Connections/PostgreSQLConnection";
import ReturnMessage from "../../2.Domain/Commom/ReturnMessage";
import TipoEmailDto from "../../2.Domain/TipoEmail/Dtos/TipoEmailDto";

export default class TipoEmailRepository extends Connection
{
    constructor()
    {
        super();
    }

    public async Get(idTipoEmail: number): Promise<ReturnMessage<TipoEmailDto>>
    {
        await this.addProcedure("PR_TipoEmailGet");
        await this.addParameter([
            idTipoEmail ? idTipoEmail : null
        ]);

        return await this.executeQuery<TipoEmailDto>();
    }

    public async Post(dto: TipoEmailDto): Promise<ReturnMessage<null>>
    {
        await this.addProcedure("PR_TipoEmailPost");
        await this.addParameter([
            dto.str_descricao
        ]);

        return await this.executeNonQuery();
    }

    public async Put(dto: TipoEmailDto): Promise<ReturnMessage<null>>
    {
        await this.addProcedure("PR_TipoEmailPut");
        await this.addParameter([
            dto.id_tipo_email,
            dto.str_descricao
        ]);

        return await this.executeNonQuery();
    }

    public async Delete(idTipoEmail: number): Promise<ReturnMessage<null>>
    {
        await this.addProcedure("PR_TipoEmailDelete");
        await this.addParameter([ idTipoEmail ]);

        return await this.executeNonQuery();
    }
}
