import Connection from "../Connections/PostgreSQLConnection";
import ReturnMessage from "../../2.Domain/Commom/ReturnMessage";
import ReturnResultDB from "../../2.Domain/Commom/ReturnResultDB";
import EmpresaDto from "../../2.Domain/Empresa/Dtos/EmpresaDto";

export default class EmpresaRepository extends Connection
{
    constructor()
    {
        super();
    }

    public async Get(idEmpresa: number): Promise<ReturnMessage<ReturnResultDB<EmpresaDto[]>>>
    {
        await this.addProcedure("PR_EmpresaGet");
        await this.addParameter(idEmpresa ? [ idEmpresa ] : []);

        return await this.executeQuery<EmpresaDto>();
    }

    public async Post(dto: EmpresaDto): Promise<ReturnMessage<ReturnResultDB<EmpresaDto[]>>>
    {
        await this.addProcedure("PR_EmpresaPost");
        await this.addParameter([ 
            dto.str_nome,
            dto.num_cnpj,
            dto.num_inscricao_estadual,
            dto.num_inscricao_municipal,
            dto.str_razao_social
        ]);

        return await this.executeQuery<EmpresaDto>();
    }

    public async Put(dto: EmpresaDto): Promise<ReturnMessage<boolean>>
    {
        await this.addProcedure("PR_EmpresaPut");
        await this.addParameter([ 
            dto.id_empresa,
            dto.str_nome,
            dto.num_cnpj,
            dto.num_inscricao_estadual,
            dto.num_inscricao_municipal,
            dto.str_razao_social
        ]);

        return await this.executeNonQuery();
    }

    public async Delete(idEmpresa: number): Promise<ReturnMessage<boolean>>
    {
        await this.addProcedure("PR_EmpresaDelete");
        await this.addParameter([ idEmpresa ]);

        return await this.executeNonQuery();
    }
}
