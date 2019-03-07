const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const applications = require('./Application');

// const UserApplicationSchema = Schema({
//   companyName: {
//       type: String,
//       required: true
//   },
//   dateApplied: {
//       type: String,
//       required: true
//   },
//   lastUpdate: {
//       type: String,
//       require: true
//   },
//   recrutingHelp: {
//       type: Boolean,
//       required: false
//   },
//   currentApplicationStatus: {
//       type: String,
//       required: true
//   },
//   recruterInfo: {
//       recrutingCompanyName: {
//           type: String,
//           required: false
//       },
//       nameOfRecruiter: {
//           type: String,
//           required: false
//       },
//   }
  
// });

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  applications: [
    {
      _id: {
        type: String,
        required: true
      },
      companyName: {
          type: String,
          required: true
      },
      dateApplied: {
          type: String,
          required: true
      },
      lastUpdate: {
          type: String,
          require: true
      },
      recrutingHelp: {
          type: Boolean,
          required: false
      },
      currentApplicationStatus: {
          type: String,
          required: true
      },
      recruterInfo: {
          recrutingCompanyName: {
              type: String,
              required: false
          },
          nameOfRecruiter: {
              type: String,
              required: false
          },
      }
      
    }
  ]
});

module.exports = User = mongoose.model("users", UserSchema);
// module.exports = Application = mongoose.model("UserApplications", UserApplicationSchema);