import ReturnMessage from "../../Commom/ReturnMessage";

export default class TelefoneContatoDto
{
    public id_telefone: number;
    public id_contato: number;
    public id_tipo_telefone: number;
    public num_ddd_numero: number;
    public num_numero: number;

    private returnMessage: ReturnMessage<null> = new ReturnMessage<null>(200, "Objeto válido", true);

    constructor ()
    {
        this.id_telefone = 0;
        this.id_contato = 0;
        this.id_tipo_telefone = 0;
        this.num_ddd_numero = 0;
        this.num_numero = 0;
    }

    public isValid(isGet: boolean = false): ReturnMessage<null>
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
        
        if(!isGet)
        {
            if(this.id_contato == 0)
                this.returnMessage.updateStatus(400, "Número do Contato Inválido", false);

            if(this.id_tipo_telefone == 0)
                this.returnMessage.updateStatus(400, "Número do Tipo de Telefone Inválido", false);

            if(this.num_ddd_numero == 0)
                this.returnMessage.updateStatus(400, "DDD Telefone Inválido", false);

            if(this.num_numero == 0)
                this.returnMessage.updateStatus(400, "Número Telefone Inválido", false);
        }

        return this.returnMessage;
    }
}
