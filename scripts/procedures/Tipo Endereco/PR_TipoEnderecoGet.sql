CREATE OR REPLACE FUNCTION PR_TipoEnderecoGet (
	vIdTipoEndereco INTEGER = NULL
) RETURNS JSON AS $$
DECLARE
	vList JSON;
	vLines INTEGER;
BEGIN

	vList := (
		SELECT  COALESCE(json_agg(endereco), '[]')
			FROM (
				SELECT  id_tipo_endereco,
                        str_descricao,
						fg_status
				FROM public."tbTipoEndereco" AS TEND
				WHERE TEND.id_tipo_endereco = vIdTipoEndereco
					OR (TEND.fg_status = 'true' AND vIdTipoEndereco IS NULL)
			) endereco
	);

	vLines := (
		SELECT COUNT(*)
			FROM public."tbTipoEndereco" AS TEND
			WHERE TEND.id_tipo_endereco = vIdTipoEndereco
				OR (TEND.fg_status = 'true' AND vIdTipoEndereco IS NULL)
	);

	RETURN json_build_object(
		'List', vList,
		'Lines', vLines
	);

END;
$$ LANGUAGE 'plpgsql';
