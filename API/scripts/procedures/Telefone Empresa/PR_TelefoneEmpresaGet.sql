CREATE OR REPLACE FUNCTION PR_TelefoneEmpresaGet (
	vIdEmpresa 	INTEGER = NULL,
	vIdTelefone INTEGER = NULL
) RETURNS JSON AS $$
DECLARE
	vResult JSON;
	vTotalLinhas INTEGER;
BEGIN

	vResult := (
		SELECT  COALESCE(json_agg(telefone), '[]')
			FROM (
				SELECT  TEMP.id_telefone,
						TEMP.id_empresa,
						TEMP.id_tipo_telefone,
						TEMP.num_ddd_numero,
						TEMP.num_numero
				FROM public."tbTelefoneEmpresa" AS TEMP
				WHERE (TEMP.id_empresa = vIdEmpresa OR vIdEmpresa IS NULL)
					AND (TEMP.id_telefone = vIdTelefone OR vIdTelefone IS NULL)
			) telefone
	);

	vTotalLinhas := (
		SELECT COUNT(*)
			FROM public."tbTelefoneEmpresa" AS TEMP
			WHERE (TEMP.id_empresa = vIdEmpresa OR vIdEmpresa IS NULL)
				AND (TEMP.id_telefone = vIdTelefone OR vIdTelefone IS NULL)
	);

	RETURN json_build_object(
		'result', vResult,
		'totalLinhas', vTotalLinhas
	);

END;
$$ LANGUAGE 'plpgsql';
