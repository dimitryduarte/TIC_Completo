import { Router } from "express";
import ReturnMessage from "../../2.Domain/Commom/ReturnMessage";

export default class Helpers
{
    constructor()
    {
    }

    //#region ## Metódos de Apoio ##
    
    public GeraToken() : string
    {
        let baseString = ("ticunifacef" + new Date().toDateString().slice(0, 7))
                            .replace(/( )/g, "#")
                            .replace(/([Aa])/g, "@")
                            .replace(/([Ee])/g, "$")
                            .replace(/([Ii])/g, "!")
                            .replace(/([Oo])/g, "&")
                            .replace(/([Uu])/g, "?");
        
        for(let i = 0; i < baseString.length; i++)
        {
            if(new RegExp(/([A-z])/).test(baseString.charAt(i)))
            {
                let l = baseString;
                baseString = l.replace(l.charAt(i), l.charCodeAt(i).toString());

                i = 0;
            }
        }
        
        let yyyy = new Date().getFullYear();
        let MM = new Date().getMonth() + 1;
        let dd = new Date().getDate();

        let hash = ((parseInt(`${yyyy}${MM}${dd}`) * 777) / 3);

        let token = baseString + hash;
        
        return token;
    }

    public ConvertValue(element: any): any
    {
        // Convert to Number
        if(!isNaN(parseInt(element)))
            return parseInt(element);
        
        // Convert to Float
        if(!isNaN(parseFloat(element)))
            return parseFloat(element);

        // Convert to Date
        let date = new Date(element);
        if(date.getDay() && date.getMonth() && date.getFullYear())
            return date;

        // Convert to Bool
        if(element == "true" || element == true)
            return true;
            
        if(element == "false" || element == false)
            return false;
        
        return null;
    }
    
    //#endregion

    //#region ## Metódos de Suporte para Routas ## 

    protected Get(_paramUrl: string, _func: Function, _parameter: object): Router
    {
        let helpers = this;

        return Router().get(_paramUrl, async function (req, res, next): Promise<void>
        {
            await helpers.CallController(req, res, _func, _parameter);
        });
    }
    
    protected Post(_func: Function, _parameter: object): Router
    {
        let helpers = this;

        return Router().post("", async function (req, res): Promise<void>
        {
            await helpers.CallController(req, res, _func, _parameter);
        });
    }
    
    protected Put(_func: Function, _parameter: object): Router
    {
        let helpers = this;

        return Router().put("", async function (req, res, next): Promise<void>
        {
            await helpers.CallController(req, res, _func, _parameter);
        });
    }
    
    protected Delete(_func: Function, _parameter: object): Router
    {
        let helpers = this;

        return Router().delete("", async function (req, res, next): Promise<void>
        {
            await helpers.CallController(req, res, _func, _parameter);
        });
    }

    private async CallController(_req: any, _res: any, _func: Function, _parameter: object)
    {
        try
        {
            if(_req.headers["authorization"])
            {
                if(_req.headers["authorization"] == await this.GeraToken())
                {
                    Object.assign(_parameter, _req.method == "GET" ? _req.params : _req.body);
                    _res.json(await _func(_parameter));
                }
                else
                    _res.json(new ReturnMessage<null>(400, "Token inválido !!!", false));
            }
            else
                _res.json(new ReturnMessage<null>(400, "Token não encontrado !!!", false));
        }
        catch(ex)
        {
            _res.json(new ReturnMessage<null>(500, ex.toString(), false));
        }
    }

    //#endregion
}
