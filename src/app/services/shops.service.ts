import { Shop } from './../models/Shop';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShopsService {

  constructor(private http:HttpClient) { }

  addShopUser(shop:Shop)
  {
    return this.http.post<Shop>("http://localhost:3000/shops", shop);
  }
  getShops()
  {
    return this.http.get<Shop[]>("http://localhost:3000/shops");
  }
  getShopId(id:number){
    return this.http.get<Shop>("http://localhost:3000/shops/"+id.toString());
  }
  editShop(shop:Shop)
  {
    return this.http.put<Shop>("http://localhost:3000/shops/"+shop.id.toString(), shop);
  }
  deleteShop(id:number)
  {
    return this.http.delete("http://localhost:3000/shops/"+id.toString());
  }
}
