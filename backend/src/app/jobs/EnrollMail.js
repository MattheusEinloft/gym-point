import { format, parseISO } from 'date-fns';
import Mail from '../../lib/Mail';

class EnrollMail {
  get key() {
    return 'EnrollMail';
  }

  async handle({ data }) {
    const { student, plan, end_date, price } = data;

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Matrícula realizada',
      template: 'enroll',
      context: {
        student: student.name,
        plan: plan.title,
        end_date: format(parseISO(end_date), "dd'/'MM'/'yyyy"),
        price: `R$${price}`
      }
    });
  }
}

export default new EnrollMail();
