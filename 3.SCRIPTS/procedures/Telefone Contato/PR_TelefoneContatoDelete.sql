CREATE OR REPLACE FUNCTION PR_TelefoneContatoDelete (
	vIdTelefone INTEGER
) RETURNS JSON AS $$
DECLARE
    vContent BOOLEAN := 'true';
	vMessage TEXT := 'Telefone do Contato deletado';
BEGIN

    IF EXISTS (SELECT 1
                FROM public."tbTelefoneContato" AS TCONT
                WHERE TCONT.id_telefone = vIdTelefone)
        THEN
        
            DELETE FROM public."tbTelefoneContato"
                WHERE id_telefone = vIdTelefone;
                
        ELSE
        
            vContent := 'false';
            vMessage := 'Telefone do Contato não encontrado';
            
        END IF;
        
    RETURN json_build_object (
        'Content', vContent,
        'Message', vMessage
    );

END;
$$ LANGUAGE 'plpgsql';
