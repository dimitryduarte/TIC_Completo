CREATE OR REPLACE FUNCTION PR_EmailContatoDelete (
	vIdEmail INTEGER
) RETURNS JSON AS $$
DECLARE
    vContent BOOLEAN := 'true';
	vMessage TEXT := 'Email do Contato deletado';
BEGIN

    IF EXISTS (SELECT 1
                FROM public."tbEmailContato" AS ECONT
                WHERE ECONT.id_email = vIdEmail)
        THEN
        
            DELETE FROM public."tbEmailContato"
                WHERE id_email = vIdEmail;
                
        ELSE
        
            vContent := 'false';
            vMessage := 'Email do Contato não encontrado';
            
        END IF;
        
    RETURN json_build_object (
        'Content', vContent,
        'Message', vMessage
    );

END;
$$ LANGUAGE 'plpgsql';
