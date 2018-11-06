CREATE OR REPLACE FUNCTION PR_EmailEmpresaGet (
	vIdEmpresa 	INTEGER = NULL,
	vIdEmail 	INTEGER = NULL
) RETURNS JSON AS $$
DECLARE
	vResult JSON;
	vTotalLinhas INTEGER;
BEGIN

	vResult := (
		SELECT  COALESCE(json_agg(email), '[]')
			FROM (
				SELECT  EEMP.id_email,
						EEMP.id_empresa,
						EEMP.id_tipo_email,
						EEMP.str_email
				FROM public."tbEmailEmpresa" AS EEMP
				WHERE (EEMP.id_empresa = vIdEmpresa OR vIdEmpresa IS NULL)
					AND (EEMP.id_email = vIdEmail OR vIdEmail IS NULL)
			) email
	);

	vTotalLinhas := (
		SELECT COUNT(*)
			FROM public."tbEmailEmpresa" AS EEMP
			WHERE (EEMP.id_empresa = vIdEmpresa OR vIdEmpresa IS NULL)
				AND (EEMP.id_email = vIdEmail OR vIdEmail IS NULL)
	);

	RETURN json_build_object(
		'result', vResult,
		'totalLinhas', vTotalLinhas
	);

END;
$$ LANGUAGE 'plpgsql';
