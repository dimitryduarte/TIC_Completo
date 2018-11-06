import Connection from "../Connections/PostgreSQLConnection";
import ReturnMessage from "../../2.Domain/Commom/ReturnMessage";
import ReturnResultDB from "../../2.Domain/Commom/ReturnResultDB";
import ContatoDto from "../../2.Domain/Contato/Dtos/ContatoDto";

export default class ContatoRepository extends Connection
{
    constructor()
    {
        super();
    }

    public async Get(idContato: number): Promise<ReturnMessage<ReturnResultDB<ContatoDto[]>>>
    {
        await this.addProcedure("PR_ContatoGet");
        await this.addParameter(idContato ? [ idContato ] : []);

        return await this.executeQuery<ContatoDto>();
    }

    public async Post(dto: ContatoDto): Promise<ReturnMessage<boolean>>
    {
        await this.addProcedure("PR_ContatoPost");
        await this.addParameter([ 
            dto.id_contato,
            dto.str_observacao,
            dto.num_criatividade,
            dto.num_comunicacao,
            dto.num_colaboracao,
            dto.num_lideranca
        ]);

        return await this.executeNonQuery();
    }

    public async Put(dto: ContatoDto): Promise<ReturnMessage<boolean>>
    {
        await this.addProcedure("PR_ContatoPut");
        await this.addParameter([ 
            dto.id_contato,
            dto.str_observacao,
            dto.num_criatividade,
            dto.num_comunicacao,
            dto.num_colaboracao,
            dto.num_lideranca
        ]);

        return await this.executeNonQuery();
    }

    public async Delete(idContato: number): Promise<ReturnMessage<boolean>>
    {
        await this.addProcedure("PR_ContatoDelete");
        await this.addParameter([ idContato ]);

        return await this.executeNonQuery();
    }
}
