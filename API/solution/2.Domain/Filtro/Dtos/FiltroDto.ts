import ReturnMessage from "../../Commom/ReturnMessage";

export default class FiltroDto
{
    public id_filtro: number;
    public id_empresa: number;
    public id_contato: number;
    public id_tipo_oportunidade: number;
    public mon_remuneracao: number;
    public fg_supervisionado: boolean;
    
    private returnMessage: ReturnMessage<boolean> = new ReturnMessage<boolean>(200, "Objeto válido", true);

    constructor ()
    {
        this.id_filtro = 0;
        this.id_empresa = 0;
        this.id_contato = 0;
        this.id_tipo_oportunidade = 0;
        this.mon_remuneracao = 0;
        this.fg_supervisionado = false;
    }

    public isValid(isGet: boolean = false): ReturnMessage<boolean>
    {
        !isNaN(parseInt(`${this.id_filtro}`))
        ? this.id_filtro = parseInt(`${this.id_filtro}`)
        : this.id_filtro = 0;

        !isNaN(parseInt(`${this.id_empresa}`))
        ? this.id_empresa = parseInt(`${this.id_empresa}`)
        : this.id_empresa = 0;

        !isNaN(parseInt(`${this.id_contato}`))
        ? this.id_contato = parseInt(`${this.id_contato}`)
        : this.id_contato = 0;

        !isNaN(parseInt(`${this.id_tipo_oportunidade}`))
        ? this.id_tipo_oportunidade = parseInt(`${this.id_tipo_oportunidade}`)
        : this.id_tipo_oportunidade = 0;

        this.mon_remuneracao
        ? this.mon_remuneracao = this.mon_remuneracao
        : this.mon_remuneracao = 0;

        this.fg_supervisionado
        ? this.fg_supervisionado = true
        : this.fg_supervisionado = false;
        
        if(!isGet)
        {
            if(this.id_filtro == 0)
                this.returnMessage.updateStatus(400, "Identificador do Filtro Inválido", false);
        }

        return this.returnMessage;
    }
}
