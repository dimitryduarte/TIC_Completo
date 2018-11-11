import ReturnMessage from "../../Commom/ReturnMessage";

export default class TipoOportunidadeDto
{
    public id_tipo_oportunidade: number;
    public str_descricao: string;
    public fg_status: boolean;

    private RM: ReturnMessage<null> = new ReturnMessage<null>(200, "Objeto válido", true);
    
    constructor ()
    {
        this.id_tipo_oportunidade = 0;
        this.str_descricao = "";
        this.fg_status = false;
    }

    public isValid(action: string) : ReturnMessage<null>
    {
        !isNaN(parseInt(`${this.id_tipo_oportunidade}`))
        ? this.id_tipo_oportunidade = parseInt(`${this.id_tipo_oportunidade}`)
        : this.id_tipo_oportunidade = 0;
        
        this.fg_status
        ? this.fg_status = true
        : this.fg_status = false;

        if(["PUT", "DELETE"].indexOf(action) > -1)
        {
            if(this.id_tipo_oportunidade == 0)
                this.RM.updateStatus(400, "Identificador Inválido", false);
        }

        if(["POST", "PUT"].indexOf(action) > -1)
        {       
            if(!this.str_descricao)
                this.RM.updateStatus(400, "Descrição Inválida", false);
        }

        return this.RM;
    }
}
