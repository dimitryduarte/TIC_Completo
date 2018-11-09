import Connection from "../Connections/PostgreSQLConnection";
import ReturnMessage from "../../2.Domain/Commom/ReturnMessage";
import TelefoneEmpresaDto from "../../2.Domain/TelefoneEmpresa/Dtos/TelefoneEmpresaDto";

export default class TelefoneEmpresaRepository extends Connection
{
    constructor()
    {
        super();
    }

    public async Get(idEmpresa: number, idTelefone: number): Promise<ReturnMessage<TelefoneEmpresaDto>>
    {
        await this.addProcedure("PR_TelefoneEmpresaGet");
        await this.addParameter([
            idEmpresa ? idEmpresa : null,
            idTelefone ? idTelefone : null,
        ]);

        return await this.executeQuery<TelefoneEmpresaDto>();
    }

    public async Post(dto: TelefoneEmpresaDto): Promise<ReturnMessage<null>>
    {
        await this.addProcedure("PR_TelefoneEmpresaPost");
        await this.addParameter([
            dto.id_empresa,
            dto.id_tipo_telefone,
            dto.num_ddd_numero,
            dto.num_numero
        ]);

        return await this.executeNonQuery();
    }

    public async Delete(idTelefoneEmpresa: number): Promise<ReturnMessage<null>>
    {
        await this.addProcedure("PR_TelefoneEmpresaDelete");
        await this.addParameter([ idTelefoneEmpresa ]);

        return await this.executeNonQuery();
    }
}
