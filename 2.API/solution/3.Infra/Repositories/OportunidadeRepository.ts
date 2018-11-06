import Connection from "../Connections/PostgreSQLConnection";
import ReturnMessage from "../../2.Domain/Commom/ReturnMessage";
import ReturnResultDB from "../../2.Domain/Commom/ReturnResultDB";
import OportunidadeDto from "../../2.Domain/Oportunidade/Dtos/OportunidadeDto";

export default class OportunidadeRepository extends Connection
{
    constructor()
    {
        super();
    }

    public async Get(idEmpresa: number, idOportunidade: number): Promise<ReturnMessage<ReturnResultDB<OportunidadeDto[]>>>
    {
        await this.addProcedure("PR_OportunidadeGet");
        await this.addParameter([
            idEmpresa ? idEmpresa : null,
            idOportunidade ? idOportunidade : null
        ]);

        return await this.executeQuery<OportunidadeDto>();
    }

    public async Post(dto: OportunidadeDto): Promise<ReturnMessage<boolean>>
    {
        await this.addProcedure("PR_OportunidadePost");
        await this.addParameter([ 
            dto.id_empresa,
            dto.str_descricao,
            dto.dat_inicio.toLocaleString(),
            dto.dat_fim.toLocaleString(),
            dto.mon_remuneracao,
            dto.fg_supervisionado,
            dto.id_tipo_oportunidade
        ]);
        return await this.executeNonQuery();
    }

    public async Put(dto: OportunidadeDto): Promise<ReturnMessage<boolean>>
    {
        await this.addProcedure("PR_OportunidadePut");
        await this.addParameter([ 
            dto.id_oportunidade,
            dto.str_descricao,
            dto.dat_inicio.toLocaleString(),
            dto.dat_fim.toLocaleString(),
            dto.mon_remuneracao,
            dto.fg_supervisionado,
            dto.id_tipo_oportunidade   
        ]);

        return await this.executeNonQuery();
    }

    public async Delete(idOportunidade: number): Promise<ReturnMessage<boolean>>
    {
        await this.addProcedure("PR_OportunidadeDelete");
        await this.addParameter([ idOportunidade ]);

        return await this.executeNonQuery();
    }
}
