import ReturnMessage from "../../Commom/ReturnMessage";

export default class CandidaturaDto
{
    public id_candidatura: number;
    public id_oportunidade: number;
    public id_contato: number;
    public dat_cadastro: Date;
    public fg_status: boolean;

    private RM: ReturnMessage<null> = new ReturnMessage<null>(200, "Objeto válido", true);

    constructor ()
    {
        this.id_candidatura = 0;
        this.id_oportunidade = 0;
        this.id_contato = 0;
        this.dat_cadastro = new Date();
        this.fg_status = false;
    }

    public isValid(action: string): ReturnMessage<null>
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
        : this.dat_cadastro = new Date('2000-01-01');

        this.fg_status
        ? this.fg_status = true
        : this.fg_status = false;

        if(["POST"].indexOf(action) > -1)
        {
            if(this.id_contato == 0)
                this.RM.updateStatus(400, "Identificador do Contato Inválido", false);

            if(this.id_oportunidade == 0)
                this.RM.updateStatus(400, "Identificador da Oportunidade Inválido", false);
        }

        if(["DELETE"].indexOf(action) > -1)
        {
            if(this.id_candidatura == 0)
                this.RM.updateStatus(400, "Identificador Inválido", false);
        }

        return this.RM;
    }
}
