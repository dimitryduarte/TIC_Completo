CREATE OR REPLACE FUNCTION PR_CandidaturaGet (
	vIdOportunidade	INTEGER = NULL,
	vIdContato		INTEGER = NULL,
	vIdCandidatura 	INTEGER = NULL
) RETURNS JSON AS $$
DECLARE
	vList JSON;
	vLines INTEGER;
BEGIN

	vList := (
		SELECT  COALESCE(json_agg(candidatura), '[]')
			FROM (
				SELECT  CAND.id_candidatura,
						CAND.id_oportunidade,
						CAND.id_contato,
						CAND.dat_cadastro,
						CAND.fg_status
				FROM public."tbCandidatura" AS CAND
				WHERE CAND.id_candidatura = vIdCandidatura
					OR CAND.id_oportunidade = vIdOportunidade 
					OR CAND.id_contato = vIdContato
					OR (fg_status = 'true'
						AND vIdOportunidade IS NULL 
						AND vIdContato IS NULL 
						AND vIdCandidatura IS NULL)
			) candidatura
	);

	vLines := (
		SELECT COUNT(*)
			FROM public."tbCandidatura" AS CAND
			WHERE CAND.id_candidatura = vIdCandidatura
				OR CAND.id_oportunidade = vIdOportunidade 
				OR CAND.id_contato = vIdContato
				OR (fg_status = 'true'
					AND vIdOportunidade IS NULL 
					AND vIdContato IS NULL 
					AND vIdCandidatura IS NULL)
	);

	RETURN json_build_object(
		'List', vList,
		'Lines', vLines
	);

END;
$$ LANGUAGE 'plpgsql';
