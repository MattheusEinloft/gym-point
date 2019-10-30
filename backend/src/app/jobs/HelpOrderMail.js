import Mail from '../../lib/Mail';

class HelpOrderMail {
  get key() {
    return 'HelpOrderMail';
  }

  async handle({ data }) {
    const { student, question, answer } = data;

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Pedido de auxílio respondido',
      template: 'help-order',
      context: {
        student_name: student.name,
        question,
        answer
      }
    });
  }
}

export default new HelpOrderMail();
