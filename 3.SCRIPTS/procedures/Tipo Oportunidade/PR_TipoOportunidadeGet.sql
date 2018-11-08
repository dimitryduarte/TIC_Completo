CREATE OR REPLACE FUNCTION PR_TipoOportunidadeGet(
	vIdTipoOportunidade INTEGER = NULL
) RETURNS JSON AS $$
DECLARE
	vResult JSON;
	vTotalLinhas INTEGER;
BEGIN

	vResult := (
		SELECT  COALESCE(json_agg(oportunidade), '[]')
			FROM (
				SELECT  id_tipo_oportunidade,
                        str_descricao
				FROM public."tbTipoOportunidade" AS TOPOR
				WHERE (TOPOR.id_tipo_oportunidade = vIdTipoOportunidade)
					OR (TOPOR.fg_status = '1' AND vIdTipoOportunidade IS NULL)
			) oportunidade
	);

	vTotalLinhas := (
		SELECT COUNT(*)
			FROM public."tbTipoOportunidade" AS TOPOR
			WHERE (TOPOR.id_tipo_oportunidade = vIdTipoOportunidade)
				OR (TOPOR.fg_status = '1' AND vIdTipoOportunidade IS NULL)
	);

	RETURN json_build_object(
		'result', vResult,
		'totalLinhas', vTotalLinhas
	);

END;
$$ LANGUAGE 'plpgsql';
