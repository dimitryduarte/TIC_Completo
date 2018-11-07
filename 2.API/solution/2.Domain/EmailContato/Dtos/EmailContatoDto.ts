import ReturnMessage from "../../Commom/ReturnMessage";

export default class EmailContatoDto
{
    public id_email: number;
    public id_contato: number;
    public id_tipo_email: number;
    public str_email: string;

    private returnMessage: ReturnMessage<boolean> = new ReturnMessage<boolean>(200, "Objeto válido", true);

    constructor ()
    {
        this.id_email = 0;
        this.id_contato = 0;
        this.id_tipo_email = 0;
        this.str_email = "";
    }

    public isValid(isGet: boolean = false): ReturnMessage<boolean>
    {
        !isNaN(parseInt(`${this.id_email}`))
        ? this.id_email = parseInt(`${this.id_email}`)
        : this.id_email = 0;

        !isNaN(parseInt(`${this.id_contato}`))
        ? this.id_contato = parseInt(`${this.id_contato}`)
        : this.id_contato = 0;

        !isNaN(parseInt(`${this.id_tipo_email}`))
        ? this.id_tipo_email = parseInt(`${this.id_tipo_email}`)
        : this.id_tipo_email = 0;
        
        if(!isGet)
        {
            if(this.id_contato == 0)
                this.returnMessage.updateStatus(400, "Número do Contato Inválido", false);

            if(this.id_tipo_email == 0)
                this.returnMessage.updateStatus(400, "Número do Tipo de Email Inválido", false);

            if(!this.str_email)
                this.returnMessage.updateStatus(400, "Email Inválido", false);
        }

        return this.returnMessage;
    }
}