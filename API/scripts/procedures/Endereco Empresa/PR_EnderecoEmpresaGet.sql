CREATE OR REPLACE FUNCTION PR_EnderecoEmpresaGet (
	vIdEmpresa 	INTEGER = NULL,
	vIdEndereco INTEGER = NULL
) RETURNS JSON AS $$
DECLARE
	vResult JSON;
	vTotalLinhas INTEGER;
BEGIN

	vResult := (
		SELECT  COALESCE(json_agg(endereco), '[]')
			FROM (
				SELECT  EEMP.id_endereco,
						EEMP.id_empresa,
						EEMP.id_tipo_endereco,
						EEMP.num_cep,
						EEMP.str_logradouro,
						EEMP.num_numero,
						EEMP.str_bairro,
						EEMP.str_cidade,
						EEMP.str_uf
				FROM public."tbEnderecoEmpresa" AS EEMP
				WHERE (EEMP.id_empresa = vIdEmpresa OR vIdEmpresa IS NULL)
					AND (EEMP.id_endereco = vIdEndereco OR vIdEndereco IS NULL)
			) endereco
	);

	vTotalLinhas := (
		SELECT COUNT(*)
			FROM public."tbEnderecoEmpresa" AS EEMP
			WHERE (EEMP.id_empresa = vIdEmpresa OR vIdEmpresa IS NULL)
				AND (EEMP.id_endereco = vIdEndereco OR vIdEndereco IS NULL)
	);

	RETURN json_build_object(
		'result', vResult,
		'totalLinhas', vTotalLinhas
	);

END;
$$ LANGUAGE 'plpgsql';
