CREATE OR REPLACE FUNCTION PR_ContatoPut (
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

	IF EXISTS(SELECT 1
				FROM public."tbContato" AS CONT
				WHERE CONT.id_contato = vIdContato)
		THEN
		
			UPDATE public."tbContato"
				SET id_contato 			= vIdcontato,
					str_observacao 		= vStrObservacao,
					num_criatividade 	= vNumCriatividade,
					num_comunicacao 	= vNumComunicacao,
					num_colaboracao 	= vNumColaboracao,
					num_lideranca 		= vNumLideranca
				WHERE id_contato= vIdContato;
				
		ELSE
		
			vResult := 1;
			
		END IF;
		
	RETURN json_build_object(
		'result', vResult
	);

END;
$$ LANGUAGE 'plpgsql';
