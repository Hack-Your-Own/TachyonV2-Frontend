const mongoose = require('mongoose'); 
const studentSchema = new mongoose.Schema(
  {
    //0
    email: {
        type: String,
    },

    //1
    discord: {
        type: String,
    },
    
    //2
    name: {
        type: String,
    },

    //3
    region: {
        type: String,
    },

    //4
    location: {
        type: String,
    },

    //5
    pronouns: {
        type: String,
    },

    //6
    introduction: {
        type: String,
    },

    //7
    five_years: {
        type: String,
    },

    //8
    goals: {
        type: [String],
    },

    //9
    track: {
        type: [String],
    },

    //10
    year_school: {
        type: String,
    },

    //11
    lang_prefs: {
        type: [String],
    },

    //12
    interest_skills: {
        type: [String],
    },

    //13
    lang_importance: {
        type: String,
    },

    //14
    lang_preference: {
        type: String,
    },

    //15
    project_ideas: {
        type: String,
    },

    //16
    team_lead: {
        type: String,
    },

    //17
    hours_per_week: {
        type: Number,
    },

    //18
    commitment_lev: {
        type: String,
    },

    //19
    commitment_exp: {
        type: String,
    },

    //20
    meet_per_week: {
        type: String,
    },

    //21
    curr_responsible: {
        type: String,
    },

    //22
    start_date: {
        type: Date,
    },

    //23
    end_date: {
        type: Date,
    },

    //24
    bring_to_team: {
        type: String, 
    },

    //25
    professional_link: {
        type: String,
    },

    //26
    demographics: {
        type: String,
    },

    //27
    partner_prefs: {
        type: String,
    },

    //28
    commit_agreement: {
        type: String,
    },

    //29
    team_agreement: {
        type: String,
    },

    //30
    rules_agreement: {
        type: String,
    },

    //31
    tips: {
        type: String,
    }

  },
  { timestamps: true },
);
 
const Student = mongoose.model('Student', studentSchema, 'Students');
 
module.exports = Student;