import { Injectable } from '@angular/core';
import { Article } from './article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  articles: Article[] = this.getFromLocalStorage(); // []
  
  constructor() { }

  create(article: Article) {
    this.articles.push(article);
    localStorage.setItem('articles', JSON.stringify(this.articles)); // on passe de JS en String pour le stocker dans le LocalStorage
  }

  delete(article: Article) {
    const index = this.articles.findIndex((x) => x.id === article.id);
    this.articles.splice(index, 1);
    localStorage.setItem('articles', JSON.stringify(this.articles));  // on passe de JS en String pour le stocker dans le LocalStorage
  }

  getFromLocalStorage(): Article[] {
    const stringData = localStorage.getItem('articles');
    // On ramène les données stockées dans le LocalStorage de String à JS
    // || signifie "ou" en JS, si stringData est null ou undefined, on renvoie un tableau vide
    const articles: Article[] = JSON.parse(stringData || '[]'); 

    return articles;
  }
  
}
