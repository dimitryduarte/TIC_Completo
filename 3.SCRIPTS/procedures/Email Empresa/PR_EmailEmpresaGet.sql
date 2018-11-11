CREATE OR REPLACE FUNCTION PR_EmailEmpresaGet (
	vIdEmpresa 	INTEGER = NULL,
	vIdEmail 	INTEGER = NULL
) RETURNS JSON AS $$
DECLARE
	vList JSON;
	vLines INTEGER;
BEGIN

	vList := (
		SELECT  COALESCE(json_agg(email), '[]')
			FROM (
				SELECT  EEMP.id_email,
						EEMP.id_empresa,
						EEMP.id_tipo_email,
						EEMP.str_email
				FROM public."tbEmailEmpresa" AS EEMP
				WHERE EEMP.id_email = vIdEmail
					OR EEMP.id_empresa = vIdEmpresa
					OR (vIdEmail IS NULL
						AND vIdEmpresa IS NULL)
			) email
	);

	vLines := (
		SELECT COUNT(*)
			FROM public."tbEmailEmpresa" AS EEMP
			WHERE EEMP.id_email = vIdEmail
					OR EEMP.id_empresa = vIdEmpresa
					OR (vIdEmail IS NULL
						AND vIdEmpresa IS NULL)
	);

	RETURN json_build_object(
		'List', vList,
		'Lines', vLines
	);

END;
$$ LANGUAGE 'plpgsql';
