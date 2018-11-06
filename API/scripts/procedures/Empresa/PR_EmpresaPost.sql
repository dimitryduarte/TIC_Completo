CREATE OR REPLACE FUNCTION PR_EmpresaPost(
	vStrNome 				TEXT	,
	vNumCnpj 				BIGINT	,
	vNumInscricaoEstadual 	BIGINT 	= NULL,
	vNumInscricaoMunicipal 	BIGINT 	= NULL,
	vStrRazaoSocial 		TEXT 	= NULL
) RETURNS JSON AS $$
DECLARE
	vResult JSON;
BEGIN

	IF NOT EXISTS(SELECT 1
				FROM public."tbEmpresa" AS EMP
				WHERE EMP.num_cnpj = vNumCnpj)
		THEN

			INSERT INTO public."tbEmpresa"
				(str_nome, num_cnpj, num_inscricao_estadual, num_inscricao_municipal, str_razao_social)
				VALUES
					(vStrNome, vNumCnpj, vNumInscricaoEstadual, vNumInscricaoMunicipal, vStrRazaoSocial);

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
						WHERE EMP.num_cnpj = vNumCnpj
					) empresa
			);
			
		END IF;
	
	RETURN json_build_object(
		'result', vResult
	);

END;
$$ LANGUAGE 'plpgsql';
