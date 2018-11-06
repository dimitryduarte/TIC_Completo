CREATE OR REPLACE FUNCTION PR_TipoTelefoneGet(
	vIdTipoTelefone INTEGER = NULL
) RETURNS JSON AS $$
DECLARE
	vResult JSON;
	vTotalLinhas INTEGER;
BEGIN

	vResult := (
		SELECT  COALESCE(json_agg(telefone), '[]')
			FROM (
				SELECT  id_tipo_telefone,
                        str_descricao
				FROM public."tbTipoTelefone" AS TTEL
				WHERE (TTEL.id_tipo_telefone = vIdTipoTelefone)
					OR (TTEL.fg_status = '1' AND vIdTipoTelefone IS NULL)
			) telefone
	);

	vTotalLinhas := (
		SELECT COUNT(*)
			FROM public."tbTipoTelefone" AS TTEL
			WHERE (TTEL.id_tipo_telefone = vIdTipoTelefone)
				OR (TTEL.fg_status = '1' AND vIdTipoTelefone IS NULL)
	);

	RETURN json_build_object(
		'result', vResult,
		'totalLinhas', vTotalLinhas
	);

END;
$$ LANGUAGE 'plpgsql';
