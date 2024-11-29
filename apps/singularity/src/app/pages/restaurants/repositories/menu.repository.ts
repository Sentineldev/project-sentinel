import { Inject, Injectable } from "@angular/core";
import MenuRepository from "../interfaces/menu-repository.interface";
import { map, Observable, of, switchMap, tap } from "rxjs";
import Menu from "../classes/menu.class";
import { SaveMenu } from "../dto/menu.dto";
import RestaurantRepository from "../interfaces/restaurant-repository.interface";
import LocalRestaurantRepository from "./restaurant.repository";
import { MENU_CATEGORIES } from "./menu-category.repository";



export let MENU_ARRAY: Menu[] = [];

@Injectable({
    providedIn: "root"
})
export default class LocalMenuRepository implements MenuRepository {

    constructor(
        @Inject(LocalRestaurantRepository)
        private readonly restaurantRepository: RestaurantRepository,
    ) {
        MENU_ARRAY = [];
    }
    save({ name, restaurantId }: SaveMenu): Observable<string> {

        const id = new Date().getTime().toString();

        return this.restaurantRepository.getById(restaurantId).pipe(
            switchMap(restaurant => {
                if (restaurant) {
                    const newMenu = new Menu({id, name, restaurant, categories: [] });
                    return this.getById(newMenu.id).pipe(
                        switchMap(result => {
                            if (result) {
                                return "Not created";
                            }
                            MENU_ARRAY.push(newMenu);
                            return "Created";
                        })
                    )
                }
                return "Not created";
            })
        )
    }
    delete(id: string): Observable<string> {

        const result = MENU_ARRAY.filter((val) => val.id !== id);
        return of(result).pipe(
            map(() => "Deleted")
        );
    }
    update(id: string, body: SaveMenu): Observable<string> {

        const index = MENU_ARRAY.findIndex((val) => val.id === id);

        return of(index).pipe(
            switchMap((result) => {

                if (result === -1) {
                    return  "Not updated"; 
                }

                return of(result).pipe(
                    tap((result) => { MENU_ARRAY[result].name = body.name }),
                    map(() => "Updated")
                );
            })
        )
    }
    getById(id: string): Observable<Menu | undefined> {
        const result = MENU_ARRAY.find((val) => val.id === id);
        return of(result).pipe(
            map((result) => {
                if (result) {
                    result.categories = MENU_CATEGORIES.filter((val) => val.menu.id === result.id);
                    return result;
                }
                return undefined;
            })
        );
    }
    getAll(restaurantId: string): Observable<Menu[]> {


        const mappedArray = MENU_ARRAY.filter((val) => val.restaurant.id === restaurantId).map((menu) => {
            menu.categories = MENU_CATEGORIES.filter((val) => val.menu.id === menu.id);

            return menu;
        });

        return of(mappedArray);
    }
}