import Connection from "../Connections/PostgreSQLConnection";
import ReturnMessage from "../../2.Domain/Commom/ReturnMessage";
import ReturnResultDB from "../../2.Domain/Commom/ReturnResultDB";
import TipoEnderecoDto from "../../2.Domain/TipoEndereco/Dtos/TipoEnderecoDto";

export default class TipoEnderecoRepository extends Connection
{
    constructor()
    {
        super();
    }

    public async Get(idTipoEndereco: number): Promise<ReturnMessage<ReturnResultDB<TipoEnderecoDto[]>>>
    {
        await this.addProcedure("PR_TipoEnderecoGet");
        await this.addParameter(idTipoEndereco ? [ idTipoEndereco ] : []);

        return await this.executeQuery<TipoEnderecoDto>();
    }

    public async Post(dto: TipoEnderecoDto): Promise<ReturnMessage<boolean>>
    {
        await this.addProcedure("PR_TipoEnderecoPost");
        await this.addParameter([
            dto.str_descricao
        ]);

        return await this.executeNonQuery();
    }

    public async Put(dto: TipoEnderecoDto): Promise<ReturnMessage<boolean>>
    {
        await this.addProcedure("PR_TipoEnderecoPut");
        await this.addParameter([
            dto.id_tipo_endereco,
            dto.str_descricao
        ]);

        return await this.executeNonQuery();
    }

    public async Delete(idTipoEndereco: number): Promise<ReturnMessage<boolean>>
    {
        await this.addProcedure("PR_TipoEnderecoDelete");
        await this.addParameter([ idTipoEndereco ]);

        return await this.executeNonQuery();
    }
}
