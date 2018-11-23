CREATE OR REPLACE FUNCTION PR_EmpresaGet (
	vIdEmpresa 	INTEGER = NULL,
	vStrCnpj 	TEXT	= NULL
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
						EMP.str_cnpj,
						EMP.num_inscricao_estadual,
						EMP.num_inscricao_municipal,
						EMP.str_razao_social,
						EMP.str_atividade,
						EMP.dat_acordo,
						EMP.dat_alteracao,
						EMP.fg_status
				FROM public."tbEmpresa" AS EMP
				WHERE EMP.id_empresa = vIdEmpresa
					OR EMP.str_cnpj = vStrCnpj
					OR (EMP.fg_status = 'true' 
							AND vIdEmpresa IS NULL
							AND vStrCnpj IS NULL)
			) empresa
	);

	vLines := (
		SELECT COUNT(*)
			FROM public."tbEmpresa" AS EMP
			WHERE EMP.id_empresa = vIdEmpresa
				OR EMP.str_cnpj = vStrCnpj
				OR (EMP.fg_status = 'true' 
						AND vIdEmpresa IS NULL
						AND vStrCnpj IS NULL)
	);

	RETURN json_build_object (
		'List', vList,
		'Lines', vLines
	);

END;
$$ LANGUAGE 'plpgsql';
