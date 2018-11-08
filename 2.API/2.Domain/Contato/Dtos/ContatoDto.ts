import ReturnMessage from "../../Commom/ReturnMessage";
import TelefoneContatoDto from "../../TelefoneContato/Dtos/TelefoneContatoDto";
import EmailContatoDto from "../../EmailContato/Dtos/EmailContatoDto";

export default class ContatoDto
{
    public id_contato: number;
    public str_observacao: string;
    public num_criatividade: number;
    public num_comunicacao: number;
    public num_colaboracao: number;
    public num_lideranca: number;
    public emailContato: EmailContatoDto[];
    public telefoneContato: TelefoneContatoDto[];
    public fg_status: boolean;

    private returnMessage: ReturnMessage<null> = new ReturnMessage<null>(200, "Objeto válido", true);

    constructor()
    {
        this.id_contato = 0;
        this.str_observacao = "";
        this.num_criatividade = 0;
        this.num_comunicacao = 0;
        this.num_colaboracao = 0;
        this.num_lideranca = 0;
        this.emailContato = [];
        this.telefoneContato = []
        this.fg_status = false;
    }

    public isValid(isGet: boolean = false): ReturnMessage<null>
    {
        !isNaN(parseInt(`${this.id_contato}`))
        ? this.id_contato = parseInt(`${this.id_contato}`)
        : this.id_contato = 0;

        !isNaN(parseInt(`${this.num_criatividade}`))
        ? this.num_criatividade = parseInt(`${this.num_criatividade}`)
        : this.num_criatividade = 0;

        !isNaN(parseInt(`${this.num_comunicacao}`))
        ? this.num_comunicacao = parseInt(`${this.num_comunicacao}`)
        : this.num_comunicacao = 0;

        !isNaN(parseInt(`${this.num_colaboracao}`))
        ? this.num_colaboracao = parseInt(`${this.num_colaboracao}`)
        : this.num_colaboracao = 0;

        !isNaN(parseInt(`${this.num_lideranca}`))
        ? this.num_lideranca = parseInt(`${this.num_lideranca}`)
        : this.num_lideranca = 0;

        this.fg_status
        ? this.fg_status = true
        : this.fg_status = false;
        
        if(!isGet)
        {
            if(this.id_contato == 0)
                this.returnMessage.updateStatus(400, "Número de Contato Inválido", false);
        }

        return this.returnMessage;
    }
}
