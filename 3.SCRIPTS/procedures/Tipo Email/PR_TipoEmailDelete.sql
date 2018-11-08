CREATE OR REPLACE FUNCTION PR_TipoEmailDelete(
	vIdTipoEmail INTEGER
) RETURNS JSON AS $$
DECLARE
    vResult INTEGER := 0;
BEGIN

    IF EXISTS(SELECT 1
                FROM public."tbTipoEmail" AS TEMAIL
                WHERE TEMAIL.id_tipo_email = vIdTipoEmail)
        THEN
        
            UPDATE public."tbTipoEmail"
                SET fg_status = '0'
                WHERE id_tipo_email = vIdTipoEmail;
                
        ELSE
        
            vResult := 1;
            
        END IF;
        
    RETURN json_build_object(
        'result', vResult
    );

END;
$$ LANGUAGE 'plpgsql';
