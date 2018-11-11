CREATE OR REPLACE FUNCTION PR_EnderecoEmpresaPost (
	vIdEmpresa 			INTEGER,
	vIdTipoEndereco 	INTEGER,
	vNumCep 			INTEGER,
	vStrLogradouro 		TEXT,
	vNumNumero 			SMALLINT,
	vStrBairro 			TEXT,
	vStrCidade 			TEXT,
	vStrUf 				TEXT
) RETURNS JSON AS $$
DECLARE
	vContent BOOLEAN := 'true';
	vMessage TEXT := 'Endereço da Empresa cadastrado';
BEGIN

	IF NOT EXISTS (SELECT 1
					FROM public."tbEnderecoEmpresa" AS EEMP
					WHERE EEMP.id_empresa = vIdEmpresa
						AND EEMP.id_tipo_endereco = vIdTipoEndereco
						AND EEMP.num_cep = vNumCep
						AND EEMP.num_numero = vNumNumero)
		THEN

			INSERT INTO public."tbEnderecoEmpresa"
				(id_empresa, id_tipo_endereco, num_cep, str_logradouro, num_numero, 
					str_bairro, str_cidade, str_uf)
				VALUES
					(vIdEmpresa, vIdTipoEndereco, vNumCep, vStrLogradouro, vNumNumero, 
						vStrBairro, vStrCidade, vStrUf);

		ELSE

			vContent := 'false';
			vMessage := 'Endereço da Empresa inválido';
			
		END IF;
	
	RETURN json_build_object(
		'Content', vContent,
		'Message', vMessage
	);

END;
$$ LANGUAGE 'plpgsql';
