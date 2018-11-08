import ReturnMessage from "../../Commom/ReturnMessage";

export default class CandidaturaDto
{
    public id_candidatura: number;
    public id_oportunidade: number;
    public id_contato: number;
    public dat_cadastro: Date;
    public fg_status: boolean;

    private returnMessage: ReturnMessage<null> = new ReturnMessage<null>(200, "Objeto válido", true);

    constructor ()
    {
        this.id_candidatura = 0;
        this.id_oportunidade = 0;
        this.id_contato = 0;
        this.dat_cadastro = new Date();
        this.fg_status = false;
    }

    public isValid(isGet: boolean = false): ReturnMessage<null>
    {
        !isNaN(parseInt(`${this.id_candidatura}`))
        ? this.id_candidatura = parseInt(`${this.id_candidatura}`)
        : this.id_candidatura = 0;

        !isNaN(parseInt(`${this.id_oportunidade}`))
        ? this.id_oportunidade = parseInt(`${this.id_oportunidade}`)
        : this.id_oportunidade = 0;

        !isNaN(parseInt(`${this.id_contato}`))
        ? this.id_contato = parseInt(`${this.id_contato}`)
        : this.id_contato = 0;

        let date = new Date(this.dat_cadastro);
        date.getDay() && date.getMonth() && date.getFullYear()
        ? this.dat_cadastro = date
        : this.dat_cadastro = new Date();

        this.fg_status
        ? this.fg_status = true
        : this.fg_status = false;

        if(!isGet)
        {
            if(this.id_contato == 0)
                this.returnMessage.updateStatus(400, "Número do Contato Inválido", false);

            if(this.id_oportunidade == 0)
                this.returnMessage.updateStatus(400, "Número da Oportunidade Inválido", false);
        }

        return this.returnMessage;
    }
}
