import { Component, EventEmitter, input, Output } from '@angular/core';
import Product from '../../classes/product.class';
import DeleteProductModal from "../modals/delete-modal/delete-product-modal";
import UpdateProductModal from "../modals/update-modal/update-product-modal";
scrollbars
@Component({
  selector: 'app-product-display',
  imports: [DeleteProductModal, UpdateProductModal],
  template: `
    <div class="grid grid-cols-3 p-3 items-center justify-center">
        <div>
            <p class="font-sans text-slate-700 text-[1rem] text-wrap break-words">{{ product().name }}</p>
        </div>
        <div>
            <p class="font-sans text-slate-700 text-[1rem] text-wrap break-words">{{ product().description }}</p>
        </div>
        <div class="flex items-center gap-2">
            <app-delete-product-modal (onUpdate)="onUpdateHandler()" [product]="product()"/>
            <app-update-product-modal (onUpdate)="onUpdateHandler()" [product]="product()"/>
        </div>
    </div>
  `
})
export default class ProductDisplay {


    @Output() onUpdate = new EventEmitter();

    public product = input<Product>({
        description: "",
        id: "",
        name: ''
    });



    onUpdateHandler() {
        this.onUpdate.emit();
    }
}