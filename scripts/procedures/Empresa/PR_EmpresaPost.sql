CREATE OR REPLACE FUNCTION PR_EmpresaPost (
	vStrNome 				TEXT	,
	vNumCnpj 				BIGINT	,
	vNumInscricaoEstadual 	BIGINT 	= NULL,
	vNumInscricaoMunicipal 	BIGINT 	= NULL,
	vStrRazaoSocial 		TEXT 	= NULL
) RETURNS JSON AS $$
DECLARE
	vContent BOOLEAN := 'true';
	vMessage TEXT := 'Empresa cadastrada';
BEGIN

	IF EXISTS (SELECT 1
                FROM public."tbEmpresa" AS EMP
                WHERE EMP.num_cnpj = vNumCnpj)
        THEN

            vContent := 'false';
            vMessage := 'CNPJ da Empresa já cadastrada';
            
        END IF;

	IF (vContent)
		THEN

			INSERT INTO public."tbEmpresa"
				(str_nome, num_cnpj, num_inscricao_estadual, num_inscricao_municipal, str_razao_social)
				VALUES
					(vStrNome, vNumCnpj, vNumInscricaoEstadual, vNumInscricaoMunicipal, vStrRazaoSocial);

		END IF;
		
	RETURN json_build_object (
		'Content', vContent,
		'Message', vMessage
	);

END;
$$ LANGUAGE 'plpgsql';
