CREATE OR REPLACE FUNCTION PR_CandidaturaDelete (
	vIdCandidatura INTEGER
) RETURNS JSON AS $$
DECLARE
    vContent BOOLEAN := 'true';
    vMessage TEXT := 'Candidatura deletada';
BEGIN

    IF EXISTS (SELECT 1
                FROM public."tbCandidatura" AS CAND
                WHERE CAND.id_candidatura = vIdCandidatura)
        THEN
        
            UPDATE public."tbCandidatura"
                SET fg_status = 'false'
                WHERE id_candidatura = vIdCandidatura;
                
        ELSE
        
            vContent := 'false';
            vMessage := 'Candidatura não encontrada';

        END IF;
        
    RETURN json_build_object (
        'Content', vContent,
        'Message', vMessage
    );

END;
$$ LANGUAGE 'plpgsql';
