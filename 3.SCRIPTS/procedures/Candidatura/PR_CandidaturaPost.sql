CREATE OR REPLACE FUNCTION PR_CandidaturaPost(
	vIdOportunidade INTEGER,
	vIdContato      INTEGER
) RETURNS JSON AS $$
DECLARE
	vContent INTEGER := 0;
	vMensagem TEXT := 'Candidatura cadastrada';
BEGIN

	IF NOT EXISTS (SELECT 1
				FROM public."tbCandidatura" AS CAND
				WHERE CAND.id_contato = vIdContato
                    AND CAND.id_oportunidade = vIdOportunidade)
		THEN

			INSERT INTO public."tbCandidatura"
				(id_oportunidade, id_contato, dat_cadastro)
				VALUES
					(vIdOportunidade, vIdContato, NOW());

		ELSE

			vContent := 1;
			vMensagem := 'O contato já está cadastrado';
			
		END IF;
	
	RETURN json_build_object(
		'content', vContent,
		'mensagem', vMensagem
	);

END;
$$ LANGUAGE 'plpgsql';
