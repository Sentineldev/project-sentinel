import { Component, computed, Inject, input, signal } from "@angular/core";
import Menu from "../../../classes/menu.class";
import DialogToggler from "../../../../../shared/dialog/dialog-toggler";
import CustomDialog from "../../../../../shared/dialog/custom-dialog";
import { ErrorAlert } from "../../../../../shared/alerts/error-alert";
import { Loader } from "../../../../../shared/loader/loader";
import MenuRepository from "../../../interfaces/menu-repository.interface";
import ApiMenuRepository from "../../../repositories/menu-api.repository";

@Component({
    selector: `app-delete-menu-modal`,
    template: `
    <app-custom-dialog [dialogId]="dialogId()">
        <div class="bg-white shadow p-4 rounded-xl m-auto w-full lg:w-[400px] flex flex-col gap-4">
            <div>
                <h1 class="text-slate-700 text-[1.1rem] text-center font-sans">Eliminar Menu</h1>
            </div>
            @if (errorMessage().length > 0) {
                <app-error-alert [message]="errorMessage()"/>
            }
            <fieldset class="border p-2 font-sans text-slate-700 rounded-lg border-slate-300">
                <legend>Menu</legend>
                <div class="flex flex-col">
                    <p class="">{{menu().name}}</p>
                    <p class="text-slate-500 text-sm">{{menu().isActive ? "Activo" : "Inactivo"}}</p>
                </div>
            </fieldset>
            <div>
                <button (click)="onClickHandler()" type="button" [disabled]="loading()" class="bg-red-500 p-3 w-full rounded-lg text-white font-sans">
                    @if (loading()) {
                        <app-loader/>
                    } @else {
                        Remover
                    }
                </button>
            </div>
        </div>
    </app-custom-dialog>
    <app-dialog-toggler [dialogId]="dialogId()">
        <div class="hover:opacity-60 transition-all flex items-center gap-2">
            <img src="./svg/trash-svgrepo-com-red.svg" alt="trash icon" width="28" height="28">
            <p class="text-red-500 font-sans text-lg">Eliminar Menu</p>
        </div>
    </app-dialog-toggler>
    
    `,
    imports: [DialogToggler, CustomDialog, ErrorAlert, Loader],
})
export default class DeleteMenuModal {



    public loading = signal(false);
    public errorMessage = signal("");
    public menu = input.required<Menu>();

    public dialogId = computed(() => `delete-menu-modal-${this.menu().id}`);

    constructor(
        @Inject(ApiMenuRepository)
        private readonly repository: MenuRepository
    ) {}

    onClickHandler() {}
}