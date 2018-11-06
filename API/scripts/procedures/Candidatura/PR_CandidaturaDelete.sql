CREATE OR REPLACE FUNCTION PR_CandidaturaDelete(
	vIdCandidatura INTEGER
) RETURNS JSON AS $$
DECLARE
    vResult INTEGER := 0;
BEGIN

    IF EXISTS(SELECT 1
                FROM public."tbCandidatura" AS CAND
                WHERE CAND.id_candidatura = vIdCandidatura)
        THEN
        
            UPDATE public."tbCandidatura"
                SET fg_status = '0'
                WHERE id_candidatura = vIdCandidatura;
                
        ELSE
        
            vResult := 1;
            
        END IF;
        
    RETURN json_build_object(
        'result', vResult
    );

END;
$$ LANGUAGE 'plpgsql';
