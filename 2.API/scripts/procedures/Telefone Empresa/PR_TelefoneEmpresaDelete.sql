CREATE OR REPLACE FUNCTION PR_TelefoneEmpresaDelete (
	vIdTelefone INTEGER
) RETURNS JSON AS $$
DECLARE
    vResult INTEGER := 0;
BEGIN

    IF EXISTS(SELECT 1
                FROM public."tbTelefoneEmpresa" AS TEMP
                WHERE TEMP.id_telefone = vIdTelefone)
        THEN
        
            DELETE FROM public."tbTelefoneEmpresa"
                WHERE id_telefone = vIdTelefone;
                
        ELSE
        
            vResult := 1;
            
        END IF;
        
    RETURN json_build_object(
        'result', vResult
    );

END;
$$ LANGUAGE 'plpgsql';
