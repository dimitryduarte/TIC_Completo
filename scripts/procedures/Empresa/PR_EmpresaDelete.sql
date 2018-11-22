CREATE OR REPLACE FUNCTION PR_EmpresaDelete (
	vIdEmpresa INTEGER
) RETURNS JSON AS $$
DECLARE
    vContent BOOLEAN := 'true';
	vMessage TEXT := 'Empresa deletada';
BEGIN

    IF EXISTS (SELECT 1
                FROM public."tbEmpresa" AS EMP
                WHERE EMP.id_empresa = vIdEmpresa)
        THEN
        
            UPDATE public."tbEmpresa"
                SET fg_status = 'false'
                WHERE id_empresa = vIdEmpresa;
                
        ELSE
        
            vContent := 'false';
            vMessage := 'Empresa não encontrada';
            
        END IF;
        
    RETURN json_build_object (
        'Content', vContent,
        'Message', vMessage
    );

END;
$$ LANGUAGE 'plpgsql';
