import { subDays } from 'date-fns';
import { Op } from 'sequelize';
import Student from '../models/Student';
import Checkin from '../models/Checkin';

class CheckinController {
  async index(req, res) {
    const studentId = req.params.id;

    const student = await Student.findByPk(studentId);

    if (!student) {
      return res.status(400).json({ error: 'Student does not exists' });
    }

    const checkins = await Checkin.findAll({
      where: { student_id: studentId },
      attributes: ['id', 'createdAt'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name']
        }
      ]
    });

    return res.json(checkins);
  }

  async store(req, res) {
    const studentId = req.params.id;

    if (!(await Student.findByPk(studentId))) {
      return res.status(400).json({ error: 'Student does not exists' });
    }

    const checkins = await Checkin.findAndCountAll({
      where: {
        student_id: studentId,
        created_at: {
          [Op.between]: [subDays(new Date(), 7), new Date()]
        }
      }
    });

    if (checkins.count >= 5) {
      return res.status(401).json({ error: 'Limit of checkins reached' });
    }

    const checkin = await Checkin.create({
      student_id: studentId
    });

    return res.json(checkin);
  }
}

export default new CheckinController();
