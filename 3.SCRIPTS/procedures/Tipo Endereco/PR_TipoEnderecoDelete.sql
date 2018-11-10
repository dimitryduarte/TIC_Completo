CREATE OR REPLACE FUNCTION PR_TipoEnderecoDelete (
	vIdTipoEndereco INTEGER
) RETURNS JSON AS $$
DECLARE
    vContent BOOLEAN := 'true';
	vMessage TEXT := 'Tipo de Endereço deletado';
BEGIN

    IF EXISTS (SELECT 1
                FROM public."tbTipoEndereco" AS TEND
                WHERE TEND.id_tipo_endereco = vIdTipoEndereco)
        THEN
        
            UPDATE public."tbTipoEndereco"
                SET fg_status = 'false'
                WHERE id_tipo_endereco = vIdTipoEndereco;
                
        ELSE
        
            vContent := 'false';
            vMessage := 'Tipo de Endereço não encontrado';
            
        END IF;
        
    RETURN json_build_object (
        'Content', vContent,
        'Message', vMessage
    );

END;
$$ LANGUAGE 'plpgsql';
