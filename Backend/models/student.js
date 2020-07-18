const mongoose = require('mongoose'); 
const studentSchema = new mongoose.Schema(
  {
    timestamp: {
      type: Date,
      required: true,
    }, 
    email: {
        type: String,
        unique: true,
        required: true,
    },
    discord: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        unique: true,
        required: true,
    },
    pronouns: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    goals: {
        type: Array,
        required: true,
    },
    interest: {
        type: String,
        required: true,
    },
    skills: {
        type: Array,
        required: true,
    },
    other_langs: {
        type: String,
        required: true,
    },
    importance_spec_lang: {
        type: Number,
        required: true,
    },
    work_with_tech: {
        type: Array,
        required: true,
    },
    idea_pitch: {
        type: String,
        required: true,
    },
    would_lead: {
        type: String,
        required: true,
    },
    time_commitment: {
        type: Number,
        required: true,
    },
    in_five_years: {
        type: String,
        required: true,
    },
    timezone: {
        type: String,
        required: true,
    },
    college_year: {
        type: String,
        required: true,
    },
    linkedin: {
        type: String,
        unique: true,
        required: true,
    },
    demographics: {
        type: String,
        required: true,
    },
    preferences_tech: {
        type: String,
        required: true,
    },
    preferences_team: {
        type: String,
        required: true,
    },
    start_date: {
        type: String,
        required: true,
    },
    drop_agreement: {
        type: String,
        required: true,
    },
    rules_agreement: {
        type: String,
        required: true,
    },
    tips: {
        type: String,
        required: true,
    },
    questions: {
        type: String,
        required: true,
    },

  },
  { timestamps: true },
);
 
const Student = mongoose.model('Student', studentSchema, 'Students');
 
module.exports = Student;