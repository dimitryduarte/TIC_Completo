CREATE OR REPLACE FUNCTION PR_TipoTelefoneDelete(
	vIdTipoTelefone INTEGER
) RETURNS JSON AS $$
DECLARE
    vContent BOOLEAN := 'true';
    vMensagem TEXT := 'Tipo de Telefone deletado';
BEGIN

    IF EXISTS (SELECT 1
                FROM public."tbTipoTelefone" AS TTEL
                WHERE TTEL.id_tipo_telefone = vIdTipoTelefone)
        THEN
        
            UPDATE public."tbTipoTelefone"
                SET fg_status = '0'
                WHERE id_tipo_telefone = vIdTipoTelefone;
                
        ELSE
        
            vContent := 1;
            vMensagem := 'Tipo de Telefone não encontrado';
            
        END IF;
        
    RETURN json_build_object (
        'Content', vContent,
        'Message', vMensagem
    );

END;
$$ LANGUAGE 'plpgsql';
