CREATE OR REPLACE FUNCTION PR_FiltroGet(
	vIdFiltro INTEGER = NULL
) RETURNS JSON AS $$
DECLARE
	vResult JSON;
	vTotalLinhas INTEGER;
BEGIN

	vResult := (
		SELECT  COALESCE(json_agg(filtro), '[]')
			FROM (
				SELECT  id_contato,
                        id_filtro,
                        id_empresa,
                        mon_remuneracao,
                        fg_supervisionado,
                        id_tipo_oportunidade
				FROM public."tbFiltro" AS FIL
				WHERE (FIL.id_filtro = vIdFiltro OR vIdFiltro IS NULL)
			) filtro
	);

	vTotalLinhas := (
		SELECT COUNT(*)
			FROM public."tbFiltro" AS FIL
			WHERE (FIL.id_filtro = vIdFiltro OR vIdFiltro IS NULL)
	);

	RETURN json_build_object(
		'result', vResult,
		'totalLinhas', vTotalLinhas
	);

END;
$$ LANGUAGE 'plpgsql';
