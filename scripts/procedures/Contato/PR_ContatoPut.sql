CREATE OR REPLACE FUNCTION PR_ContatoPut (
	vIdContato			INTEGER		,
	vStrObservacao		TEXT		= NULL,
	vNumCriatividade	SMALLINT 	= NULL,
	vNumComunicacao		SMALLINT 	= NULL,
	vNumColaboracao		SMALLINT 	= NULL,
	vNumLideranca		SMALLINT 	= NULL
) RETURNS JSON AS $$
DECLARE
	vContent BOOLEAN := 'true';
    vMessage TEXT := 'Contato alterado';
BEGIN

	IF NOT EXISTS (SELECT 1
                    FROM public."tbContato" AS EMP
                    WHERE EMP.id_contato = vIdContato)
        THEN
        
            vContent := 'false';
            vMessage := 'Contato não encontrado';
            
        END IF;

	IF (vContent)
		THEN
		
			UPDATE public."tbContato"
				SET id_contato 			= vIdcontato,
					str_observacao 		= vStrObservacao,
					num_criatividade 	= vNumCriatividade,
					num_comunicacao 	= vNumComunicacao,
					num_colaboracao 	= vNumColaboracao,
					num_lideranca 		= vNumLideranca
				WHERE id_contato= vIdContato;
				
		END IF;
		
	RETURN json_build_object (
        'Content', vContent,
        'Message', vMessage
    );

END;
$$ LANGUAGE 'plpgsql';
