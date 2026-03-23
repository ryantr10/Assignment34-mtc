const express = require('express');
const router = express.Router();

const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require('../controllers/Projectcontroller');

const { isAuthenticated } = require('../middleware/authenticationMiddleware');
const { isProjectOwner } = require('../middleware/authorizationMiddleware');

router.use(isAuthenticated);

router.post('/', createProject);
router.get('/', getProjects);
router.get('/:id', getProjectById);

router.put('/:id', isProjectOwner, updateProject);
router.delete('/:id', isProjectOwner, deleteProject);

module.exports = router;
