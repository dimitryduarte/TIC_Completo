CREATE OR REPLACE FUNCTION PR_EmpresaGet (
	vIdEmpresa 	INTEGER = NULL,
	vNumCnpj 	BIGINT	= NULL
) RETURNS JSON AS $$
DECLARE
	vList JSON;
	vLines INTEGER;
BEGIN

	vList := (
		SELECT  COALESCE(json_agg(empresa), '[]')
			FROM (
				SELECT  EMP.id_empresa,
						EMP.str_nome,
						EMP.num_cnpj,
						EMP.num_inscricao_estadual,
						EMP.num_inscricao_municipal,
						EMP.str_razao_social,
						EMP.fg_status
				FROM public."tbEmpresa" AS EMP
				WHERE EMP.id_empresa = vIdEmpresa
					OR EMP.num_cnpj = vNumCnpj
					OR (EMP.fg_status = 'true' 
							AND vIdEmpresa IS NULL
							AND vNumCnpj IS NULL)
			) empresa
	);

	vLines := (
		SELECT COUNT(*)
			FROM public."tbEmpresa" AS EMP
			WHERE EMP.id_empresa = vIdEmpresa
				OR EMP.num_cnpj = vNumCnpj
				OR (EMP.fg_status = 'true' 
						AND vIdEmpresa IS NULL
						AND vNumCnpj IS NULL)
	);

	RETURN json_build_object (
		'List', vList,
		'Lines', vLines
	);

END;
$$ LANGUAGE 'plpgsql';
