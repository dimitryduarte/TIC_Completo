CREATE OR REPLACE FUNCTION PR_EmailEmpresaDelete (
	vIdEmail INTEGER
) RETURNS JSON AS $$
DECLARE
    vContent BOOLEAN := 'true';
	vMessage TEXT := 'Email da Empresa deletado';
BEGIN

    IF EXISTS (SELECT 1
                FROM public."tbEmailEmpresa" AS EEMP
                WHERE EEMP.id_email = vIdEmail)
        THEN
        
            DELETE FROM public."tbEmailEmpresa"
                WHERE id_email = vIdEmail;
                
        ELSE
        
            vContent := 'false';
            vMessage := 'Email da Empresa não encontrado';
            
        END IF;
        
    RETURN json_build_object (
        'Content', vContent,
        'Message', vMessage
    );

END;
$$ LANGUAGE 'plpgsql';
