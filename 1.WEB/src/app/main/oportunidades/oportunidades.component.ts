import { Component, OnInit } from '@angular/core';
import axios from 'axios';
var cors = require('cors');
import { Oportunidade } from './oportunidade.model';

@Component({
  selector: 'app-oportunidades',
  templateUrl: './oportunidades.component.html',
  styleUrls: ['./oportunidades.component.css']
})
export class OportunidadesComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    axios.get('http://localhost:3001/api/oportunidade/get', {
      headers:{
        'authorization': 'aaa',
      }
    })
    .then(async (response) => {
      const oportunidades = response.data.list;
      
      const a = await this.pegarEmpresa(response.data.list.array);
      this.pegarEmpresa(oportunidades.id_empresa);

      oportunidades.map(item => item.empresa = a);
      return oportunidades;
    })
    .catch((error) => {
      console.log(error);
    });
  }
  
  pegarEmpresa(idEmpresa){
    axios.get('http://localhost:3001/api/empresa/get' + idEmpresa, {
      headers:{
        'authorization': 'aaa',
      }
    })
    .then(async (response) => {
      const oportunidades = response.data.list;
      oportunidades.map(item => item.empresa = a);
      return oportunidades;
    })
    .catch((error) => {
      console.log(error);
    });
  }
}
