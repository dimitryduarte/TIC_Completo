CREATE OR REPLACE FUNCTION PR_OportunidadeGet (
	vIdEmpresa INTEGER = NULL,
	vIdOportunidade INTEGER = NULL
) RETURNS JSON AS $$
DECLARE
	vResult JSON;
	vTotalLinhas INTEGER;
BEGIN

	vResult := (
		SELECT  COALESCE(json_agg(oportunidade), '[]')
			FROM (
				SELECT  id_empresa,
						id_oportunidade,
                        str_descricao,
						dat_inicio,
                        dat_fim,
                        mon_remuneracao,
                        fg_supervisionado,
                        id_tipo_oportunidade,
                        fg_status
				FROM public."tbOportunidade" AS OPOR
				WHERE (OPOR.id_empresa = vIdEmpresa OR vIdEmpresa IS NULL)
					AND (OPOR.id_oportunidade = vIdOportunidade OR vIdOportunidade IS NULL)
					AND (fg_status = '1')
			) oportunidade
	);

	vTotalLinhas := (
		SELECT COUNT(*)
			FROM public."tbOportunidade" AS OPOR
			WHERE (OPOR.id_empresa = vIdEmpresa OR vIdEmpresa IS NULL)
				AND (OPOR.id_oportunidade = vIdOportunidade OR vIdOportunidade IS NULL)
				AND (fg_status = '1')
	);

	RETURN json_build_object(
		'result', vResult,
		'totalLinhas', vTotalLinhas
	);

END;
$$ LANGUAGE 'plpgsql';
