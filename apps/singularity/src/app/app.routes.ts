import { Routes } from '@angular/router';
import LoginPage from './pages/login/login-page';
import IndexPage from './pages/index/index-page';
import ProductsPage from './pages/products/products-page';
import RestaurantsPage from './pages/restaurants/restaurants-page';
import RestaurantPage from './pages/restaurants/restaurant-page/restaurant-page';
import MenusPage from './pages/restaurants/restaurant-page/menus-page/menus-page';
import MenuPage from './pages/restaurants/restaurant-page/menu-page/menu-page';
import CategoriesPage from './pages/restaurants/restaurant-page/menu-page/categories-page/categories-page';
import MenuCategoryPage from './pages/restaurants/restaurant-page/menu-page/menu-category-page/menu-category.page';
import RestaurantConfigPage from './pages/restaurants/restaurant-page/config-page/config-page';
import MenuConfigPage from './pages/restaurants/restaurant-page/menu-page/config-page/config-page';

export const routes: Routes = [
    { path: "", component: LoginPage, children: [] },
    {
        path: "admin",
        component: IndexPage,
        children: [
            {
                path: "products",
                component: ProductsPage
            },
            {
                path: "restaurants",
                component: RestaurantsPage,
            },
            {
                path: "restaurant/:restaurantId",
                component: RestaurantPage,
                children: [
                    // {
                    //     path: "",
                    //     component: RestaurantHomePage
                    // },
                    {
                        path: "",
                        component: MenusPage,
                        
                    },
                    {
                        path: "config",
                        component: RestaurantConfigPage,
                        
                    },
                    {
                        path: "menu/:menuId",
                        component: MenuPage,
                        children: [
                            {
                                path: "",
                                component: CategoriesPage
                            },
                            {
                                path: "config",
                                component: MenuConfigPage
                            },
                            {
                                path: "category/:categoryId",
                                component: MenuCategoryPage
                            }
                        ]
                    },
                    // {
                    //     path: "menu-category/:categoryId/products",
                    //     component: MenuCategoryPage,
                    // },
                ]
            }
        ],
    }
];
