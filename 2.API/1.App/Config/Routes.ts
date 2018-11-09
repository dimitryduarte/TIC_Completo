import core from "express-serve-static-core";

import Helpers from "./Helpers";
import CandidaturaController from "../Controllers/CandidaturaController";
import ContatoController from "../Controllers/ContatoController";
import EmailEmpresaController from "../Controllers/EmailEmpresaController";
import EmailContatoController from "../Controllers/EmailContatoController";
import EmpresaController from "../Controllers/EmpresaController";
import EnderecoEmpresaController from "../Controllers/EnderecoEmpresaController";
import FiltroController from "../Controllers/FiltroController";
import OportunidadeController from "../Controllers/OportunidadeController";
import TelefoneContatoController from "../Controllers/TelefoneContatoController";
import TelefoneEmpresaController from "../Controllers/TelefoneEmpresaController";
import TipoEmailController from "../Controllers/TipoEmailController";
import TipoEnderecoController from "../Controllers/TipoEnderecoController";
import TipoOportunidadeController from "../Controllers/TipoOportunidadeController";
import TipoTelefoneController from "../Controllers/TipoTelefoneController";
import CandidaturaDto from "../../2.Domain/Candidatura/Dtos/CandidaturaDto";
import ContatoDto from "../../2.Domain/Contato/Dtos/ContatoDto";
import EmailContatoDto from "../../2.Domain/EmailContato/Dtos/EmailContatoDto";
import EmailEmpresaDto from "../../2.Domain/EmailEmpresa/Dtos/EmailEmpresaDto";
import EmpresaDto from "../../2.Domain/Empresa/Dtos/EmpresaDto";
import EnderecoEmpresaDto from "../../2.Domain/EnderecoEmpresa/Dtos/EnderecoEmpresaDto";
import FiltroDto from "../../2.Domain/Filtro/Dtos/FiltroDto";
import OportunidadeDto from "../../2.Domain/Oportunidade/Dtos/OportunidadeDto";
import TelefoneContatoDto from "../../2.Domain/TelefoneContato/Dtos/TelefoneContatoDto";
import TelefoneEmpresaDto from "../../2.Domain/TelefoneEmpresa/Dtos/TelefoneEmpresaDto";
import TipoEmailDto from "../../2.Domain/TipoEmail/Dtos/TipoEmailDto";
import TipoEnderecoDto from "../../2.Domain/TipoEndereco/Dtos/TipoEnderecoDto";
import TipoOportunidadeDto from "../../2.Domain/TipoOportunidade/Dtos/TipoOportunidadeDto";
import TipoTelefoneDto from "../../2.Domain/TipoTelefone/Dtos/TipoTelefoneDto";

export default class Routers extends Helpers
{
    private candidaturaController: CandidaturaController = new CandidaturaController();
    private contatoController: ContatoController = new ContatoController();
    private emailContatoController: EmailContatoController = new EmailContatoController();
    private emailEmpresaController: EmailEmpresaController = new EmailEmpresaController();
    private empresaController: EmpresaController = new EmpresaController();
    private enderecoEmpresaController: EnderecoEmpresaController = new EnderecoEmpresaController();
    private filtroController: FiltroController = new FiltroController();
    private oportunidadeController: OportunidadeController = new OportunidadeController();
    private telefoneContatoController: TelefoneContatoController = new TelefoneContatoController();
    private telefoneEmpresaController: TelefoneEmpresaController = new TelefoneEmpresaController();
    private tipoEmailController: TipoEmailController = new TipoEmailController();
    private tipoEnderecoController: TipoEnderecoController = new TipoEnderecoController();
    private tipoOportunidadeController: TipoOportunidadeController = new TipoOportunidadeController();
    private tipoTelefoneController: TipoTelefoneController = new TipoTelefoneController();

    constructor(_app: core.Express)
    {
        super();
        this.Bind(_app);
    }

