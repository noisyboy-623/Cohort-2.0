import { IResume } from "@/types/resume.types";
import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema<IResume>(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      default: "",
    },
    summary: {
      type: String,
      default: "",
    },
    personalInfo: {
      type: {
        fullName: String,
        email: String,
        mobile: String,
        location: String,
        github: String,
        linkedIn: String,
        portfolio: String,
      },
      default: {},
    },
    workExperience: {
      type: [
        {
          company: String,
          position: String,
          startDate: String,
          endDate: String,
          description: String,
        },
      ],
      default: [],
    },
    projects: {
      type: [
        {
          title: String,
          techStack: [String],
          description: String,
          liveUrl: String,
          githubUrl: String,
        },
      ],
      default: [],
    },
    skills: {
      type: [String],
      default: [],
    },
    education: {
      type: [
        {
          institue: String,
          degree: String,
          startDate: String,
          endDate: String,
        },
      ],
      default: [],
    },
    certifications: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
)

const ResumeModel = mongoose.model('Resume', resumeSchema)
export default ResumeModel


