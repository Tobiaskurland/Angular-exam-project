import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../category.service';
import { ProductService } from '../../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PriceValidators } from './price.validators';
import { NgRedux, select } from 'ng2-redux';
import { IAppState } from '../../store';
import { INCREMENT } from '../../actions';
import { Map } from 'immutable';



@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  //REDUX VERSION 2
  //@select(s => s.get('counter')) count;

  @select('counter') count;
 
  categories$;
  product = {};
  id;

  form = new FormGroup({
    title: new FormControl('', Validators.required),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    category: new FormControl('', Validators.required),
    imageUrl: new FormControl('', [Validators.required, PriceValidators.cannotContainSpace])
  });

  constructor(
    // REDUX VERSION 2
    //private ngRedux: NgRedux<Map<string, any>>,
    private ngRedux: NgRedux<IAppState>,
    private route: ActivatedRoute,
    private categoryService: CategoryService, 
    private productService: ProductService, 
    private router: Router) {
    this.categories$ = categoryService.getAll();
    

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.productService.get(this.id).take(1).subscribe(p => this.product = p);

    
   }

   save(){
    if (this.id) this.productService.update(this.id, this.form.value);
    else this.productService.create(this.form.value);

     this.router.navigate(['/admin/products']);
   }

   delete(){
     if (!confirm('Are you sure you want to delete this product?')) return;
     
       this.productService.delete(this.id);
       this.router.navigate(['/admin/products']);
     
   }

   increment(){
     this.ngRedux.dispatch({ type: INCREMENT });
   }

  ngOnInit() {
  }

}
