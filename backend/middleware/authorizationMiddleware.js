const Project = require('../models/projectModel');

const isProjectOwner = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    if (project.ownerId.toString() !== req.session.userId.toString()) {
      return res.status(403).json({ message: 'Forbidden. You do not own this project.' });
    }

    req.project = project;
    next();
  } catch (err) {
    console.error('isProjectOwner error:', err);
    return res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = { isProjectOwner };
