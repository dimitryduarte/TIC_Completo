CREATE OR REPLACE FUNCTION PR_EmpresaPut(
	vIdEmpresa              INTEGER,
    vStrNome 				TEXT	,
	vNumCnpj 				BIGINT	,
	vNumInscricaoEstadual 	BIGINT 	= NULL,
	vNumInscricaoMunicipal 	BIGINT 	= NULL,
	vStrRazaoSocial 		TEXT 	= NULL
) RETURNS JSON AS $$
DECLARE
    vResult INTEGER := 0;
BEGIN

    IF EXISTS(SELECT 1
                FROM public."tbEmpresa" AS EMP
                WHERE EMP.id_empresa = vIdEmpresa)
        THEN
        
            UPDATE public."tbEmpresa"
                SET str_nome = vStrNome,
                    num_cnpj = vNumCnpj,
                    num_inscricao_estadual = vNumInscricaoEstadual,
                    num_inscricao_municipal = vNumInscricaoMunicipal,
                    str_razao_social = vStrRazaoSocial
                WHERE id_empresa = vIdEmpresa;
                
        ELSE
        
            vResult := 1;
            
        END IF;
        
    RETURN json_build_object(
        'result', vResult
    );

END;
$$ LANGUAGE 'plpgsql';
