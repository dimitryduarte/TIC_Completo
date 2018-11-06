CREATE OR REPLACE FUNCTION PR_EmailContatoGet (
	vIdContato 	INTEGER = NULL,
	vIdEmail	INTEGER = NULL
) RETURNS JSON AS $$
DECLARE
	vResult JSON;
	vTotalLinhas INTEGER;
BEGIN

	vResult := (
		SELECT  COALESCE(json_agg(email), '[]')
			FROM (
				SELECT  ECONT.id_email,
						ECONT.id_contato,
						ECONT.id_tipo_email,
						ECONT.str_email
				FROM public."tbEmailContato" AS ECONT
				WHERE (ECONT.id_contato = vIdContato OR vIdContato IS NULL)
					AND (ECONT.id_email = vIdEmail OR vIdEmail IS NULL)
			) email
	);

	vTotalLinhas := (
		SELECT COUNT(*)
			FROM public."tbEmailContato" AS ECONT
			WHERE (ECONT.id_contato = vIdContato OR vIdContato IS NULL)
				AND (ECONT.id_email = vIdEmail OR vIdEmail IS NULL)
	);

	RETURN json_build_object(
		'result', vResult,
		'totalLinhas', vTotalLinhas
	);

END;
$$ LANGUAGE 'plpgsql';
