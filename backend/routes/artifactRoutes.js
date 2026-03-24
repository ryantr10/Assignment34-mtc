import express from "express";
import authMiddleware from "../middleware/authenticationMiddleware.js";
import {
  ensureArtifactOwner,
  ensureCanCreateArtifact,
} from "../middleware/authorizationMiddleware.js";
import Artifact from "../models/artifactModel.js";

const router = express.Router();

router.post("/", authMiddleware, ensureCanCreateArtifact, async (req, res) => {
  try {
    const { title, description, projectId } = req.body;

    const artifact = await Artifact.create({
      title,
      description,
      projectId,
      ownerId: req.session.userId,
    });

    res.status(201).json(artifact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:projectId", authMiddleware, async (req, res) => {
  try {
    const artifacts = await Artifact.find({
      projectId: req.params.projectId,
      ownerId: req.session.userId,
    });

    res.json(artifacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", authMiddleware, ensureArtifactOwner, async (req, res) => {
  try {
    const { title, description } = req.body;

    const updatedArtifact = await Artifact.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true, runValidators: true }
    );

    res.json(updatedArtifact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", authMiddleware, ensureArtifactOwner, async (req, res) => {
  try {
    await Artifact.findByIdAndDelete(req.params.id);
    res.json({ message: "Artifact deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;