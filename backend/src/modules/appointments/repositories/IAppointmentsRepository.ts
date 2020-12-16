import ICreateAppointmentsDTO from "../dtos/ICreateAppointmentsDTO";
import Appointments from "../infra/typeorm/entities/Appointments";

export default interface IAppointmentsRepository {
    create(data: ICreateAppointmentsDTO): Promise<Appointments>;
    findByDate(date: Date): Promise<Appointments | undefined>;
}