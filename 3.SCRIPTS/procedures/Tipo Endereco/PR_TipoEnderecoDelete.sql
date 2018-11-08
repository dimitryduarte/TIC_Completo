CREATE OR REPLACE FUNCTION PR_TipoEnderecoDelete(
	vIdTipoEndereco INTEGER
) RETURNS JSON AS $$
DECLARE
    vResult INTEGER := 0;
BEGIN

    IF EXISTS(SELECT 1
                FROM public."tbTipoEndereco" AS TEND
                WHERE TEND.id_tipo_endereco = vIdTipoEndereco)
        THEN
        
            UPDATE public."tbTipoEndereco"
                SET fg_status = '0'
                WHERE id_tipo_endereco = vIdTipoEndereco;
                
        ELSE
        
            vResult := 1;
            
        END IF;
        
    RETURN json_build_object(
        'result', vResult
    );

END;
$$ LANGUAGE 'plpgsql';
