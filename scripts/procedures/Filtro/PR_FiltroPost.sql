CREATE OR REPLACE FUNCTION PR_FiltroPost (
    vIdContato 			INTEGER			,
    vIdEmpresa 			INTEGER 		= NULL,
    vIdTipoOportunidade INTEGER 		= NULL,
	vNumRemuneracaoMax 	NUMERIC(9,2)	= NULL,
	vNumRemuneracaoMin 	NUMERIC(9,2)	= NULL
) RETURNS JSON AS $$
DECLARE
	vContent BOOLEAN := 'true';
	vMessage TEXT := 'Filtro cadastrado';
BEGIN

	IF NOT EXISTS (SELECT 1
					FROM public."tbFiltro" AS FIL
					WHERE FIL.id_contato = vIdContato
						AND FIL.id_empresa = vIdEmpresa
						AND FIL.id_tipo_oportunidade = vIdTipoOportunidade
						AND FIL.num_remuneracao_max = vNumRemuneracaoMax
						AND FIL.num_remuneracao_min = vNumRemuneracaoMin)
		THEN

			INSERT INTO public."tbFiltro"
				(id_contato, id_empresa, id_tipo_oportunidade, num_remuneracao_max, num_remuneracao_min)
				VALUES
					(vIdContato, vIdEmpresa, vIdTipoOportunidade, vNumRemuneracaoMax, vNumRemuneracaoMin);

		ELSE

			vContent := 'false';
			vMessage := 'Filtro já cadastrado';
			
		END IF;
	
	RETURN json_build_object (
        'Content', vContent,
        'Message', vMessage
    );

END;
$$ LANGUAGE 'plpgsql';
