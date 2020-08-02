const mongoose = require('mongoose'); 
const studentSchema = new mongoose.Schema(
  {
    //0
    email: {
        type: String,
        required: true
    },

    //1
    discord: {
        type: String,
        required: true
    },
    
    //2
    name: {
        type: String,
        required: true
    },

    //3
    region: {
        type: Number,
        required: true
    },

    //4
    location: {
        type: Array[String],
        required: true
    },

    //5
    pronouns: {
        type: String,
        required: true
    },

    //6
    introduction: {
        type: String,
        required: true
    },

    //7
    five_years: {
        type: String,
        required: true
    },

    //8
    goals: {
        type: Array[Number],
        required: true
    },

    //9
    track: {
        type: Array[Number],
        required: true
    },

    //10
    year_school: {
        type: String,
        required: true
    },

    //11
    lang_prefs: {
        type: Array[Number],
        required: false
    },

    //12
    interest_skills: {
        type: Array[Number],
        required: false
    },

    //13
    lang_importance: {
        type: Number,
        required: false
    },

    //14
    lang_preference: {
        type: String,
        required: false
    },

    //15
    project_ideas: {
        type: String,
        required: false
    },

    //16
    team_lead: {
        type: Number,
        required: true
    },

    //17
    hours_per_week: {
        type: Number,
        required: false
    },

    //18
    commitment_lev: {
        type: Number,
        required: false
    },

    //19
    commitment_exp: {
        type: String,
        required: false
    },

    //20
    meet_per_week: {
        type: String,
        required: true
    },

    //21
    curr_responsible: {
        type: String,
        required: true
    },

    //22
    start_date: {
        type: Array[Number],
        required: false
    },

    //23
    end_date: {
        type: Array[Number],
        required: false
    },

    //24
    bring_to_team: {
        type: String, 
        required: false
    },

    //25
    professional_link: {
        type: String,
        required: false
    },

    //26
    demographics: {
        type: String,
        required: false
    },

    //27
    partner_prefs: {
        type: String,
        required: false
    },

    //28
    commit_agreement: {
        type: Boolean,
        required: true
    },

    //29
    team_agreement: {
        type: String,
        required: false 
    },

    //30
    rules_agreement: {
        type: Boolean,
        required: true
    },

    //31
    tips: {
        type: String,
        required: false
    }

  },
  { timestamps: true },
);
 
const Student = mongoose.model('Student', studentSchema, 'Students');
 
module.exports = Student;