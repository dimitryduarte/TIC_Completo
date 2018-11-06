CREATE OR REPLACE FUNCTION PR_EnderecoEmpresaDelete (
	vIdEndereco INTEGER
) RETURNS JSON AS $$
DECLARE
    vResult INTEGER := 0;
BEGIN

    IF EXISTS(SELECT 1
                FROM public."tbEnderecoEmpresa" AS EEMP
                WHERE EEMP.id_endereco = vIdEndereco)
        THEN
        
            DELETE FROM public."tbEnderecoEmpresa"
                WHERE id_endereco = vIdEndereco;
                
        ELSE
        
            vResult := 1;
            
        END IF;
        
    RETURN json_build_object(
        'result', vResult
    );

END;
$$ LANGUAGE 'plpgsql';
