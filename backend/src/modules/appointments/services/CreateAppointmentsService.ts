import { startOfHour } from "date-fns";
import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppErrors";
import Appointments from "../infra/typeorm/entities/Appointments";
import AppointmentsRepository from "../infra/typeorm/repositories/AppointmentsRepository";

interface Request {
  date: Date,
  provider_id: string
}


class CreateAppointmentsService {
  public async execute({ date, provider_id }: Request): Promise<Appointments> {

    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentsDate = startOfHour(date);
    const findAppointmentsInSameDate = await appointmentsRepository.findByDate(appointmentsDate);

    if (findAppointmentsInSameDate) {
      throw new AppError('This appointment is already booked')
    }

    const appointment = await appointmentsRepository.create({
      provider_id,
      date: appointmentsDate,
    });


    return appointment;

  }
}

export default CreateAppointmentsService;
