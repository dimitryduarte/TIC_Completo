CREATE OR REPLACE FUNCTION PR_CandidaturaPost(
	vIdOportunidade INTEGER,
	vIdContato      INTEGER
) RETURNS JSON AS $$
DECLARE
	vResult INTEGER := 0;
BEGIN

	IF NOT EXISTS(SELECT 1
				FROM public."tbCandidatura" AS CAND
				WHERE CAND.id_contato = vIdContato
                    AND CAND.id_oportunidade = vIdOportunidade)
		THEN

			INSERT INTO public."tbCandidatura"
				(id_oportunidade, id_contato, dat_cadastro)
				VALUES
					(vIdOportunidade, vIdContato, NOW());

		ELSE

			vResult := 1;
			
		END IF;
	
	RETURN json_build_object(
		'result', vResult
	);

END;
$$ LANGUAGE 'plpgsql';
