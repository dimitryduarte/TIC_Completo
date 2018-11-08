CREATE OR REPLACE FUNCTION PR_OportunidadePost (
    vIdEmpresa          INTEGER,
    vStrDescricao       TEXT,
    vDatInicio          DATE,
    vDatFim             DATE,
    vMonRemuneracao     NUMERIC,
    vFgSupervisionado   BIT(1),
    vIdTipoOportunidade INTEGER
) RETURNS JSON AS $$
DECLARE
	vResult INTEGER := 0;
BEGIN

	IF EXISTS(SELECT 1
				FROM public."tbEmpresa" AS EMP
				WHERE EMP.id_empresa = vIdEmpresa)
		THEN

			INSERT INTO public."tbOportunidade"
				(id_empresa, str_descricao, dat_inicio, dat_fim, mon_remuneracao, 
                    fg_supervisionado, id_tipo_oportunidade)
				VALUES
					(vIdEmpresa, vStrDescricao, vDatInicio, vDatFim, vMonRemuneracao, 
                    	vFgSupervisionado, vIdTipoOportunidade);

		ELSE

			vResult := 1;
			
		END IF;
	
	RETURN json_build_object(
		'result', vResult
	);

END;
$$ LANGUAGE 'plpgsql';
