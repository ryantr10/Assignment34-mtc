const Project = require('../models/projectModel');

const createProject = async (req, res) => {
  try {
    const { title, description, researchField } = req.body;

    if (!title || !description || !researchField) {
      return res
        .status(400)
        .json({ message: 'title, description, and researchField are required.' });
    }

    const project = await Project.create({
      title,
      description,
      researchField,
      ownerId: req.session.userId,
    });

    return res.status(201).json({ message: 'Project created.', project });
  } catch (err) {
    console.error('createProject error:', err);
    return res.status(500).json({ message: 'Server error.' });
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ ownerId: req.session.userId }).sort({ creationDate: -1 });
    return res.status(200).json({ projects });
  } catch (err) {
    console.error('getProjects error:', err);
    return res.status(500).json({ message: 'Server error.' });
  }
};

const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    return res.status(200).json({ project });
  } catch (err) {
    console.error('getProjectById error:', err);
    return res.status(500).json({ message: 'Server error.' });
  }
};

const updateProject = async (req, res) => {
  try {
    const { title, description, researchField } = req.body;

    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      { title, description, researchField },
      { new: true, runValidators: true },
    );

    if (!updated) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    return res.status(200).json({ message: 'Project updated.', project: updated });
  } catch (err) {
    console.error('updateProject error:', err);
    return res.status(500).json({ message: 'Server error.' });
  }
};

const deleteProject = async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    return res.status(200).json({ message: 'Project deleted.' });
  } catch (err) {
    console.error('deleteProject error:', err);
    return res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
