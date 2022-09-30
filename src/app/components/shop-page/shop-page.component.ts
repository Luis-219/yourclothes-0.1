import { User } from './../../models/User';
import { UsersService } from './../../services/users.service';
import { Product } from './../../models/Product';
import { ProductsService } from './../../services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Shop } from 'src/app/models/Shop';


@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.css']
})
export class ShopPageComponent implements OnInit {

  shopname!:string;
  id!:number;
  constructor(private activatedRouter:ActivatedRoute, 
              private http: HttpClient,
              private snackBar:MatSnackBar,
              private productService:ProductsService,
              private router:Router,
              private userService: UsersService,
              ) { }

  ngOnInit(): void {
    this.shopname= this.activatedRouter.snapshot.params["name"];
    this.id= this.activatedRouter.snapshot.params["id"];
    this.loadShop();
    this.getOwner();
    this.getProducts();
    this.userVerification();
  }

  shopfound!:Shop;
  loadShop()
  {
    this.http.get<any>("http://localhost:3000/shops").subscribe(
      res=>{
        const shop = res.find((a:Shop)=>{
          return a.name == this.shopname;
        });
        if(shop)
        {
          this.shopfound = shop;
        }
    });
  }

  userVerification():boolean
  {
    if(this.shopfound.idUser != this.id)
    {
      return false;
    }
    else return true;
  }


  userfound!: User;
  getOwner(){
    this.userService.getUserId(this.id).subscribe(
      {
        next: (data:User) =>{
          this.userfound = data;
          console.log("mañana");
        },
        error: (err) =>{
          this.router.navigate([""]);
          console.log(err);
        }
      }
    );
  }
  Allproducts:Product[] = [];
  products:Product[] = [];
  getProducts()
  {
    console.log("mañana")
    this.productService.getProducts().subscribe(
      (data:Product[]) => {
        data.forEach( product => {
          if(product.idShop == this.shopfound.id){
            this.products.push(product);
          }
        })
      }
    );
  }

  deleteProduct(id:number)
  {
    this.productService.deleteProduct(id).subscribe(
      next=>{
        console.log("se eliminó");
        this.router.navigate(["/shop-page/", this.shopfound.name, this.userfound.id]);
      }
    );
  }
}
