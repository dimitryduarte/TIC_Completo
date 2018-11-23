CREATE OR REPLACE FUNCTION PR_EmpresaPut (
	vIdEmpresa              INTEGER,
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
    vMessage TEXT := 'Empresa alterada';
BEGIN

    IF NOT EXISTS (SELECT 1
                    FROM public."tbEmpresa" AS EMP
                    WHERE EMP.id_empresa = vIdEmpresa)
        THEN
        
            vContent := 'false';
            vMessage := 'Empresa não encontrada';
            
        END IF;


    IF(vContent)
        THEN
        
            UPDATE public."tbEmpresa"
                SET str_nome = vStrNome,
                    str_cnpj = vStrCnpj,
                    num_inscricao_estadual = vNumInscricaoEstadual,
                    num_inscricao_municipal = vNumInscricaoMunicipal,
                    str_razao_social = vStrRazaoSocial,
                    str_atividade = vStrAtividade,
                    dat_acordo = vDatAcordo,
                    dat_alteracao = NOW()
                WHERE id_empresa = vIdEmpresa;
            
        END IF;
        
    RETURN json_build_object (
        'Content', vContent,
        'Message', vMessage
    );

END;
$$ LANGUAGE 'plpgsql';
