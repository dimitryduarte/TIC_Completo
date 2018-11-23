CREATE OR REPLACE FUNCTION PR_EmpresaPost (
	vStrNome 				TEXT	,
	vStrCnpj 				TEXT	,
	vDatAcordo				DATE	,
	vNumInscricaoEstadual 	BIGINT 	= NULL,
	vNumInscricaoMunicipal 	BIGINT 	= NULL,
	vStrRazaoSocial 		TEXT 	= NULL,
	vStrAtividade			TEXT	= NULL
) RETURNS JSON AS $$
DECLARE
	vContent BOOLEAN := 'true';
	vMessage TEXT := 'Empresa cadastrada';
BEGIN

	IF EXISTS (SELECT 1
                FROM public."tbEmpresa" AS EMP
                WHERE EMP.str_cnpj = vStrCnpj)
        THEN

            vContent := 'false';
            vMessage := 'CNPJ da Empresa já cadastrada';
            
        END IF;

	IF (vContent)
		THEN

			INSERT INTO public."tbEmpresa"
				(str_nome, str_cnpj, num_inscricao_estadual, num_inscricao_municipal, str_razao_social, 
					str_atividade, dat_acordo, dat_alteracao)
				VALUES
					(vStrNome, vStrCnpj, vNumInscricaoEstadual, vNumInscricaoMunicipal, vStrRazaoSocial,
						vStrAtividade, vDatAcordo, NOW());

		END IF;
		
	RETURN json_build_object (
		'Content', vContent,
		'Message', vMessage
	);

END;
$$ LANGUAGE 'plpgsql';
