import { Observable, ObservableLike } from "rxjs";
import Menu from "../classes/menu.class";
import { SaveMenu, UpdateMenu } from "../dto/menu.dto";

export default interface MenuRepository {


    save(body: SaveMenu): Observable<string>;
    delete(id: string): Observable<string>;
    update(id: string, body: UpdateMenu): Observable<string>;
    getById(id: string): Observable<Menu | undefined>;
    getAll(restaurantId: string): Observable<Menu[]>
}