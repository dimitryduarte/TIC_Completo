import Connection from "../Connections/PostgreSQLConnection";
import ReturnMessage from "../../2.Domain/Commom/ReturnMessage";
import EmailEmpresaDto from "../../2.Domain/EmailEmpresa/Dtos/EmailEmpresaDto";

export default class EmailEmpresaRepository extends Connection
{
    constructor()
    {
        super();
    }

    public async Get(idEmpresa: number, idEmail: number): Promise<ReturnMessage<EmailEmpresaDto>>
    {
        await this.addProcedure("PR_EmailEmpresaGet");
        await this.addParameter([
            idEmpresa ? idEmpresa : null,
            idEmail ? idEmail : null
        ]);

        return await this.executeQuery<EmailEmpresaDto>();
    }

    public async Post(dto: EmailEmpresaDto): Promise<ReturnMessage<null>>
    {
        await this.addProcedure("PR_EmailEmpresaPost");
        await this.addParameter([
            dto.id_empresa,
            dto.id_tipo_email,
            dto.str_email
        ]);

        return await this.executeNonQuery();
    }

    public async Delete(idEmailEmpresa: number): Promise<ReturnMessage<null>>
    {
        await this.addProcedure("PR_EmailEmpresaDelete");
        await this.addParameter([ idEmailEmpresa ]);

        return await this.executeNonQuery();
    }
}
