CREATE OR REPLACE FUNCTION PR_ContatoGet (
	vIdContato INTEGER = NULL
) RETURNS JSON AS $$
DECLARE
	vList JSON;
	vLines INTEGER;
BEGIN

	vList := (
		SELECT  COALESCE(json_agg(contato), '[]')
			FROM (
				SELECT  CONT.id_contato,
						CONT.str_observacao,
						CONT.num_criatividade,
						CONT.num_comunicacao,
						CONT.num_colaboracao,
						CONT.num_lideranca,
						CONT.fg_status
				FROM public."tbContato" AS CONT
				WHERE CONT.id_contato = vIdContato 
					OR (CONT.fg_status = 'true' AND vIdContato IS NULL)
			) contato
	);

	vLines := (
		SELECT COUNT(*)
			FROM public."tbContato" AS CONT
			WHERE CONT.id_contato = vIdContato 
				OR (CONT.fg_status = 'true' AND vIdContato IS NULL)
	);

	RETURN json_build_object(
		'List', vList,
		'Lines', vLines
	);

END;
$$ LANGUAGE 'plpgsql';
