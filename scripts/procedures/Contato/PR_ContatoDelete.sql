CREATE OR REPLACE FUNCTION PR_ContatoDelete (
	vIdContato INTEGER
) RETURNS JSON AS $$
DECLARE
    vContent BOOLEAN := 'true';
	vMessage TEXT := 'Contato deletado';
BEGIN

    IF EXISTS (SELECT 1
                FROM public."tbContato" AS CONT
                WHERE CONT.id_contato = vIdContato)
        THEN
        
            UPDATE public."tbContato"
                SET fg_status = 'false'
                WHERE id_contato = vIdContato;
                
        ELSE
        
            vContent := 'false';
            vMessage := 'Contato não encontrado';
            
        END IF;
        
    RETURN json_build_object (
        'Content', vContent,
        'Message', vMessage
    );

END;
$$ LANGUAGE 'plpgsql';
