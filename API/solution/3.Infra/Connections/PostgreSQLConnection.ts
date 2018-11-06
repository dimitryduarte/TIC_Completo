import Bluebird from "bluebird";
import PgPromise from "pg-promise";
import DotProp from "dot-prop";
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

    public async executeNonQuery(): Promise<ReturnMessage<boolean>>
    {
        try
        {
            let returnMessage: ReturnMessage<boolean> = new ReturnMessage<boolean>(200, "", false);

            await this.db.connect();
            await this.db.proc(this.procedure, this.values.length > 1 ? this.values : this.values[0])
                .then((data) => {
                    let obj: ReturnResultDB<boolean> = new ReturnResultDB<boolean>(false);
                    Object.assign(obj, data[this.procedure.toLocaleLowerCase()]);

                    returnMessage.updateStatus(200, "SUCESSO !!!", !obj.result);
                })
                .catch((error) => { 
                    returnMessage.updateStatus(400, error.message, false);
                });

            return returnMessage;
        }
        catch(ex)
        {
            return new ReturnMessage<boolean>(400, ex.toString(), false);
        }
    }

    public async executeQuery<T>(): Promise<ReturnMessage<ReturnResultDB<T[]>>>
    {
        try
        {
            let returnMessage: ReturnMessage<ReturnResultDB<T[]>> = new ReturnMessage<ReturnResultDB<T[]>>(200, "", new ReturnResultDB<T[]>([]));

            await this.db.connect();
            await this.db.proc(this.procedure, this.values.length > 1 ? this.values : this.values[0])
                .then((data) => {
                    let obj: ReturnResultDB<T[]> = new ReturnResultDB<T[]>([]);   
                    Object.assign(obj, data[this.procedure.toLocaleLowerCase()]);

                    obj.result.forEach(function(o, i)
                    {
                        for (const k in o)
                            if(typeof(o[k]) == "string")
                                Object.defineProperty(obj.result[i], k, { 
                                    value : o[k].toString().replace(/(')/g, "") 
                                });
                    });

                    returnMessage.updateStatus(200, "SUCESSO !!!", obj);
                })
                .catch((error) => { 
                    returnMessage.updateStatus(400, error.message, new ReturnResultDB<T[]>([]));
                });

            return returnMessage;
        }
        catch(ex)
        {
            return new ReturnMessage<ReturnResultDB<any>>(400, ex.toString(), new ReturnResultDB<T[]>([]));
        }
    }
}
