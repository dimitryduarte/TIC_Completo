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

    private RM: ReturnMessage<null> = new ReturnMessage<null>(200, "Objeto válido", true);

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

    public isValid(action: string): ReturnMessage<null>
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
        
        if(["POST"].indexOf(action) > -1)
        {
            if(this.id_empresa == 0)
                this.RM.updateStatus(400, "Identificador do Contato Inválido", false);

            if(this.id_tipo_endereco == 0)
                this.RM.updateStatus(400, "Identificador do Tipo Inválido", false);

            if(this.num_cep == 0)
                this.RM.updateStatus(400, "CEP Inválido", false);

            if(!this.str_logradouro)
                this.RM.updateStatus(400, "Logradouro Inválido", false);

            if(this.num_numero == 0)
                this.RM.updateStatus(400, "Número Inválido", false);

            if(!this.str_bairro)
                this.RM.updateStatus(400, "Bairro Inválido", false);

            if(!this.str_cidade)
                this.RM.updateStatus(400, "Cidade Inválido", false);

            if(!this.str_uf)
                this.RM.updateStatus(400, "Estado Inválido", false);
        }

        if(["DELETE"].indexOf(action) > -1)
        {
            if(this.id_endereco == 0)
                this.RM.updateStatus(400, "Identificador Inválido", false);
        }

        return this.RM;
    }
}
