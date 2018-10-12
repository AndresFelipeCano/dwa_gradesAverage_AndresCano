import { Component, OnInit } from '@angular/core';

//service
import {ProductService} from '../../../services/product.service';
import { NgForm } from '@angular/forms';
import { Product } from '../../../models/product';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(
    public productService: ProductService,
    public toastrService: ToastrService
    ) { }

  ngOnInit() {
    this.productService.getProducts();
    this.resetForm();
  }
  resetForm(productForm?: NgForm){
    if(productForm != null){
      productForm.reset();
      this.productService.selectedProduct = new Product();

    }
  }
  onSubmit(productForm: NgForm){
    if(productForm.value.$key == null){ //create new product
      this.productService.insertProduct(productForm.value);
      this.toastrService.success('Successfull Operation', 'Product created!');
    }
    else{
      this.productService.updateProduct(productForm.value);
      this.toastrService.success('Successfull Operation', 'Product altered!');
    }
    
    this.resetForm(productForm);
  }
  
}
