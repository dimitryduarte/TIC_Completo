import Connection from "../Connections/PostgreSQLConnection";
import ReturnMessage from "../../2.Domain/Commom/ReturnMessage";
import TelefoneContatoDto from "../../2.Domain/TelefoneContato/Dtos/TelefoneContatoDto";

export default class TelefoneContatoRepository extends Connection
{
    constructor()
    {
        super();
    }

    public async Get(idContato: number, idTelefone: number): Promise<ReturnMessage<TelefoneContatoDto>>
    {
        await this.addProcedure("PR_TelefoneContatoGet");
        await this.addParameter([
            idContato ? idContato : null,
            idTelefone ? idTelefone : null
        ]);

        return await this.executeQuery<TelefoneContatoDto>();
    }

    public async Post(dto: TelefoneContatoDto): Promise<ReturnMessage<null>>
    {
        await this.addProcedure("PR_TelefoneContatoPost");
        await this.addParameter([
            dto.id_contato,
            dto.id_tipo_telefone,
            dto.num_ddd_numero,
            dto.num_numero
        ]);

        return await this.executeNonQuery();
    }

    public async Delete(idTelefoneContato: number): Promise<ReturnMessage<null>>
    {
        await this.addProcedure("PR_TelefoneContatoDelete");
        await this.addParameter([ idTelefoneContato ]);

        return await this.executeNonQuery();
    }
}
