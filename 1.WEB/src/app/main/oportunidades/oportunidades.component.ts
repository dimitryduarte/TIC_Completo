import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Oportunidade } from './oportunidade.model';

@Component({
  selector: 'app-oportunidades',
  templateUrl: './oportunidades.component.html',
  styleUrls: ['./oportunidades.component.css']
})
export class OportunidadesComponent implements OnInit {

 // oportunidades : any
 oportunidades = [
   new Oportunidade('SMN','09/10/2018','Estágio Sup.','Diurno - 6hrs','Tecnologia','Não Candidatado'),
   new Oportunidade('SMN','09/10/2018','Estágio Sup.','Diurno - 6hrs','Tecnologia','Não Candidatado'),
   new Oportunidade('Irroba','11/11/2018','Estágio','Diurno - 6hrs','Tecnologia','Não Candidatado'),
   new Oportunidade('Irroba','11/11/2018','Estágio','Diurno - 6hrs','Tecnologia','Não Candidatado'),
   new Oportunidade('Audtax','15/12/2018','Estágio','Diurno - 6hrs','Tecnologia','Não Candidatado'),
   new Oportunidade('Audtax','15/12/2018','Estágio','Diurno - 6hrs','Tecnologia','Candidatado')
 ]

 /*public empresa: String,
                public dtafim: String,
                public tipo: String,
                public periodo: String,
                public area: string,
                public status: string*/

  /*constructor(private http:HttpClient,
              private router: Router) { }*/
  constructor() { }

  ngOnInit() {
  /*  this.http.get('http://localhost:3000/estagio').subscribe(dados => {
      this.oportunidades = dados;
    })*/
  }
  
   

}
