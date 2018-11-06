CREATE OR REPLACE FUNCTION PR_TipoEnderecoGet(
	vIdTipoEndereco INTEGER = NULL
) RETURNS JSON AS $$
DECLARE
	vResult JSON;
	vTotalLinhas INTEGER;
BEGIN

	vResult := (
		SELECT  COALESCE(json_agg(endereco), '[]')
			FROM (
				SELECT  id_tipo_endereco,
                        str_descricao
				FROM public."tbTipoEndereco" AS TEND
				WHERE (TEND.id_tipo_endereco = vIdTipoEndereco)
					OR (TEND.fg_status = '1' AND vIdTipoEndereco IS NULL)
			) endereco
	);

	vTotalLinhas := (
		SELECT COUNT(*)
			FROM public."tbTipoEndereco" AS TEND
			WHERE (TEND.id_tipo_endereco = vIdTipoEndereco)
				OR (TEND.fg_status = '1' AND vIdTipoEndereco IS NULL)
	);

	RETURN json_build_object(
		'result', vResult,
		'totalLinhas', vTotalLinhas
	);

END;
$$ LANGUAGE 'plpgsql';
