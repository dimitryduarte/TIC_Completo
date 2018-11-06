import ReturnMessage from "../../Commom/ReturnMessage";

export default class EmailEmpresaDto
{
    public id_endereco: number;
    public id_empresa: number;
    public id_tipo_endereco: number;
    public num_cep: number;
    public str_logradouro: string;
    public num_numero: number;
    public str_bairro: string;
    public str_cidade: string;
    public str_uf: string;

    private returnMessage: ReturnMessage<boolean> = new ReturnMessage<boolean>(200, "Objeto válido", true);

    constructor ()
    {
        this.id_endereco = 0;
        this.id_empresa = 0;
        this.id_tipo_endereco = 0;
        this.num_cep = 0;
        this.str_logradouro = "";
        this.num_numero = 0;
        this.str_bairro = "";
        this.str_cidade = "";
        this.str_uf = "";
    }

    public isValid(isGet: boolean = false): ReturnMessage<boolean>
    {
        !isNaN(parseInt(`${this.id_endereco}`))
        ? this.id_endereco = parseInt(`${this.id_endereco}`)
        : this.id_endereco = 0;

        !isNaN(parseInt(`${this.id_empresa}`))
        ? this.id_empresa = parseInt(`${this.id_empresa}`)
        : this.id_empresa = 0;

        !isNaN(parseInt(`${this.id_tipo_endereco}`))
        ? this.id_tipo_endereco = parseInt(`${this.id_tipo_endereco}`)
        : this.id_tipo_endereco = 0;

        !isNaN(parseInt(`${this.num_cep}`))
        ? this.num_cep = parseInt(`${this.num_cep}`)
        : this.num_cep = 0;

        !isNaN(parseInt(`${this.num_numero}`))
        ? this.num_numero = parseInt(`${this.num_numero}`)
        : this.num_numero = 0;
        
        if(!isGet)
        {
            if(this.id_empresa == 0)
                this.returnMessage.updateStatus(400, "Número do Contato Inválido", false);

            if(this.id_tipo_endereco == 0)
                this.returnMessage.updateStatus(400, "Número do Tipo de Email Inválido", false);

            if(this.num_cep == 0)
                this.returnMessage.updateStatus(400, "Número do CEP Inválido", false);

            if(!this.str_logradouro)
                this.returnMessage.updateStatus(400, "Logradouro Inválido", false);

            if(this.num_numero == 0)
                this.returnMessage.updateStatus(400, "Número do Endereço Inválido", false);

            if(!this.str_bairro)
                this.returnMessage.updateStatus(400, "Bairro Inválido", false);

            if(!this.str_cidade)
                this.returnMessage.updateStatus(400, "Cidade Inválido", false);

            if(!this.str_uf)
                this.returnMessage.updateStatus(400, "Estado Inválido", false);
        }

        return this.returnMessage;
    }
}
