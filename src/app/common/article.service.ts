import { Injectable } from '@angular/core';
import { Article } from './article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  articles: Article[] = this.getFromLocalStorage("articles");
  deletedArticles: Article[] = this.getFromLocalStorage("deleted-articles");

  constructor() { }

  create(article: Article) {
    this.articles.push(article);
    localStorage.setItem('articles', JSON.stringify(this.articles)); // on passe de JS en String pour le stocker dans le LocalStorage
  }

  delete(article: Article) {
    const index = this.articles.findIndex((x) => x.id === article.id);
    this.articles.splice(index, 1);
    this.deletedArticles.push(article);
    localStorage.setItem('articles', JSON.stringify(this.articles));  // on passe de JS en String pour le stocker dans le LocalStorage
    localStorage.setItem('deleted-articles', JSON.stringify(this.deletedArticles));
  }

  deleteFromDeletedArticles(article: Article) {
    const index = this.deletedArticles.findIndex((x) => x.id === article.id);
    this.deletedArticles.splice(index, 1);
    localStorage.setItem('deleted-articles', JSON.stringify(this.deletedArticles));
  }

  restore(article: Article) {
    this.create(article);
    this.deleteFromDeletedArticles(article);
  }

  getFromLocalStorage(item: string): Article[] {
    const stringData = localStorage.getItem(item);
    const articles: Article[] = JSON.parse(stringData || '[]'); 
    return articles;
  }
}
