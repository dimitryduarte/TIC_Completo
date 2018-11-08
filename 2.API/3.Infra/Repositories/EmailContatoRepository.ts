import Connection from "../Connections/PostgreSQLConnection";
import ReturnMessage from "../../2.Domain/Commom/ReturnMessage";
import ReturnResultDB from "../../2.Domain/Commom/ReturnResultDB";
import EmailContatoDto from "../../2.Domain/EmailContato/Dtos/EmailContatoDto";

export default class EmailContatoRepository extends Connection
{
    constructor()
    {
        super();
    }

    public async Get(idContato: number, idEmail: number): Promise<ReturnMessage<EmailContatoDto>>
    {
        await this.addProcedure("PR_EmailContatoGet");
        await this.addParameter([
            idContato ? idContato : null,
            idEmail ? idEmail : null
         ]);

        return await this.executeQuery<EmailContatoDto>();
    }

    public async Post(dto: EmailContatoDto): Promise<ReturnMessage<null>>
    {
        await this.addProcedure("PR_EmailContatoPost");
        await this.addParameter([
            dto.id_contato,
            dto.id_tipo_email,
            dto.str_email
        ]);

        return await this.executeNonQuery();
    }

    public async Delete(idEmailContato: number): Promise<ReturnMessage<null>>
    {
        await this.addProcedure("PR_EmailContatoDelete");
        await this.addParameter([ idEmailContato ]);

        return await this.executeNonQuery();
    }
}
