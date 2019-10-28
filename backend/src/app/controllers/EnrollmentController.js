import * as Yup from 'yup';
import { addMonths, parseISO } from 'date-fns';

import Student from '../models/Student';
import Plan from '../models/Plan';
import Enrollment from '../models/Enrollment';

import EnrollMail from '../jobs/EnrollMail';
import Queue from '../../lib/Queue';

class EnrollmentController {
  async index(req, res) {
    const enrollments = await Enrollment.findAll({
      attributes: ['id', 'start_date', 'end_date', 'price'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email']
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title']
        }
      ]
    });

    return res.json(enrollments);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { student_id, plan_id, start_date } = req.body;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res
        .status(400)
        .json({ error: 'Student with given ID does not exists' });
    }

    const enrollmentExists = await Enrollment.findOne({
      where: { student_id }
    });

    if (enrollmentExists) {
      return res
        .status(400)
        .json({ error: 'Student already has an enrollment' });
    }

    const plan = await Plan.findByPk(plan_id);

    const end_date = addMonths(parseISO(start_date), plan.duration);

    const price = plan.duration * plan.price;

    const enrollment = await Enrollment.create({
      student_id,
      plan_id,
      start_date,
      end_date,
      price
    });

    // Send email to student
    await Queue.add(EnrollMail.key, {
      student,
      plan,
      end_date,
      price
    });

    return res.json(enrollment);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      plan_id: Yup.number().required(),
      start_date: Yup.date().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const enrollment = await Enrollment.findByPk(req.params.id);

    if (!enrollment) {
      return res
        .status(400)
        .json({ error: 'A enrollment with the given ID does not exists' });
    }

    const { plan_id, start_date } = req.body;

    const plan = await Plan.findByPk(plan_id);

    const end_date = addMonths(parseISO(start_date), plan.duration);

    const price = plan.duration * plan.price;

    await enrollment.update({
      plan_id,
      start_date,
      end_date,
      price
    });

    return res.json(enrollment);
  }

  async delete(req, res) {
    const enrollment = await Enrollment.findByPk(req.params.id);

    if (!enrollment) {
      return res
        .status(400)
        .json({ error: 'A enrollment with the given ID does not exists' });
    }

    enrollment.destroy();

    return res.json(enrollment);
  }
}

export default new EnrollmentController();
