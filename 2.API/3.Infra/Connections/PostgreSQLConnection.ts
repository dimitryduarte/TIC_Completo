import Bluebird from "bluebird";
import PgPromise from "pg-promise";
import ReturnMessage from "../../2.Domain/Commom/ReturnMessage";

export default class PostgreSQLConnection
{        
    private pgPromise: PgPromise.IMain;
    private db: PgPromise.IDatabase<{}>;
    
    private procedure: string = "";
    private values: Array<any> = [];
    
    public transaction: Function;

    constructor ()
    {
        this.pgPromise = PgPromise({
            promiseLib: Bluebird
        });

        this.db = this.pgPromise({
            host: "localhost",
            port: 5432,
            database: "UNI_OPOR",
            user: "postgres",
            password: "1234!!"
        });

        this.transaction = this.db.tx;
    }

    public async addProcedure(proc: string): Promise<void>
    {
        this.procedure = proc;
    }

    public async addParameter(val: Array<any>): Promise<void>
    {
        for (let i = 0; i < val.length; i++)
        {
            if(val[i] == null) continue;
            
            switch(typeof(val[i]))
            {
                case "number": val[i] = this.pgPromise.as.number(val[i]); break;    // Number
                case "string": val[i] = this.pgPromise.as.text(val[i]); break;      // Text
                case "boolean": val[i] = this.pgPromise.as.bool(val[i]); break;     // Boolean
                case "object": val[i] = this.pgPromise.as.date(val[i]); break;      // Date
                default: break;
            }
        }
        
        this.values = val;
    }

    public async executeNonQuery(): Promise<ReturnMessage<null>>
    {
        try
        {
            let RM: ReturnMessage<null> = new ReturnMessage<null>(400, "FALHA", false);

            await this.db.proc(this.procedure, this.values.length > 1 ? this.values : this.values[0])
                .then((data) => {
                    Object.assign(RM, data[this.procedure.toLocaleLowerCase()]);
                    RM.updateStatus(RM.Content ? 200 : 400, RM.Message, RM.Content);
                })
                .catch((error) => { 
                    RM.updateStatus(400, error.message, false);
                });

            return RM;
        }
        catch(ex)
        {
            return new ReturnMessage<null>(400, ex.toString(), false);
        }
    }

    public async executeQuery<T>(): Promise<ReturnMessage<T>>
    {
        try
        {
            let RM: ReturnMessage<T> = new ReturnMessage<T>(400, "FALHA", false);

            await this.db.proc(this.procedure, this.values.length > 1 ? this.values : this.values[0])
                .then((data) => {
                    Object.assign(RM, data[this.procedure.toLocaleLowerCase()]);

                    RM.List.forEach(function(o, i)
                    {
                        for (const k in o)
                            if(typeof(o[k]) == "string")
                                Object.defineProperty(RM.List[i], k, { 
                                    value : o[k].toString().replace(/(')/g, "") 
                                });
                    });

                    RM.updateStatus(200, "SUCESSO", true, RM.List, RM.Lines);
                })
                .catch((error) => { 
                    RM.updateStatus(400, error.message, false);
                });

            return RM;
        }
        catch(ex)
        {
            return new ReturnMessage<T>(400, ex.toString(), false);
        }
    }
}
