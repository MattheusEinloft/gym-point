import * as Yup from 'yup';

import Student from '../models/Student';
import HelpOrder from '../models/HelpOrder';

class HelpRequestController {
  async index(req, res) {
    const student_id = req.params.id;

    if (!(await Student.findByPk(student_id))) {
      return res.status(400).json({ error: 'Student does not exists' });
    }

    const helpOrders = await HelpOrder.findAll({
      where: { student_id },
      attributes: ['id', 'question', 'answer', 'answer_at'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name']
        }
      ]
    });

    return res.json(helpOrders);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const student_id = req.params.id;

    if (!(await Student.findByPk(student_id))) {
      return res.status(400).json({ error: 'Student does not exists' });
    }

    const { question } = req.body;

    const checkQuestionExists = await HelpOrder.findOne({
      where: { student_id, question }
    });

    if (checkQuestionExists) {
      return res
        .status(400)
        .json({ error: 'This question has already been asked' });
    }

    const helpOrder = await HelpOrder.create({
      student_id,
      question
    });

    return res.json(helpOrder);
  }
}

export default new HelpRequestController();
