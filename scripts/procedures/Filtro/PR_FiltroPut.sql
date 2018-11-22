CREATE OR REPLACE FUNCTION PR_FiltroPut (
	vIdFiltro           INTEGER	        ,
	vIdContato          INTEGER	        ,
	vIdEmpresa 			INTEGER 		= NULL,
    vIdTipoOportunidade INTEGER 		= NULL,
	vNumRemuneracaoMax 	NUMERIC(9,2)	= NULL,
	vNumRemuneracaoMin 	NUMERIC(9,2)	= NULL
) RETURNS JSON AS $$
DECLARE
    vContent BOOLEAN := 'true';
	vMessage TEXT := 'Filtro alterado';
BEGIN

    IF NOT EXISTS (SELECT 1
					FROM public."tbFiltro" AS FIL
					WHERE FIL.id_contato = vIdContato
						AND FIL.id_empresa = vIdEmpresa
						AND FIL.id_tipo_oportunidade = vIdTipoOportunidade
						AND FIL.num_remuneracao_min = vNumRemuneracaoMin
						AND FIL.num_remuneracao_max = vNumRemuneracaoMax)
		THEN
        
            UPDATE public."tbFiltro"
                SET id_empresa = vIdEmpresa,
					id_tipo_oportunidade = vIdTipoOportunidade,
                    num_remuneracao_max = vNumRemuneracaoMax,
                    num_remuneracao_min = vNumRemuneracaoMin
                WHERE id_filtro = vIdFiltro;
                
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
