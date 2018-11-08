import Bluebird from "bluebird";
import PgPromise from "pg-promise";
import ReturnMessage from "../../2.Domain/Commom/ReturnMessage";
import ReturnResultDB from "../../2.Domain/Commom/ReturnResultDB";

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
                case "object": val[i] = this.pgPromise.as.date(val[i]); break;      // Date
                case "boolean": val[i] = val[i] ? "1" : "0"; break;                 // Bit
                default: break;
            }
        }
        
        this.values = val;
    }

    public async executeNonQuery(): Promise<ReturnMessage<null>>
    {
        try
        {
            let returnMessage: ReturnMessage<null> = new ReturnMessage<null>(200, "", false);

            await this.db.connect();
            await this.db.proc(this.procedure, this.values.length > 1 ? this.values : this.values[0])
                .then((data) => {
                    Object.assign(returnMessage, data[this.procedure.toLocaleLowerCase()]);
                })
                .catch((error) => { 
                    returnMessage.updateStatus(400, error.message, false);
                });

            return returnMessage;
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
            let returnMessage: ReturnMessage<T> = new ReturnMessage<T>(400, "", false, new ReturnResultDB<T>([]));

            await this.db.connect();
            await this.db.proc(this.procedure, this.values.length > 1 ? this.values : this.values[0])
                .then((data) => {
                    let obj: ReturnResultDB<T> = new ReturnResultDB<T>();   
                    Object.assign(returnMessage.Result, data[this.procedure.toLocaleLowerCase()]);

                    if(returnMessage.Result.lista != null)
                    {
                        returnMessage.Result.lista.forEach(function(o, i)
                        {
                            if(o != null)
                                for (const k in o)
                                    if(typeof(o[k]) == "string" && returnMessage.Result.lista != null)
                                        Object.defineProperty(returnMessage.Result.lista[i], k, { 
                                            value : o[k].toString().replace(/(')/g, "") 
                                        });
                        });
                    }
                })
                .catch((error) => { 
                    returnMessage.updateStatus(400, error.message, false, new ReturnResultDB<T>());
                });

            return returnMessage;
        }
        catch(ex)
        {
            return new ReturnMessage<T>(400, ex.toString(), false, new ReturnResultDB<T>());
        }
    }
}
