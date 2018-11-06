CREATE OR REPLACE FUNCTION PR_FiltroPost(
    vIdContato 			INTEGER	,
    vFgSupervisionado 	BIT(1)	,
    vIdEmpresa 			INTEGER = NULL,
	vMonRemuneracao 	NUMERIC	= NULL,
    vIdTipoOportunidade INTEGER = NULL
) RETURNS JSON AS $$
DECLARE
	vResult INTEGER := 0;
BEGIN

	IF NOT EXISTS(SELECT 1
				FROM public."tbFiltro" AS FIL
				WHERE FIL.id_contato = vIdContato
                    AND FIL.id_empresa = vIdEmpresa
                    AND FIL.mon_remuneracao = vMonRemuneracao
                    AND FIL.fg_supervisionado = vFgSupervisionado
                    AND FIL.id_tipo_oportunidade = vIdTipoOportunidade)
		THEN

			INSERT INTO public."tbFiltro"
				(id_contato, id_empresa, mon_remuneracao, fg_supervisionado, id_tipo_oportunidade)
				VALUES
					(vIdContato, vIdEmpresa, vMonRemuneracao, vFgSupervisionado, vIdTipoOportunidade);

		ELSE

			vResult := 1;
			
		END IF;
	
	RETURN json_build_object(
		'result', vResult
	);

END;
$$ LANGUAGE 'plpgsql';
