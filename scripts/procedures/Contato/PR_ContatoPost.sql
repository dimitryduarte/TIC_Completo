CREATE OR REPLACE FUNCTION PR_ContatoPost (
	vIdContato			INTEGER		,
	vStrObservacao		TEXT		= NULL,
	vNumCriatividade	SMALLINT 	= NULL,
	vNumComunicacao		SMALLINT 	= NULL,
	vNumColaboracao		SMALLINT 	= NULL,
	vNumLideranca		SMALLINT 	= NULL
) RETURNS JSON AS $$
DECLARE
	vContent BOOLEAN := 'true';
    vMessage TEXT := 'Contato cadastrado';
BEGIN

	IF EXISTS (SELECT 1
                    FROM public."tbContato" AS EMP
                    WHERE EMP.id_contato = vIdContato)
        THEN
        
            vContent := 'false';
            vMessage := 'Contato já cadastrado';
            
        END IF;

	IF (vContent)
		THEN

			INSERT INTO public."tbContato"
				(id_contato, str_observacao, num_criatividade, num_comunicacao, 
					num_colaboracao, num_lideranca)
				VALUES
					(vIdContato, vStrObservacao, vNumCriatividade, vNumComunicacao, 
						vNumColaboracao, vNumLideranca);
	
		END IF;
	
	RETURN json_build_object (
		'Content', vContent,
		'Message', vMessage
	);

END;
$$ LANGUAGE 'plpgsql';
