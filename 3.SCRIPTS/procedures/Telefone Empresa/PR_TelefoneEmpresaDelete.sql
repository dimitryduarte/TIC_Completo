CREATE OR REPLACE FUNCTION PR_TelefoneEmpresaDelete (
	vIdTelefone INTEGER
) RETURNS JSON AS $$
DECLARE
    vContent BOOLEAN := 'true';
	vMessage TEXT := 'Telefone da Empresa deletado';
BEGIN

    IF EXISTS (SELECT 1
                FROM public."tbTelefoneEmpresa" AS TEMP
                WHERE TEMP.id_telefone = vIdTelefone)
        THEN
        
            DELETE FROM public."tbTelefoneEmpresa"
                WHERE id_telefone = vIdTelefone;
                
        ELSE
        
            vContent := 'false';
            vMessage := 'Telefone da Empresa não encontrado';
            
        END IF;
        
    RETURN json_build_object (
        'Content', vContent,
        'Message', vMessage
    );

END;
$$ LANGUAGE 'plpgsql';
