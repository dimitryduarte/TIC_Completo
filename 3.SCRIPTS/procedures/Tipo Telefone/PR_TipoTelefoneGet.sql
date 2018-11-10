CREATE OR REPLACE FUNCTION PR_TipoTelefoneGet (
	vIdTipoTelefone INTEGER = NULL
) RETURNS JSON AS $$
DECLARE
	vList JSON;
	vLines INTEGER;
BEGIN

	vList := (
		SELECT  COALESCE(json_agg(telefone), '[]')
			FROM (
				SELECT  TTEL.id_tipo_telefone,
                        TTEL.str_descricao,
						TTEL.fg_status
				FROM public."tbTipoTelefone" AS TTEL
				WHERE (TTEL.id_tipo_telefone = vIdTipoTelefone)
					OR (TTEL.fg_status = 'true' AND vIdTipoTelefone IS NULL)
			) telefone
	);

	vLines := (
		SELECT COUNT(*)
			FROM public."tbTipoTelefone" AS TTEL
			WHERE (TTEL.id_tipo_telefone = vIdTipoTelefone)
				OR (TTEL.fg_status = 'true' AND vIdTipoTelefone IS NULL)
	);

	RETURN json_build_object (
		'List', vList,
		'Lines', vLines
	);

END;
$$ LANGUAGE 'plpgsql';
