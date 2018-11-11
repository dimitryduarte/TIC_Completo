import ReturnMessage from "../../Commom/ReturnMessage";
import EmailEmpresaDto from "../../EmailEmpresa/Dtos/EmailEmpresaDto";
import EnderecoEmpresaDto from "../../EnderecoEmpresa/Dtos/EnderecoEmpresaDto";
import TelefoneEmpresaDto from "../../TelefoneEmpresa/Dtos/TelefoneEmpresaDto";

export default class EmpresaDto
{
    public id_empresa: number;
    public str_nome: string;
    public num_cnpj: number;
    public num_inscricao_estadual: number;
    public num_inscricao_municipal: number;
    public str_razao_social: string;
    public emailEmpresa: EmailEmpresaDto[];
    public telefoneEmpresa: TelefoneEmpresaDto[];
    public enderecoEmpresa: EnderecoEmpresaDto[];
    public fg_status: boolean;

    private RM: ReturnMessage<null> = new ReturnMessage<null>(200, "Objeto válido", true);

    constructor ()
    {
        this.id_empresa = 0;
        this.str_nome = "";
        this.num_cnpj = 0;
        this.num_inscricao_estadual = 0;
        this.num_inscricao_municipal = 0;
        this.str_razao_social = "";
        this.emailEmpresa = [];
        this.telefoneEmpresa = [];
        this.enderecoEmpresa = [];
        this.fg_status = false;
    }

    public isValid(action: string): ReturnMessage<null>
    {
        !isNaN(parseInt(`${this.id_empresa}`))
        ? this.id_empresa = parseInt(`${this.id_empresa}`)
        : this.id_empresa = 0;

        !isNaN(parseInt(`${this.num_cnpj}`))
        ? this.num_cnpj = parseInt(`${this.num_cnpj}`)
        : this.num_cnpj = 0;

        !isNaN(parseInt(`${this.num_inscricao_estadual}`))
        ? this.num_inscricao_estadual = parseInt(`${this.num_inscricao_estadual}`)
        : this.num_inscricao_estadual = 0;

        !isNaN(parseInt(`${this.num_inscricao_municipal}`))
        ? this.num_inscricao_municipal = parseInt(`${this.num_inscricao_municipal}`)
        : this.num_inscricao_municipal = 0;

        this.fg_status
        ? this.fg_status = true
        : this.fg_status = false;
        
        if(["POST", "PUT"].indexOf(action) > -1)
        {
            if(this.num_cnpj == 0)
                this.RM.updateStatus(400, "CNPJ Inválido", false);

            if(!this.str_nome)
                this.RM.updateStatus(400, "Nome Inválido", false);
        }

        if(["PUT", "DELETE"].indexOf(action) > -1)
        {
            if(this.id_empresa == 0)
                this.RM.updateStatus(400, "Identificador Inválido", false);
        }

        return this.RM;
    }
}
