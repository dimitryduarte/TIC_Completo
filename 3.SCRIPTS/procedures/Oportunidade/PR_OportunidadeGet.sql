CREATE OR REPLACE FUNCTION PR_OportunidadeGet (
	vIdEmpresa INTEGER = NULL,
	vIdOportunidade INTEGER = NULL
) RETURNS JSON AS $$
DECLARE
	vList JSON;
	vLines INTEGER;
BEGIN

	vList := (
		SELECT  COALESCE(json_agg(oportunidade), '[]')
			FROM (
				SELECT  id_empresa,
						id_oportunidade,
                        id_tipo_oportunidade,
						num_vaga,
                        str_descricao,
						dat_inicio,
                        dat_fim,
                        num_remuneracao,
                        fg_status
				FROM public."tbOportunidade" AS OPOR
				WHERE OPOR.id_oportunidade = vIdOportunidade
					OR OPOR.id_empresa = vIdEmpresa 
					OR (fg_status = 'true'
						AND vIdEmpresa IS NULL 
						AND vIdOportunidade IS NULL)
			) oportunidade
	);

	vLines := (
		SELECT COUNT(*)
			FROM public."tbOportunidade" AS OPOR
			WHERE OPOR.id_oportunidade = vIdOportunidade
					OR OPOR.id_empresa = vIdEmpresa 
					OR (fg_status = 'true'
						AND vIdEmpresa IS NULL 
						AND vIdOportunidade IS NULL)
	);

	RETURN json_build_object (
		'List', vList,
		'Lines', vLines
	);

END;
$$ LANGUAGE 'plpgsql';
