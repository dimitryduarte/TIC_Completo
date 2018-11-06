CREATE OR REPLACE FUNCTION PR_EmailEmpresaDelete (
	vIdEmail INTEGER
) RETURNS JSON AS $$
DECLARE
    vResult INTEGER := 0;
BEGIN

    IF EXISTS(SELECT 1
                FROM public."tbEmailEmpresa" AS EEMP
                WHERE EEMP.id_email = vIdEmail)
        THEN
        
            DELETE FROM public."tbEmailEmpresa"
                WHERE id_email = vIdEmail;
                
        ELSE
        
            vResult := 1;
            
        END IF;
        
    RETURN json_build_object(
        'result', vResult
    );

END;
$$ LANGUAGE 'plpgsql';
