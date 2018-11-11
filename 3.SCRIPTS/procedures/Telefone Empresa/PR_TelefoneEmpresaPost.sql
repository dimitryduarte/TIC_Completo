CREATE OR REPLACE FUNCTION PR_TelefoneEmpresaPost (
	vIdEmpresa 		INTEGER,
	vIdTipoTelefone INTEGER,
	vNumDddNumero 	SMALLINT,
	vNumNumero 		BIGINT
) RETURNS JSON AS $$
DECLARE
	vContent BOOLEAN := 'true';
	vMessage TEXT := 'Telefone da Empresa cadastrado';
BEGIN

	IF NOT EXISTS (SELECT 1
					FROM public."tbTelefoneEmpresa" AS TEMP
					WHERE TEMP.id_empresa = vIdEmpresa
						AND TEMP.id_tipo_telefone = vIdTipoTelefone
						AND TEMP.num_ddd_numero = vNumDddNumero
						AND TEMP.num_numero = vNumNumero)
		THEN

			INSERT INTO public."tbTelefoneEmpresa"
				(id_empresa, id_tipo_telefone, num_ddd_numero, num_numero)
				VALUES
					(vIdEmpresa, vIdTipoTelefone, vNumDddNumero, vNumNumero);

		ELSE

			vContent := 'false';
			vMessage := 'Telefone da Empresa inválido';
			
		END IF;
	
	RETURN json_build_object(
		'Content', vContent,
		'Message', vMessage
	);

END;
$$ LANGUAGE 'plpgsql';
