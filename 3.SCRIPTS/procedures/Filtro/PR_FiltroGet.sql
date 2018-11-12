CREATE OR REPLACE FUNCTION PR_FiltroGet (
	vIdFiltro INTEGER = NULL
) RETURNS JSON AS $$
DECLARE
	vList JSON;
	vLines INTEGER;
BEGIN

	vList := (
		SELECT  COALESCE(json_agg(filtro), '[]')
			FROM (
				SELECT  id_filtro,
						id_contato,
                        id_empresa,
                        id_tipo_oportunidade,
                        num_remuneracao_max,
                        num_remuneracao_min
				FROM public."tbFiltro" AS FIL
				WHERE FIL.id_filtro = vIdFiltro 
					OR vIdFiltro IS NULL
			) filtro
	);

	vLines := (
		SELECT COUNT(*)
			FROM public."tbFiltro" AS FIL
			WHERE FIL.id_filtro = vIdFiltro 
				OR vIdFiltro IS NULL
	);

	RETURN json_build_object (
		'List', vList,
		'Lines', vLines
	);

END;
$$ LANGUAGE 'plpgsql';
