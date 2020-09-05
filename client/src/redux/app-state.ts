import { VacationsTableModel } from "../models/vacation-model";

export class AppState {
    
    public vacations: VacationsTableModel[];

    public constructor() {
        this.vacations = [];
    }
}