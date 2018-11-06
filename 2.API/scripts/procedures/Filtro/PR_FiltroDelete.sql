CREATE OR REPLACE FUNCTION PR_FiltroDelete(
	vIdFiltro INTEGER
) RETURNS JSON AS $$
DECLARE
    vResult INTEGER := 0;
BEGIN

    IF EXISTS(SELECT 1
                FROM public."tbFiltro" AS FIL
                WHERE FIL.id_filtro = vIdFiltro)
        THEN
        
            DELETE FROM public."tbFiltro"
                WHERE id_filtro = vIdFiltro;
                
        ELSE
        
            vResult := 1;
            
        END IF;
        
    RETURN json_build_object(
        'result', vResult
    );

END;
$$ LANGUAGE 'plpgsql';
