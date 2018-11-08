CREATE OR REPLACE FUNCTION PR_TipoEmailGet(
	vIdTipoEmail INTEGER = NULL
) RETURNS JSON AS $$
DECLARE
	vResult JSON;
	vTotalLinhas INTEGER;
BEGIN

	vResult := (
		SELECT  COALESCE(json_agg(email), '[]')
			FROM (
				SELECT  id_tipo_email,
                        str_descricao
				FROM public."tbTipoEmail" AS TEMAIL
				WHERE (TEMAIL.id_tipo_email = vIdTipoEmail)
					OR (TEMAIL.fg_status = '1' AND vIdTipoEmail IS NULL)
			) email
	);

	vTotalLinhas := (
		SELECT COUNT(*)
			FROM public."tbTipoEmail" AS TEMAIL
			WHERE (TEMAIL.id_tipo_email = vIdTipoEmail)
				OR (TEMAIL.fg_status = '1' AND vIdTipoEmail IS NULL)
	);

	RETURN json_build_object(
		'result', vResult,
		'totalLinhas', vTotalLinhas
	);

END;
$$ LANGUAGE 'plpgsql';
