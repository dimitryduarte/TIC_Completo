CREATE OR REPLACE FUNCTION PR_TelefoneContatoGet (
	vIdContato 	INTEGER = NULL,
	vIdTelefone INTEGER = NULL
) RETURNS JSON AS $$
DECLARE
	vResult JSON;
	vTotalLinhas INTEGER;
BEGIN

	vResult := (
		SELECT  COALESCE(json_agg(telefone), '[]')
			FROM (
				SELECT  TCONT.id_telefone,
						TCONT.id_contato,
						TCONT.id_tipo_telefone,
						TCONT.num_ddd_numero,
						TCONT.num_numero
				FROM public."tbTelefoneContato" AS TCONT
				WHERE (TCONT.id_contato = vIdContato OR vIdContato IS NULL)
					AND (TCONT.id_telefone = vIdTelefone OR vIdTelefone IS NULL)
			) telefone
	);

	vTotalLinhas := (
		SELECT COUNT(*)
			FROM public."tbTelefoneContato" AS TCONT
			WHERE (TCONT.id_contato = vIdContato OR vIdContato IS NULL)
				AND (TCONT.id_telefone = vIdTelefone OR vIdTelefone IS NULL)
	);

	RETURN json_build_object(
		'result', vResult,
		'totalLinhas', vTotalLinhas
	);

END;
$$ LANGUAGE 'plpgsql';
