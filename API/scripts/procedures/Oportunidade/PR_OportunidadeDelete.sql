CREATE OR REPLACE FUNCTION PR_OportunidadeDelete (
	vIdOportunidade INTEGER
) RETURNS JSON AS $$
DECLARE
    vResult INTEGER := 0;
BEGIN

    IF EXISTS(SELECT 1
                FROM public."tbOportunidade" AS OPOR
                WHERE OPOR.id_oportunidade = vIdOportunidade)
        THEN
        
            UPDATE public."tbOportunidade"
                SET fg_status = '0'
                WHERE id_oportunidade = vIdOportunidade;
                
        ELSE
        
            vResult := 1;
            
        END IF;
        
    RETURN json_build_object(
        'result', vResult
    );

END;
$$ LANGUAGE 'plpgsql';
