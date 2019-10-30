import * as Yup from 'yup';

import Student from '../models/Student';
import HelpOrder from '../models/HelpOrder';

import HelpOrderMail from '../jobs/HelpOrderMail';
import Queue from '../../lib/Queue';

class HelpOrderController {
  async index(req, res) {
    const helpOrders = await HelpOrder.findAll({
      where: { answer: null }
    });

    return res.json(helpOrders);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { answer } = req.body;
    const helpOrderId = req.params.id;

    const helpOrder = await HelpOrder.findByPk(helpOrderId);

    if (!helpOrder) {
      return res.status(400).json({ error: 'Help Order does not exists' });
    }

    if (helpOrder.answer) {
      return res.status(401).json({ error: 'Help Order already answered' });
    }

    await helpOrder.update({
      answer,
      answer_at: new Date()
    });

    const student = await Student.findByPk(helpOrder.student_id);
    const { question } = helpOrder;

    // Send email to student
    await Queue.add(HelpOrderMail.key, {
      student,
      question,
      answer
    });

    return res.json(helpOrder);
  }
}

export default new HelpOrderController();