    private Bind(_app: core.Express): void
    {   
        // CandidaturaController
        _app.use("/api/candidatura/get", this.Get("/:id_oportunidade?/:id_contato?/:id_candidatura?", this.candidaturaController.Get, new CandidaturaDto()));
        _app.use("/api/candidatura/post", this.Post(this.candidaturaController.Post, new CandidaturaDto()));
        _app.use("/api/candidatura/delete", this.Delete(this.candidaturaController.Delete, new CandidaturaDto()));

        // ContatoController
        _app.use("/api/contato/get", this.Get("/:id_contato?", this.contatoController.Get, new ContatoDto()));
        _app.use("/api/contato/post", this.Post(this.contatoController.Post, new ContatoDto()));
        _app.use("/api/contato/put", this.Put(this.contatoController.Put, new ContatoDto()));
        _app.use("/api/contato/delete", this.Delete(this.contatoController.Delete, new ContatoDto()));

        // EmailContatoController
        _app.use("/api/emailContato/get", this.Get("/:id_contato?/:id_email?", this.emailContatoController.Get, new EmailContatoDto()));
        _app.use("/api/emailContato/post", this.Post(this.emailContatoController.Post, new EmailContatoDto()));
        _app.use("/api/emailContato/delete", this.Delete(this.emailContatoController.Delete, new EmailContatoDto()));

        // EmailEmpresaController
        _app.use("/api/emailEmpresa/get", this.Get("/:id_empresa?/:id_email?", this.emailEmpresaController.Get, new EmailEmpresaDto()));
        _app.use("/api/emailEmpresa/post", this.Post(this.emailEmpresaController.Post, new EmailEmpresaDto()));
        _app.use("/api/emailEmpresa/delete", this.Delete(this.emailEmpresaController.Delete, new EmailEmpresaDto()));

        // EmpresaController
        _app.use("/api/empresa/get", this.Get("/:id_empresa?", this.empresaController.Get, new EmpresaDto()));
        _app.use("/api/empresa/post", this.Post(this.empresaController.Post, new EmpresaDto()));
        _app.use("/api/empresa/put", this.Put(this.empresaController.Put, new EmpresaDto()));
        _app.use("/api/empresa/delete", this.Delete(this.empresaController.Delete, new EmpresaDto()));

        // EnderecoEmpresaController
        _app.use("/api/enderecoEmpresa/get", this.Get("/:id_empresa?/:id_endereco?", this.enderecoEmpresaController.Get, new EnderecoEmpresaDto()));
        _app.use("/api/enderecoEmpresa/post", this.Post(this.enderecoEmpresaController.Post, new EnderecoEmpresaDto()));
        _app.use("/api/enderecoEmpresa/delete", this.Delete(this.enderecoEmpresaController.Delete, new EnderecoEmpresaDto()));

        // FiltroController
        _app.use("/api/filtro/get", this.Get("/:id_filtro?", this.filtroController.Get, new FiltroDto()));
        _app.use("/api/filtro/post", this.Post(this.filtroController.Post, new FiltroDto()));
        _app.use("/api/filtro/put", this.Put(this.filtroController.Put, new FiltroDto()));
        _app.use("/api/filtro/delete", this.Delete(this.filtroController.Delete, new FiltroDto()));

        // OportunidadeController
        _app.use("/api/oportunidade/get", this.Get("/:id_empresa?/:id_oportunidade?", this.oportunidadeController.Get, new OportunidadeDto()));
        _app.use("/api/oportunidade/post", this.Post(this.oportunidadeController.Post, new OportunidadeDto()));
        _app.use("/api/oportunidade/put", this.Put(this.oportunidadeController.Put, new OportunidadeDto()));
        _app.use("/api/oportunidade/delete", this.Delete(this.oportunidadeController.Delete, new OportunidadeDto()));

        // TelefoneContatoController
        _app.use("/api/telefoneContato/get", this.Get("/:id_contato?/:id_telefone?", this.telefoneContatoController.Get, new TelefoneContatoDto()));
        _app.use("/api/telefoneContato/post", this.Post(this.telefoneContatoController.Post, new TelefoneContatoDto()));
        _app.use("/api/telefoneContato/delete", this.Delete(this.telefoneContatoController.Delete, new TelefoneContatoDto()));

        // TelefoneEmpresaController
        _app.use("/api/telefoneEmpresa/get", this.Get("/:id_empresa?/:id_telefone?", this.telefoneEmpresaController.Get, new TelefoneEmpresaDto()));
        _app.use("/api/telefoneEmpresa/post", this.Post(this.telefoneEmpresaController.Post, new TelefoneEmpresaDto()));
        _app.use("/api/telefoneEmpresa/delete", this.Delete(this.telefoneEmpresaController.Delete, new TelefoneEmpresaDto()));

        // TipoEmailController
        _app.use("/api/tipoEmail/get", this.Get("/:id_tipo_email?", this.tipoEmailController.Get, new TipoEmailDto()));
        _app.use("/api/tipoEmail/post", this.Post(this.tipoEmailController.Post, new TipoEmailDto()));
        _app.use("/api/tipoEmail/put", this.Put(this.tipoEmailController.Put, new TipoEmailDto()));
        _app.use("/api/tipoEmail/delete", this.Delete(this.tipoEmailController.Delete, new TipoEmailDto()));

        // TipoEnderecoController
        _app.use("/api/tipoEndereco/get", this.Get("/:id_tipo_endereco?", this.tipoEnderecoController.Get, new TipoEnderecoDto()));
        _app.use("/api/tipoEndereco/post", this.Post(this.tipoEnderecoController.Post, new TipoEnderecoDto()));
        _app.use("/api/tipoEndereco/put", this.Put(this.tipoEnderecoController.Put, new TipoEnderecoDto()));
        _app.use("/api/tipoEndereco/delete", this.Delete(this.tipoEnderecoController.Delete, new TipoEnderecoDto()));

        // TipoOportunidadeController
        _app.use("/api/tipoOportunidade/get", this.Get("/:id_tipo_oportunidade?", this.tipoOportunidadeController.Get, new TipoOportunidadeDto()));
        _app.use("/api/tipoOportunidade/post", this.Post(this.tipoOportunidadeController.Post, new TipoOportunidadeDto()));
        _app.use("/api/tipoOportunidade/put", this.Put(this.tipoOportunidadeController.Put, new TipoOportunidadeDto()));
        _app.use("/api/tipoOportunidade/delete", this.Delete(this.tipoOportunidadeController.Delete, new TipoOportunidadeDto()));

        // TipoTelefoneController
        _app.use("/api/tipoTelefone/get", this.Get("/:id_tipo_telefone?", this.tipoTelefoneController.Get, new TipoTelefoneDto()));
        _app.use("/api/tipoTelefone/post", this.Post(this.tipoTelefoneController.Post, new TipoTelefoneDto()));
        _app.use("/api/tipoTelefone/put", this.Put(this.tipoTelefoneController.Put, new TipoTelefoneDto()));
        _app.use("/api/tipoTelefone/delete", this.Delete(this.tipoTelefoneController.Delete, new TipoTelefoneDto()));
    }
}
