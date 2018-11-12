import ReturnMessage from "../../Commom/ReturnMessage";

export default class OportunidadeDto
{
    public id_oportunidade: number;
    public id_empresa: number;
    public num_vaga: number;
    public id_tipo_oportunidade: number;
    public num_remuneracao: number;
    public str_descricao: string;
    public dat_inicio: Date;
    public dat_fim: Date;
    public fg_status: boolean;
    
    private RM: ReturnMessage<null> = new ReturnMessage<null>(200, "Objeto válido", true);

    constructor ()
    {
        this.id_oportunidade = 0;
        this.id_empresa = 0;
        this.num_vaga = 0;
        this.id_tipo_oportunidade = 0;
        this.num_remuneracao = 0;
        this.str_descricao = "";
        this.dat_inicio = new Date();
        this.dat_fim = new Date();
        this.fg_status = false;
    }

    public isValid(action: string): ReturnMessage<null>
    {
        !isNaN(parseInt(`${this.id_oportunidade}`))
        ? this.id_oportunidade = parseInt(`${this.id_oportunidade}`)
        : this.id_oportunidade = 0;
        
        !isNaN(parseInt(`${this.id_empresa}`))
        ? this.id_empresa = parseInt(`${this.id_empresa}`)
        : this.id_empresa = 0;

        !isNaN(parseInt(`${this.num_vaga}`))
        ? this.num_vaga = parseInt(`${this.num_vaga}`)
        : this.num_vaga = 0;

        !isNaN(parseInt(`${this.id_tipo_oportunidade}`))
        ? this.id_tipo_oportunidade = parseInt(`${this.id_tipo_oportunidade}`)
        : this.id_tipo_oportunidade = 0;

        this.num_remuneracao
        ? this.num_remuneracao = this.num_remuneracao
        : this.num_remuneracao = 0;

        let dateInicio = new Date(this.dat_inicio);
        dateInicio.getDay() && dateInicio.getMonth() && dateInicio.getFullYear()
        ? this.dat_inicio = new Date(this.dat_inicio)
        : this.dat_inicio = new Date("2000-01-01");

        let dateFim = new Date(this.dat_fim);
        dateFim.getDay() && dateFim.getMonth() && dateFim.getFullYear()
        ? this.dat_fim = new Date(this.dat_fim)
        : this.dat_fim = new Date("2000-01-01");

        this.fg_status
        ? this.fg_status = true
        : this.fg_status = false;
        
        if(["POST", "PUT"].indexOf(action) > -1)
        {
            if(this.id_empresa == 0) 
                this.RM.updateStatus(400, "Identificador da Empresa Inválido", false);

            if(this.num_vaga == 0)
                this.RM.updateStatus(400, "Vagas Inválidas", false);

            if(this.id_tipo_oportunidade == 0)
                this.RM.updateStatus(400, "Identificador do Tipo Inválido", false);
            
            if(this.num_remuneracao == 0)
                this.RM.updateStatus(400, "Valor Remuneração Inválido", false);

            if(!this.str_descricao) 
                this.RM.updateStatus(400, "Descrição Inválida", false);

            if(this.dat_inicio == new Date("2000-01-01"))
                this.RM.updateStatus(400, "Data de Inicio Inválida", false);

            if(this.dat_fim == new Date("2000-01-01"))
                this.RM.updateStatus(400, "Data de Fim Inválida", false);
        }

        if(["PUT", "DELETE"].indexOf(action) > -1)
        {
            if(this.id_oportunidade == 0) 
                this.RM.updateStatus(400, "Identificador Inválido", false);
        }

        return this.RM;
    }
}
