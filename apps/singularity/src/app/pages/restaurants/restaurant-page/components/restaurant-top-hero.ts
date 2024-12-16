import { Component, input } from "@angular/core";
import Restaurant from "../../classes/restaurant.class";

@Component({
    selector: "app-restaurant-top-hero",
    styles: `
    .gradient-selector {
        background: rgb(2,0,36);
        background: linear-gradient(33deg, rgba(2,0,36,1) 11%, rgba(0,0,0,0.01) 100%); 
    }
    
    `,
    template: `
        <div class="flex flex-col bg-transparent rounded-xl w-full">
            <div class="relative w-full h-full min-h-[220px]">
                <img src="/placeholder-menu.jpg" class="rounded-xl h-[220px] w-full">
                <div class="absolute gradient-selector w-full top-0 h-full rounded-xl flex flex-col p-6">
                    <div class="flex-1">
                        <img src="/store-svgrepo-com-white.svg" width="42" height="42" alt="store icon">
                    </div>
                    <div class="">
                        <h1 class="text-white text-[1.6rem] font-sans font-bold"> {{restaurant().name}} </h1>
                        <p class="text-slate-200 font-sans text-[1rem]">Establecimiento</p>
                    </div>
                </div>
            </div>
        </div>
    `
})
export default class RestaurantTopHero {



    public restaurant = input.required<Restaurant>()
}