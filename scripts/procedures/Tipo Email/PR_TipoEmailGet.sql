CREATE OR REPLACE FUNCTION PR_TipoEmailGet (
	vIdTipoEmail INTEGER = NULL
) RETURNS JSON AS $$
DECLARE
	vList JSON;
	vLines INTEGER;
BEGIN

	vList := (
		SELECT  COALESCE(json_agg(email), '[]')
			FROM (
				SELECT  id_tipo_email,
                        str_descricao,
						fg_status
				FROM public."tbTipoEmail" AS TEMAIL
				WHERE TEMAIL.id_tipo_email = vIdTipoEmail
					OR (TEMAIL.fg_status = 'true' AND vIdTipoEmail IS NULL)
			) email
	);

	vLines := (
		SELECT COUNT(*)
			FROM public."tbTipoEmail" AS TEMAIL
			WHERE TEMAIL.id_tipo_email = vIdTipoEmail
				OR (TEMAIL.fg_status = 'true' AND vIdTipoEmail IS NULL)
	);

	RETURN json_build_object(
		'List', vList,
		'Lines', vLines
	);

END;
$$ LANGUAGE 'plpgsql';
