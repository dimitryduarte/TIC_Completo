CREATE OR REPLACE FUNCTION PR_CandidaturaGet(
	vIdOportunidade	INTEGER = NULL,
	vIdContato		INTEGER = NULL,
	vIdCandidatura 	INTEGER = NULL
) RETURNS JSON AS $$
DECLARE
	vResult JSON;
	vTotalLinhas INTEGER;
BEGIN

	vResult := (
		SELECT  COALESCE(json_agg(candidatura), '[]')
			FROM (
				SELECT  CAND.id_candidatura,
						CAND.id_oportunidade,
						CAND.id_contato,
						CAND.dat_cadastro,
						CAND.fg_status
				FROM public."tbCandidatura" AS CAND
				WHERE (CAND.id_oportunidade = vIdOportunidade 
						OR CAND.id_contato = vIdContato
						OR CAND.id_candidatura = vIdCandidatura)
					OR (vIdOportunidade IS NULL 
						AND vIdContato IS NULL 
						AND vIdCandidatura IS NULL 
						AND fg_status)
			) candidatura
	);

	vTotalLinhas := (
		SELECT COUNT(*)
			FROM public."tbCandidatura" AS CAND
			WHERE (CAND.id_oportunidade = vIdOportunidade 
					OR CAND.id_contato = vIdContato
					OR CAND.id_candidatura = vIdCandidatura)
				OR (vIdOportunidade IS NULL 
					AND vIdContato IS NULL 
					AND vIdCandidatura IS NULL 
					AND fg_status)
	);

	RETURN json_build_object(
		'result', vResult,
		'totalLinhas', vTotalLinhas
	);

END;
$$ LANGUAGE 'plpgsql';
