CREATE OR REPLACE FUNCTION PR_TipoEmailDelete (
	vIdTipoEmail INTEGER
) RETURNS JSON AS $$
DECLARE
    vContent BOOLEAN := 'true';
	vMessage TEXT := 'Tipo de Email deletado';
BEGIN

    IF EXISTS (SELECT 1
                FROM public."tbTipoEmail" AS TEMAIL
                WHERE TEMAIL.id_tipo_email = vIdTipoEmail)
        THEN
        
            UPDATE public."tbTipoEmail"
                SET fg_status = 'false'
                WHERE id_tipo_email = vIdTipoEmail;
                
        ELSE
        
            vContent := 'false';
            vMessage := 'Tipo de Email não encontrado';
            
        END IF;
        
    RETURN json_build_object (
        'Content', vContent,
        'Message', vMessage
    );

END;
$$ LANGUAGE 'plpgsql';
