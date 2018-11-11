import ReturnMessage from "../../Commom/ReturnMessage";

export default class EmailEmpresaDto
{
    public id_email: number;
    public id_empresa: number;
    public id_tipo_email: number;
    public str_email: string;

    private RM: ReturnMessage<null> = new ReturnMessage<null>(200, "Objeto válido", true);

    constructor ()
    {
        this.id_email = 0;
        this.id_empresa = 0;
        this.id_tipo_email = 0;
        this.str_email = "";
    }

    public isValid(action: string): ReturnMessage<null>
    {
        !isNaN(parseInt(`${this.id_email}`))
        ? this.id_email = parseInt(`${this.id_email}`)
        : this.id_email = 0;

        !isNaN(parseInt(`${this.id_empresa}`))
        ? this.id_empresa = parseInt(`${this.id_empresa}`)
        : this.id_empresa = 0;

        !isNaN(parseInt(`${this.id_tipo_email}`))
        ? this.id_tipo_email = parseInt(`${this.id_tipo_email}`)
        : this.id_tipo_email = 0;
        
        if(["POST"].indexOf(action) > -1)
        {
            if(this.id_empresa == 0)
                this.RM.updateStatus(400, "Identificador do Contato Inválido", false);

            if(this.id_tipo_email == 0)
                this.RM.updateStatus(400, "Identificador do Tipo Inválido", false);

            if(!this.str_email)
                this.RM.updateStatus(400, "Email Inválido", false);
        }
        
        if(["DELETE"].indexOf(action) > -1)
        {
            if(this.id_email == 0)
                this.RM.updateStatus(400, "Identificador Inválido", false);
        }

        return this.RM;
    }
}
