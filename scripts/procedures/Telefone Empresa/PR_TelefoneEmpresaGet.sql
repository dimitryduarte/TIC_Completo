CREATE OR REPLACE FUNCTION PR_TelefoneEmpresaGet (
	vIdEmpresa 	INTEGER = NULL,
	vIdTelefone INTEGER = NULL
) RETURNS JSON AS $$
DECLARE
	vList JSON;
	vLines INTEGER;
BEGIN

	vList := (
		SELECT  COALESCE(json_agg(telefone), '[]')
			FROM (
				SELECT  TEMP.id_telefone,
						TEMP.id_empresa,
						TEMP.id_tipo_telefone,
						TEMP.num_ddd_numero,
						TEMP.num_numero
				FROM public."tbTelefoneEmpresa" AS TEMP
				WHERE TEMP.id_telefone = vIdTelefone
					OR TEMP.id_empresa = vIdEmpresa
					OR (vIdEmpresa IS NULL
						AND vIdTelefone IS NULL)
			) telefone
	);

	vLines := (
		SELECT COUNT(*)
			FROM public."tbTelefoneEmpresa" AS TEMP
			WHERE TEMP.id_telefone = vIdTelefone
				OR TEMP.id_empresa = vIdEmpresa
				OR (vIdEmpresa IS NULL
					AND vIdTelefone IS NULL)
	);

	RETURN json_build_object(
		'List', vList,
		'Lines', vLines
	);

END;
$$ LANGUAGE 'plpgsql';
