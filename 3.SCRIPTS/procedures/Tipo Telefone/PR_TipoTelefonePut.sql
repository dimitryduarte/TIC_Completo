CREATE OR REPLACE FUNCTION PR_TipoTelefonePut (
    vIdTipoTelefone INTEGER,
    vStrDescricao   TEXT
) RETURNS JSON AS $$
DECLARE
    vContent BOOLEAN := 'true';
    vMensagem TEXT := 'Tipo de Telefone alterado';
BEGIN

    IF EXISTS (SELECT 1
                FROM public."tbTipoTelefone" AS TTEL
                WHERE TTEL.id_tipo_telefone = vIdTipoTelefone)
        THEN
        
            UPDATE public."tbTipoTelefone"
                SET str_descricao = vStrDescricao
                WHERE id_tipo_telefone = vIdTipoTelefone;
                
        ELSE
        
            vContent := 'false';
            vMensagem := 'Tipo de Telefone não encontrado';
            
        END IF;
        
    RETURN json_build_object (
        'Content', vContent,
        'Message', vMensagem
    );

END;
$$ LANGUAGE 'plpgsql';
