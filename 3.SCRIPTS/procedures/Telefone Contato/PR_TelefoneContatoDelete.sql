CREATE OR REPLACE FUNCTION PR_TelefoneContatoDelete (
	vIdTelefone INTEGER
) RETURNS JSON AS $$
DECLARE
    vResult INTEGER := 0;
BEGIN

    IF EXISTS(SELECT 1
                FROM public."tbTelefoneContato" AS TCONT
                WHERE TCONT.id_telefone = vIdTelefone)
        THEN
        
            DELETE FROM public."tbTelefoneContato"
                WHERE id_telefone = vIdTelefone;
                
        ELSE
        
            vResult := 1;
            
        END IF;
        
    RETURN json_build_object(
        'result', vResult
    );

END;
$$ LANGUAGE 'plpgsql';
