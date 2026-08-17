import { Component, signal, computed, effect, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'; //material
import { ProdutosService } from '../../../core/services/produtos.service';
import { CarrinhoService } from '../../../core/services/carrinho.service';
import { Produto } from '../produto/produto';

@Component({
  selector: 'app-lista-produtos',
  imports: [Produto, MatButtonModule], //material
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {

    carrinho = signal<any[]>([]); 
    
  constructor() {
    // carrega da API
    this.carregarProdutos();

    // effects continuam iguais
    effect(() => {
      console.log('Lista de produtos alterada:', this.produtos());
    });
    effect(() => {
      console.log('Valor total atualizado:', this.valorTotal());
    });
    effect(() => {
      if (typeof document !== 'undefined') {
        document.title = `(${this.totalProdutos()}) Minha Loja`;
      }
    });
  }
   //colocar na cafeteria td relacionado ao carrinho
  private produtosService = inject(ProdutosService);
  carrinhoService = inject(CarrinhoService);
  quantidadeCarrinho = this.carrinhoService.quantidade;
  totalCarrinho = this.carrinhoService.total;

  // SIGNALS

  erro = signal<string | null>(null);

  carregando = signal(true);

  produtos = signal<{ nome: string; preco: number }[]>([]);

  produtoSelecionado = signal<string | null>(null);

  // COMPUTED

  totalProdutos = computed(() => this.produtos().length);

  valorTotal = computed(() => {
    return this.produtos().reduce((total, item) => total + item.preco, 0);
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

  adicionarAoCarrinho(produto: { nome: string; preco: number }) {
    this.carrinhoService.adicionar(produto);
  }

  carregarProdutos() {
    this.erro.set(null); // limpa erro anterior
    this.carregando.set(true); // ativa loading
    this.produtosService.buscarProdutos().subscribe({
      next: (dados) => {
        const produtos = this.produtosService.transformarProdutos(dados);
        this.produtos.set(produtos);
        this.carregando.set(false);
      },
      error: (erro) => {
        console.error('Erro ao carregar produtos:', erro);
        this.erro.set('Erro ao carregar produtos. Verifique sua conexão e tente novamente.');
        this.carregando.set(false);
      },
    });
  }
}