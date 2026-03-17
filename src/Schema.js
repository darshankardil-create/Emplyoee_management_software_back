import mongoose from "mongoose";
import bcrypt from "bcrypt";

const schema = new mongoose.Schema(
  {
    projectCard: [
      {
        projectName: {
          type: Object,
        },
        time: {
          type: Date,
          default: Date.now,
        },
        initialDeadline: {
          type: Object,
        },
        description: {
          type: Object,
        },
        adminName: {
          type: String,
        },
        status: {
          type: String,
        },
        emailid: {
          type: String,
        },
        doc: [
          {
            docurl: {
              type: String,
            },
          },
        ],
      },
    ],
    password: {
      type: String,
    },
    role: {
      type: String,
    },
    emailid: {
      type: String,
    },
    name: {
      type: String,
    },
    type: {
      type: String,
    },
    username: {
      type: String,
    },
    teamleadarr: [
      {
        projectName: {
          type: Object,
        },
        time: {
          type: Date,
          default: Date.now,
        },
        initialDeadline: {
          type: Object,
        },
        description: {
          type: Object,
        },
        adminName: {
          type: String,
        },
        status: {
          type: String,
        },
        emailid: {
          type: String,
        },

        doc: [
          {
            docurl: {
              type: String,
            },
          },
        ],
      },
    ],
  },
  { timestamps: true },
);

schema.pre("save", async function () {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt);
  }
});

schema.methods.bcryptcompare = async function (livepassword) {
  const check = await bcrypt.compare(livepassword, this.password);
  return check;
};

const model = mongoose.model("projectCard", schema);

export async function createultraadmin() {
  try {
    const find = await model.findOne({ emailid: "adminultra" });

    if (!find) {
      const createultraadmin = new model({ emailid: "adminultra" });
      let save = await createultraadmin.save();
      console.log("ultra admin created:", save);
      return save._id;
    }

    const idofultraadmin = find._id;

    console.log("Id of existing ultra admin doc send", idofultraadmin);

    return idofultraadmin;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get or create ultra admin: " + error.message);
  }
}

export async function asyncofultraadmin() {
  await createultraadmin();
}

export default model;
