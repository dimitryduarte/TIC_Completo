CREATE OR REPLACE FUNCTION PR_FiltroPut(
	vIdFiltro           INTEGER	,
	vFgSupervisionado 	BIT(1)	,
    vIdEmpresa 			INTEGER = NULL,
	vMonRemuneracao 	NUMERIC	= NULL,
    vIdTipoOportunidade INTEGER = NULL
) RETURNS JSON AS $$
DECLARE
    vResult INTEGER := 0;
BEGIN

    IF EXISTS(SELECT 1
                FROM public."tbFiltro" AS EMP
                WHERE EMP.id_filtro = vIdFiltro)
        THEN
        
            UPDATE public."tbFiltro"
                SET id_empresa = vIdEmpresa,
                    mon_remuneracao = vMonRemuneracao,
                    fg_supervisionado = vFgSupervisionado,
                    id_tipo_oportunidade = vIdTipoOportunidade
                WHERE id_filtro = vIdFiltro;
                
        ELSE
        
            vResult := 1;
            
        END IF;
        
    RETURN json_build_object(
        'result', vResult
    );

END;
$$ LANGUAGE 'plpgsql';
