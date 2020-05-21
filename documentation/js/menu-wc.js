'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">algamoney-ui documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-7109b60fae75c365a079d865bea067ea"' : 'data-target="#xs-components-links-module-AppModule-7109b60fae75c365a079d865bea067ea"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-7109b60fae75c365a079d865bea067ea"' :
                                            'id="xs-components-links-module-AppModule-7109b60fae75c365a079d865bea067ea"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link">CoreModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CoreModule-bf13e43f5edfe8b80a74dca55759f94e"' : 'data-target="#xs-components-links-module-CoreModule-bf13e43f5edfe8b80a74dca55759f94e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CoreModule-bf13e43f5edfe8b80a74dca55759f94e"' :
                                            'id="xs-components-links-module-CoreModule-bf13e43f5edfe8b80a74dca55759f94e"' }>
                                            <li class="link">
                                                <a href="components/NaoAutorizadoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NaoAutorizadoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavbarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NavbarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PaginaNaoEncontradaComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PaginaNaoEncontradaComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CoreModule-bf13e43f5edfe8b80a74dca55759f94e"' : 'data-target="#xs-injectables-links-module-CoreModule-bf13e43f5edfe8b80a74dca55759f94e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CoreModule-bf13e43f5edfe8b80a74dca55759f94e"' :
                                        'id="xs-injectables-links-module-CoreModule-bf13e43f5edfe8b80a74dca55759f94e"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CategoriaService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>CategoriaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DashboardService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>DashboardService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ErrorHandlerService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ErrorHandlerService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LancamentoService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>LancamentoService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/MoneyHttp.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>MoneyHttp</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PessoaService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>PessoaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RelatoriosService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>RelatoriosService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DashboardModule.html" data-type="entity-link">DashboardModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DashboardModule-99058430183ab46f113b653e168cd823"' : 'data-target="#xs-components-links-module-DashboardModule-99058430183ab46f113b653e168cd823"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DashboardModule-99058430183ab46f113b653e168cd823"' :
                                            'id="xs-components-links-module-DashboardModule-99058430183ab46f113b653e168cd823"' }>
                                            <li class="link">
                                                <a href="components/DashboardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DashboardComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DashboardRoutingModule.html" data-type="entity-link">DashboardRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LancamentosModule.html" data-type="entity-link">LancamentosModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LancamentosModule-fbb4d36c5526e42910ff2fe422a7d45b"' : 'data-target="#xs-components-links-module-LancamentosModule-fbb4d36c5526e42910ff2fe422a7d45b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LancamentosModule-fbb4d36c5526e42910ff2fe422a7d45b"' :
                                            'id="xs-components-links-module-LancamentosModule-fbb4d36c5526e42910ff2fe422a7d45b"' }>
                                            <li class="link">
                                                <a href="components/LancamentoCadastroComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LancamentoCadastroComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LancamentosPesquisaComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LancamentosPesquisaComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LancamentosRoutingModule.html" data-type="entity-link">LancamentosRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PessoasModule.html" data-type="entity-link">PessoasModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PessoasModule-280ccd70e0151fdaa93aab08612254fc"' : 'data-target="#xs-components-links-module-PessoasModule-280ccd70e0151fdaa93aab08612254fc"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PessoasModule-280ccd70e0151fdaa93aab08612254fc"' :
                                            'id="xs-components-links-module-PessoasModule-280ccd70e0151fdaa93aab08612254fc"' }>
                                            <li class="link">
                                                <a href="components/PessoaCadastroComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PessoaCadastroComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PessoaCadastroContatoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PessoaCadastroContatoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PessoasPesquisaComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PessoasPesquisaComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PessoasRoutingModule.html" data-type="entity-link">PessoasRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/RelatoriosModule.html" data-type="entity-link">RelatoriosModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-RelatoriosModule-5c9a6c0403fa524470b6113cea6f0517"' : 'data-target="#xs-components-links-module-RelatoriosModule-5c9a6c0403fa524470b6113cea6f0517"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RelatoriosModule-5c9a6c0403fa524470b6113cea6f0517"' :
                                            'id="xs-components-links-module-RelatoriosModule-5c9a6c0403fa524470b6113cea6f0517"' }>
                                            <li class="link">
                                                <a href="components/RelatorioLancamentosComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RelatorioLancamentosComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RelatoriosRoutingModule.html" data-type="entity-link">RelatoriosRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SegurancaModule.html" data-type="entity-link">SegurancaModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SegurancaModule-ebb88ed86c023d6fb931768b0b2f4e5b"' : 'data-target="#xs-components-links-module-SegurancaModule-ebb88ed86c023d6fb931768b0b2f4e5b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SegurancaModule-ebb88ed86c023d6fb931768b0b2f4e5b"' :
                                            'id="xs-components-links-module-SegurancaModule-ebb88ed86c023d6fb931768b0b2f4e5b"' }>
                                            <li class="link">
                                                <a href="components/LoginFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginFormComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-SegurancaModule-ebb88ed86c023d6fb931768b0b2f4e5b"' : 'data-target="#xs-injectables-links-module-SegurancaModule-ebb88ed86c023d6fb931768b0b2f4e5b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SegurancaModule-ebb88ed86c023d6fb931768b0b2f4e5b"' :
                                        'id="xs-injectables-links-module-SegurancaModule-ebb88ed86c023d6fb931768b0b2f4e5b"' }>
                                        <li class="link">
                                            <a href="injectables/LogoutService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>LogoutService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SegurancaRoutingModule.html" data-type="entity-link">SegurancaRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link">SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SharedModule-64d32740bcb4ccf438030d3d207d560f"' : 'data-target="#xs-components-links-module-SharedModule-64d32740bcb4ccf438030d3d207d560f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-64d32740bcb4ccf438030d3d207d560f"' :
                                            'id="xs-components-links-module-SharedModule-64d32740bcb4ccf438030d3d207d560f"' }>
                                            <li class="link">
                                                <a href="components/MessageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MessageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AppPage.html" data-type="entity-link">AppPage</a>
                            </li>
                            <li class="link">
                                <a href="classes/Categoria.html" data-type="entity-link">Categoria</a>
                            </li>
                            <li class="link">
                                <a href="classes/Cidade.html" data-type="entity-link">Cidade</a>
                            </li>
                            <li class="link">
                                <a href="classes/Contato.html" data-type="entity-link">Contato</a>
                            </li>
                            <li class="link">
                                <a href="classes/Endereco.html" data-type="entity-link">Endereco</a>
                            </li>
                            <li class="link">
                                <a href="classes/Estado.html" data-type="entity-link">Estado</a>
                            </li>
                            <li class="link">
                                <a href="classes/Lancamento.html" data-type="entity-link">Lancamento</a>
                            </li>
                            <li class="link">
                                <a href="classes/LancamentoFiltro.html" data-type="entity-link">LancamentoFiltro</a>
                            </li>
                            <li class="link">
                                <a href="classes/NotAuthenticatedError.html" data-type="entity-link">NotAuthenticatedError</a>
                            </li>
                            <li class="link">
                                <a href="classes/Pessoa.html" data-type="entity-link">Pessoa</a>
                            </li>
                            <li class="link">
                                <a href="classes/PessoaFiltro.html" data-type="entity-link">PessoaFiltro</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link">AuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});