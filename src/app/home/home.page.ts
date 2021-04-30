import { Component } from '@angular/core';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  products = [];
  export = null;
  newProduct = 'My cool product';

  constructor(private databaseService: DatabaseService) {
    this.loadProducts();
  }

  loadProducts() {
    this.databaseService.getProductList().subscribe(res => {
      this.products = res.values;
      console.log(res.values);
    });
  }

  // Mode is either "partial" or "full"
  async createExport(mode) {
    const dataExport = await this.databaseService.getDatabaseExport(mode);
    this.export = dataExport.export;
  }

  async addProduct() {
    await this.databaseService.addDummyProduct(this.newProduct);
    this.newProduct = '';
    this.loadProducts();
  }

  async deleteProduct(product) {
    await this.databaseService.deleteProduct(product.id);
    this.products = this.products.filter(p => p !== product);
  }

  // For testing..
  deleteDatabase() {
    this.databaseService.deleteDatabase();
  }
}
