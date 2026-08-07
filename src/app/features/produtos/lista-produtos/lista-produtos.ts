import { Component, signal, computed, effect} from '@angular/core';
import { Produto } from '../produto/produto';

@Component({
  selector: 'app-lista-produtos',
  imports: [Produto],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {
  produtos = signal([
    { nome: 'Notebook', preco: 3800 },
    { nome: 'Mouse', preco: 179 },
    { nome: 'Fone de ouvido', preco: 80 },
  ]);
  //
  totalProdutos = computed(() => this.produtos().length);

  valorTotal = computed(() => {
    return this.produtos().reduce((total, item) => total + item.preco, 0);
  });

  quantidadeCarrinho = computed(() => this.carrinho().length);
  
  totalCarrinho = computed(() => {
    return this.carrinho().reduce((total, item) => total + item.preco, 0);
  });
  




  exibirProduto(nome: string) {
    this.produtoSelecionado.set(nome);
  }
  adicionarProduto() {
    this.produtos.update((listaAtual) => [...listaAtual, { nome: 'Teclado', preco: 250 }]);
  }
  substituirProdutos() {
    this.produtos.set([{ nome: 'Produto novo', preco: 999 }]);
  }
// parte do carrinho de compras
  carrinho = signal<{ nome: string; preco: number }[]>([]);

  adicionarAoCarrinho(produto: { nome: string; preco: number }) {
    this.carrinho.update((listaAtual) => [...listaAtual, produto]);
  }


  constructor() {
    effect(() => {
      console.log('Lista de produtos alterada:', this.produtos());
  
  });
  effect(() => {
      if (typeof document !== 'undefined') {
        document.title = `(${this.totalProdutos()}) Minha Loja`;
      }
     
    });

  }
produtoSelecionado = signal<string | null>(null);

}
