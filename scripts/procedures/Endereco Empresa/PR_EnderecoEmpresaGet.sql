CREATE OR REPLACE FUNCTION PR_EnderecoEmpresaGet (
	vIdEmpresa 	INTEGER = NULL,
	vIdEndereco INTEGER = NULL
) RETURNS JSON AS $$
DECLARE
	vList JSON;
	vLines INTEGER;
BEGIN

	vList := (
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
				WHERE EEMP.id_endereco = vIdEndereco
					OR EEMP.id_empresa = vIdEmpresa
					OR (vIdEndereco IS NULL 
							AND vIdEmpresa IS NULL)
			) endereco
	);

	vLines := (
		SELECT COUNT(*)
			FROM public."tbEnderecoEmpresa" AS EEMP
			WHERE EEMP.id_endereco = vIdEndereco
					OR EEMP.id_empresa = vIdEmpresa
					OR (vIdEndereco IS NULL 
							AND vIdEmpresa IS NULL)
	);

	RETURN json_build_object (
		'List', vList,
		'Lines', vLines
	);

END;
$$ LANGUAGE 'plpgsql';
