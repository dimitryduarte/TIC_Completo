CREATE OR REPLACE FUNCTION PR_EmpresaGet(
	vIdEmpresa INTEGER = NULL
) RETURNS JSON AS $$
DECLARE
	vResult JSON;
	vTotalLinhas INTEGER;
BEGIN

	vResult := (
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
				WHERE (EMP.id_empresa = vIdEmpresa)
					OR (EMP.fg_status = '1' AND vIdEmpresa IS NULL)
			) empresa
	);

	vTotalLinhas := (
		SELECT COUNT(*)
			FROM public."tbEmpresa" AS EMP
			WHERE (EMP.id_empresa = vIdEmpresa)
				OR (EMP.fg_status = '1' AND vIdEmpresa IS NULL)
	);

	RETURN json_build_object(
		'result', vResult,
		'totalLinhas', vTotalLinhas
	);

END;
$$ LANGUAGE 'plpgsql';
