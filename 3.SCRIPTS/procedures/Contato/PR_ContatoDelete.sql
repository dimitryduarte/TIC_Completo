CREATE OR REPLACE FUNCTION PR_ContatoDelete (
	vIdContato INTEGER
) RETURNS JSON AS $$
DECLARE
    vResult INTEGER := 0;
BEGIN

    IF EXISTS(SELECT 1
                FROM public."tbContato" AS CONT
                WHERE CONT.id_contato = vIdContato)
        THEN
        
            UPDATE public."tbContato"
                SET fg_status = '0'
                WHERE id_contato = vIdContato;
                
        ELSE
        
            vResult := 1;
            
        END IF;
        
    RETURN json_build_object(
        'result', vResult
    );

END;
$$ LANGUAGE 'plpgsql';
