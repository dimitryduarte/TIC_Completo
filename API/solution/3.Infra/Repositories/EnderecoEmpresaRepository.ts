import Connection from "../Connections/PostgreSQLConnection";
import ReturnMessage from "../../2.Domain/Commom/ReturnMessage";
import ReturnResultDB from "../../2.Domain/Commom/ReturnResultDB";
import EnderecoEmpresaDto from "../../2.Domain/EnderecoEmpresa/Dtos/EnderecoEmpresaDto";

export default class EnderecoEmpresaRepository extends Connection
{
    constructor()
    {
        super();
    }

    public async Get(idEmpresa: number, idEndereco: number): Promise<ReturnMessage<ReturnResultDB<EnderecoEmpresaDto[]>>>
    {
        await this.addProcedure("PR_EnderecoEmpresaGet");
        await this.addParameter([
            idEmpresa ? idEmpresa : null,
            idEndereco ? idEndereco : null
        ]);

        return await this.executeQuery<EnderecoEmpresaDto>();
    }

    public async Post(dto: EnderecoEmpresaDto): Promise<ReturnMessage<boolean>>
    {
        await this.addProcedure("PR_EnderecoEmpresaPost");
        await this.addParameter([
            dto.id_empresa,
            dto.id_tipo_endereco,
            dto.num_cep,
            dto.str_logradouro,
            dto.num_numero,
            dto.str_bairro,
            dto.str_cidade,
            dto.str_uf
        ]);

        return await this.executeNonQuery();
    }

    public async Delete(idEnderecoEmpresa: number): Promise<ReturnMessage<boolean>>
    {
        await this.addProcedure("PR_EnderecoEmpresaDelete");
        await this.addParameter([ idEnderecoEmpresa ]);

        return await this.executeNonQuery();
    }
}
