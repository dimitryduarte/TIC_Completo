CREATE OR REPLACE FUNCTION PR_TipoOportunidadeDelete(
	vIdTipoOportunidade INTEGER
) RETURNS JSON AS $$
DECLARE
    vResult INTEGER := 0;
BEGIN

    IF EXISTS(SELECT 1
                FROM public."tbTipoOportunidade" AS TOPOR
                WHERE TOPOR.id_tipo_oportunidade = vIdTipoOportunidade)
        THEN
        
            UPDATE public."tbTipoOportunidade"
                SET fg_status = '0'
                WHERE id_tipo_oportunidade = vIdTipoOportunidade;
                
        ELSE
        
            vResult := 1;
            
        END IF;
        
    RETURN json_build_object(
        'result', vResult
    );

END;
$$ LANGUAGE 'plpgsql';
