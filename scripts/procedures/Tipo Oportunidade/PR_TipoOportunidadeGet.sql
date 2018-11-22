CREATE OR REPLACE FUNCTION PR_TipoOportunidadeGet (
	vIdTipoOportunidade INTEGER = NULL
) RETURNS JSON AS $$
DECLARE
	vList JSON;
	vLines INTEGER;
BEGIN

	vList := (
		SELECT  COALESCE(json_agg(oportunidade), '[]')
			FROM (
				SELECT  id_tipo_oportunidade,
                        str_descricao,
						fg_status
				FROM public."tbTipoOportunidade" AS TOPOR
				WHERE TOPOR.id_tipo_oportunidade = vIdTipoOportunidade
					OR (TOPOR.fg_status = 'true' AND vIdTipoOportunidade IS NULL)
			) oportunidade
	);

	vLines := (
		SELECT COUNT(*)
			FROM public."tbTipoOportunidade" AS TOPOR
			WHERE TOPOR.id_tipo_oportunidade = vIdTipoOportunidade
				OR (TOPOR.fg_status = 'true' AND vIdTipoOportunidade IS NULL)
	);

	RETURN json_build_object (
		'List', vList,
		'Lines', vLines
	);

END;
$$ LANGUAGE 'plpgsql';
