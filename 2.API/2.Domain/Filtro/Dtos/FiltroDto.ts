import ReturnMessage from "../../Commom/ReturnMessage";

export default class FiltroDto
{
    public id_filtro: number;
    public id_empresa: number;
    public id_contato: number;
    public id_tipo_oportunidade: number;
    public num_remuneracao_max: number;
    public num_remuneracao_min: number;
    
    private RM: ReturnMessage<null> = new ReturnMessage<null>(200, "Objeto válido", true);

    constructor ()
    {
        this.id_filtro = 0;
        this.id_empresa = 0;
        this.id_contato = 0;
        this.id_tipo_oportunidade = 0;
        this.num_remuneracao_max = 0.00;
        this.num_remuneracao_min = 0.00;
    }

    public isValid(action: string): ReturnMessage<null>
    {
        !isNaN(parseInt(`${this.id_filtro}`))
        ? this.id_filtro = parseInt(`${this.id_filtro}`)
        : this.id_filtro = 0;

        !isNaN(parseInt(`${this.id_empresa}`))
        ? this.id_empresa = parseInt(`${this.id_empresa}`)
        : this.id_empresa = 0;

        !isNaN(parseInt(`${this.id_contato}`))
        ? this.id_contato = parseInt(`${this.id_contato}`)
        : this.id_contato = 0;

        !isNaN(parseInt(`${this.id_tipo_oportunidade}`))
        ? this.id_tipo_oportunidade = parseInt(`${this.id_tipo_oportunidade}`)
        : this.id_tipo_oportunidade = 0;

        !isNaN(parseFloat(`${this.num_remuneracao_max}`))
        ? this.num_remuneracao_max = this.num_remuneracao_max
        : this.num_remuneracao_max = 0;

        !isNaN(parseFloat(`${this.num_remuneracao_min}`))
        ? this.num_remuneracao_min = this.num_remuneracao_min
        : this.num_remuneracao_min = 0;
        
        if(["POST", "PUT"].indexOf(action) > -1)
        {
            if(this.id_contato == 0)
                this.RM.updateStatus(400, "Identificador da Empresa Inválido", false);
        }

        if(["PUT", "DELETE"].indexOf(action) > -1)
        {
            if(this.id_filtro == 0)
                this.RM.updateStatus(400, "Identificador Inválido", false);
        }

        return this.RM;
    }
}
