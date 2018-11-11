CREATE OR REPLACE FUNCTION PR_EmailContatoGet (
	vIdContato 	INTEGER = NULL,
	vIdEmail	INTEGER = NULL
) RETURNS JSON AS $$
DECLARE
	vList JSON;
	vLines INTEGER;
BEGIN

	vList := (
		SELECT  COALESCE(json_agg(email), '[]')
			FROM (
				SELECT  ECONT.id_email,
						ECONT.id_contato,
						ECONT.id_tipo_email,
						ECONT.str_email
				FROM public."tbEmailContato" AS ECONT
				WHERE ECONT.id_email = vIdEmail
					OR ECONT.id_contato = vIdContato
					OR (vIdEmail IS NULL
						AND vIdContato IS NULL)
			) email
	);

	vLines := (
		SELECT COUNT(*)
			FROM public."tbEmailContato" AS ECONT
			WHERE ECONT.id_email = vIdEmail
				OR ECONT.id_contato = vIdContato
				OR (vIdEmail IS NULL
					AND vIdContato IS NULL)
	);

	RETURN json_build_object(
		'List', vList,
		'Lines', vLines
	);

END;
$$ LANGUAGE 'plpgsql';
