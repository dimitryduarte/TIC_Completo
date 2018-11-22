CREATE OR REPLACE FUNCTION PR_OportunidadeDelete (
	vIdOportunidade INTEGER
) RETURNS JSON AS $$
DECLARE
    vContent BOOLEAN := 'true';
	vMessage TEXT := 'Oportunidade deletada';
BEGIN

    IF EXISTS (SELECT 1
                FROM public."tbOportunidade" AS OPOR
                WHERE OPOR.id_oportunidade = vIdOportunidade)
        THEN
        
            UPDATE public."tbOportunidade"
                SET fg_status = 'false'
                WHERE id_oportunidade = vIdOportunidade;
                
        ELSE
        
            vContent := 'false';
            vMessage := 'Oportunidade não encontrada';
            
        END IF;
        
    RETURN json_build_object (
        'Content', vContent,
        'Message', vMessage
    );

END;
$$ LANGUAGE 'plpgsql';
