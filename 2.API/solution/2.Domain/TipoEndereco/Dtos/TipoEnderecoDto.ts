import ReturnMessage from "../../Commom/ReturnMessage";

export default class TipoEnderecoDto
{
    public id_tipo_endereco: number;
    public str_descricao: string;
    public fg_status: boolean;

    private returnMessage: ReturnMessage<boolean> = new ReturnMessage<boolean>(200, "Objeto válido", true);
    
    constructor ()
    {
        this.id_tipo_endereco = 0;
        this.str_descricao = "";
        this.fg_status = false;
    }

    public isValid(isGet: boolean = false)
    {
        !isNaN(parseInt(`${this.id_tipo_endereco}`))
        ? this.id_tipo_endereco = parseInt(`${this.id_tipo_endereco}`)
        : this.id_tipo_endereco = 0;
        
        this.fg_status
        ? this.fg_status = true
        : this.fg_status = false;

        if(!isGet)
        {
        }

        return this.returnMessage;
    }
}
