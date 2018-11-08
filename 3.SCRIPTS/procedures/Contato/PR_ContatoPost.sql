CREATE OR REPLACE FUNCTION PR_ContatoPost (
	vIdContato			INTEGER		,
	vStrObservacao		TEXT		= NULL,
	vNumCriatividade	SMALLINT 	= NULL,
	vNumComunicacao		SMALLINT 	= NULL,
	vNumColaboracao		SMALLINT 	= NULL,
	vNumLideranca		SMALLINT 	= NULL
) RETURNS JSON AS $$
DECLARE
	vResult INTEGER := 0;
BEGIN

	IF NOT EXISTS(SELECT 1
				FROM public."tbContato" AS CONT
				WHERE CONT.id_contato = vIdContato)
		THEN

			INSERT INTO public."tbContato"
				(id_contato, str_observacao, num_criatividade, num_comunicacao, 
					num_colaboracao, num_lideranca)
				VALUES
					(vIdContato, vStrObservacao, vNumCriatividade, vNumComunicacao, 
						vNumColaboracao, vNumLideranca);

		ELSE

			vResult := 1;
			
		END IF;
	
	RETURN json_build_object(
		'result', vResult
	);

END;
$$ LANGUAGE 'plpgsql';
