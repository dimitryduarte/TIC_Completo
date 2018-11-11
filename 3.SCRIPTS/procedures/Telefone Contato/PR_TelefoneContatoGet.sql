CREATE OR REPLACE FUNCTION PR_TelefoneContatoGet (
	vIdContato 	INTEGER = NULL,
	vIdTelefone INTEGER = NULL
) RETURNS JSON AS $$
DECLARE
	vList JSON;
	vLines INTEGER;
BEGIN

	vList := (
		SELECT  COALESCE(json_agg(telefone), '[]')
			FROM (
				SELECT  TCONT.id_telefone,
						TCONT.id_contato,
						TCONT.id_tipo_telefone,
						TCONT.num_ddd_numero,
						TCONT.num_numero
				FROM public."tbTelefoneContato" AS TCONT
				WHERE TCONT.id_telefone = vIdTelefone
					OR TCONT.id_contato = vIdContato
					OR (vIdTelefone IS NULL 
						AND vIdContato IS NULL)
			) telefone
	);

	vLines := (
		SELECT COUNT(*)
			FROM public."tbTelefoneContato" AS TCONT
			WHERE TCONT.id_telefone = vIdTelefone
				OR TCONT.id_contato = vIdContato
				OR (vIdTelefone IS NULL 
					AND vIdContato IS NULL)
	);

	RETURN json_build_object(
		'List', vList,
		'Lines', vLines
	);

END;
$$ LANGUAGE 'plpgsql';
