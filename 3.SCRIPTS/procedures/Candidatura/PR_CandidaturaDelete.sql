CREATE OR REPLACE FUNCTION PR_CandidaturaDelete(
	vIdCandidatura INTEGER
) RETURNS JSON AS $$
DECLARE
    vContent INTEGER := 0;
    vMensagem TEXT := 'Candidatura deletada';
BEGIN

    IF EXISTS (SELECT 1
                FROM public."tbCandidatura" AS CAND
                WHERE CAND.id_candidatura = vIdCandidatura)
        THEN
        
            UPDATE public."tbCandidatura"
                SET fg_status = '0'
                WHERE id_candidatura = vIdCandidatura;
                
        ELSE
        
            vContent := 1;
            vMensagem := 'Candidatura não encontrada';

        END IF;
        
    RETURN json_build_object(
        'content', vContent,
        'mensagem', vMensagem
    );

END;
$$ LANGUAGE 'plpgsql';
