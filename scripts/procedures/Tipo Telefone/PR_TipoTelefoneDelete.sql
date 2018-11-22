CREATE OR REPLACE FUNCTION PR_TipoTelefoneDelete(
	vIdTipoTelefone INTEGER
) RETURNS JSON AS $$
DECLARE
    vContent BOOLEAN := 'true';
    vMessage TEXT := 'Tipo de Telefone deletado';
BEGIN

    IF EXISTS (SELECT 1
                FROM public."tbTipoTelefone" AS TTEL
                WHERE TTEL.id_tipo_telefone = vIdTipoTelefone)
        THEN
        
            UPDATE public."tbTipoTelefone"
                SET fg_status = 'false'
                WHERE id_tipo_telefone = vIdTipoTelefone;
                
        ELSE
        
            vContent := 'false';
            vMessage := 'Tipo de Telefone não encontrado';
            
        END IF;
        
    RETURN json_build_object (
        'Content', vContent,
        'Message', vMessage
    );

END;
$$ LANGUAGE 'plpgsql';
