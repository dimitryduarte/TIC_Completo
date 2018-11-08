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

    private returnMessage: ReturnMessage<null> = new ReturnMessage<null>(200, "Objeto válido", true);

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

    public isValid(isGet: boolean = false): ReturnMessage<null>
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
        
        if(!isGet)
        {
            if(this.id_empresa == 0 && this.num_cnpj == 0)
                this.returnMessage.updateStatus(400, "Identificador da Empresa Inválido", false);
        }

        return this.returnMessage;
    }
}
