CREATE OR REPLACE FUNCTION PR_TipoTelefoneDelete(
	vIdTipoTelefone INTEGER
) RETURNS JSON AS $$
DECLARE
    vResult INTEGER := 0;
BEGIN

    IF EXISTS(SELECT 1
                FROM public."tbTipoTelefone" AS TTEL
                WHERE TTEL.id_tipo_telefone = vIdTipoTelefone)
        THEN
        
            UPDATE public."tbTipoTelefone"
                SET fg_status = '0'
                WHERE id_tipo_telefone = vIdTipoTelefone;
                
        ELSE
        
            vResult := 1;
            
        END IF;
        
    RETURN json_build_object(
        'result', vResult
    );

END;
$$ LANGUAGE 'plpgsql';
