import { computed, Inject, Injectable, signal, Signal, WritableSignal } from "@angular/core";
import Restaurant from "../../classes/restaurant.class";
import Menu from "../../classes/menu.class";
import MenuCategory from "../../classes/menu-category.class";
import RestaurantService from "../../restaurant.service";
import RestaurantPageService from "../restaurant-page.service";
import MenuPageService from "../menu-page/menu-page.service";
import MenuRepository from "../../interfaces/menu-repository.interface";
import LocalMenuRepository from "../../repositories/menu.repository";
import LocalMenuCategoryRepository from "../../repositories/menu-category.repository";
import MenuCategoryRepository from "../../interfaces/menu-category-repository.interface";
import { combineLatest, map, merge, take } from "rxjs";

type ServiceState = {
    restaurant: Restaurant;
    menu: Menu;
    category: MenuCategory;
    loading: boolean;
    errorMessage: string;
};

type ServiceLoadingState = {
    loading: boolean;
    error: string;
};

@Injectable({
    providedIn: 'root'
})
export default class MenuCategoryPageService {

    private state: Signal<ServiceState>;
    private loadingState: WritableSignal<ServiceLoadingState>;

    private menuSignal: WritableSignal<Menu>;
    private categorySignal: WritableSignal<MenuCategory>;
    constructor(
        @Inject(LocalMenuRepository)
        private readonly menuRepository: MenuRepository,
        @Inject(LocalMenuCategoryRepository)
        private readonly MenuCategoryRepository: MenuCategoryRepository,
        private readonly restaurantPageService: RestaurantPageService,
    ) {

        const aux = this.restaurantPageService.getState();
        const menu = new Menu({
            categories: [],
            id: "",
            name: "",
            restaurant: aux.restaurant
        });
        const category = new MenuCategory({
            id: "",
            name: "",
            menu,
        });

        this.loadingState = signal<ServiceLoadingState>({
            error: "",
            loading: false,
        })

        this.menuSignal = signal<Menu>(menu);
        this.categorySignal = signal<MenuCategory>(category);
        this.state = computed(() => {
            const restaurant = this.restaurantPageService.getRestaurant();
            const menu = this.menuSignal();
            const category = this.categorySignal();
            return {
                restaurant,
                menu,
                category,
                loading: this.loadingState().loading,
                errorMessage: this.loadingState().error
            }
        });
    }


    getState() {
        return this.state();
    }

    getById(menuId: string, categoryId: string) {

        this.loadingState.update((current) => ({...current, loading: true }));

        const menuObservable = this.menuRepository.getById(menuId);
        const categoryObservable = this.MenuCategoryRepository.getById(categoryId);

        combineLatest([menuObservable, categoryObservable]).subscribe((([menu, category]) => {
            this.loadingState.update((current) => ({...current, loading: false }));
            if (!menu || !category) {
                this.loadingState.update((current) => ({ ...current, error: "Data failed to fetch"}));
            }
            if (menu && category) {
                this.menuSignal.set(menu);
                this.categorySignal.set(category);
            }
        }))
    }


}