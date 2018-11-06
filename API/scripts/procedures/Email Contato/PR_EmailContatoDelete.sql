CREATE OR REPLACE FUNCTION PR_EmailContatoDelete (
	vIdEmail INTEGER
) RETURNS JSON AS $$
DECLARE
    vResult INTEGER := 0;
BEGIN

    IF EXISTS(SELECT 1
                FROM public."tbEmailContato" AS ECONT
                WHERE ECONT.id_email = vIdEmail)
        THEN
        
            DELETE FROM public."tbEmailContato"
                WHERE id_email = vIdEmail;
                
        ELSE
        
            vResult := 1;
            
        END IF;
        
    RETURN json_build_object(
        'result', vResult
    );

END;
$$ LANGUAGE 'plpgsql';
