CREATE OR REPLACE FUNCTION PR_EnderecoEmpresaDelete (
	vIdEndereco INTEGER
) RETURNS JSON AS $$
DECLARE
    vContent BOOLEAN := 'true';
	vMessage TEXT := 'Endereço da Empresa deletado';
BEGIN

    IF EXISTS (SELECT 1
                FROM public."tbEnderecoEmpresa" AS EEMP
                WHERE EEMP.id_endereco = vIdEndereco)
        THEN
        
            DELETE FROM public."tbEnderecoEmpresa"
                WHERE id_endereco = vIdEndereco;
                
        ELSE
        
            vContent := 'false';
            vMessage := 'Endereço da Empresa não encontrado';
            
        END IF;
        
    RETURN json_build_object (
        'Content', vContent,
        'Message', vMessage
    );

END;
$$ LANGUAGE 'plpgsql';
