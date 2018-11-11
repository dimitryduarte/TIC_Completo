import ReturnMessage from "../../Commom/ReturnMessage";

export default class TelefoneContatoDto
{
    public id_telefone: number;
    public id_contato: number;
    public id_tipo_telefone: number;
    public num_ddd_numero: number;
    public num_numero: number;

    private RM: ReturnMessage<null> = new ReturnMessage<null>(200, "Objeto válido", true);

    constructor ()
    {
        this.id_telefone = 0;
        this.id_contato = 0;
        this.id_tipo_telefone = 0;
        this.num_ddd_numero = 0;
        this.num_numero = 0;
    }

    public isValid(action: string): ReturnMessage<null>
    {
        !isNaN(parseInt(`${this.id_telefone}`))
        ? this.id_telefone = parseInt(`${this.id_telefone}`)
        : this.id_telefone = 0;

        !isNaN(parseInt(`${this.id_contato}`))
        ? this.id_contato = parseInt(`${this.id_contato}`)
        : this.id_contato = 0;

        !isNaN(parseInt(`${this.id_tipo_telefone}`))
        ? this.id_tipo_telefone = parseInt(`${this.id_tipo_telefone}`)
        : this.id_tipo_telefone = 0;

        !isNaN(parseInt(`${this.num_ddd_numero}`))
        ? this.num_ddd_numero = parseInt(`${this.num_ddd_numero}`)
        : this.num_ddd_numero = 0;

        !isNaN(parseInt(`${this.num_numero}`))
        ? this.num_numero = parseInt(`${this.num_numero}`)
        : this.num_numero = 0;
        
        if(["POST"].indexOf(action) > -1)
        {
            if(this.id_contato == 0)
                this.RM.updateStatus(400, "Identificador do Contato Inválido", false);

            else if(this.id_tipo_telefone == 0)
                this.RM.updateStatus(400, "Identificador do Tipo Inválido", false);

            else if(this.num_ddd_numero == 0)
                this.RM.updateStatus(400, "DDD Inválido", false);

            else if(this.num_numero == 0)
                this.RM.updateStatus(400, "Número Inválido", false);
        }

        if(["DELETE"].indexOf(action) > -1)
        {
            if(this.id_telefone == 0)
                this.RM.updateStatus(400, "Identificador Inválido", false);
        }

        return this.RM;
    }
}
