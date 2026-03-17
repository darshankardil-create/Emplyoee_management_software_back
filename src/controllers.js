import { SchemaType } from "mongoose";
import Schema from "../src/Schema.js";
import jwtgen from "./jwt.js";
import { createultraadmin } from "./Schema.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";



export async function sendemail(req, res) {
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.email,
      pass: process.env.pass,
    },
  });

  try {
    await transport.sendMail({
      from: process.env.email,
      to: process.env.sendemail,
      subject: "myapp work",
      text: req.body.text,
    });

    res.status(200).json({
      message: `• Request sent successfully.
• An invitation email will be sent to your requested email ID from MyApp via Clerk within 2 minutes.
• Open the email and click on "Accept invitation".
• You will be redirected to the Clerk sign-in page.
• Mandatory: Use the same email ID to sign in that received the invitation (or the one through which request was sent by clicking on permit this email ID).
• Note: Make sure you are signed in on this device with the same email ID before clicking continue.
• After successful sign-up, come back to the app.
• You can now use the "Manage User Account" button.
• This will redirect you to the user account management dashboard.`,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "Failed to send request for invite",
        error: error.message,
      });
  }
}

export async function create(req, res) {
  try {
    const newdoc = new Schema(req.body);

    const save = await newdoc.save();

    const adminultraid = await createultraadmin();

    const actualtoken = jwtgen({ id: save._id, adminultraid: adminultraid });

    res.status(201).json({
      token: actualtoken,
      message: " Sing-up successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create new doc", error: error.message });
    console.log(error);
  }
}

export async function deleteac(req, res) {
  try {
    const dele = await Schema.findByIdAndDelete(req.params.id);

    if (!dele) {
      return res.status(404).json({ message: "Id not found" });
    }

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete accout", error: error.message });
    console.log(error);
  }
}

export async function findbyid(req, res) {
  try {
    const find = await Schema.findById(req.params.id);

    if (!find) {
      return res.status(404).json({ message: "Id not found" });
    }

    res
      .status(200)
      .json({ message: "Successfully fetch doc by id", data: find });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch doc by id", error: error.message });
    console.log(error);
  }
}

export async function alluser(req, res) {
  try {
    const list = await Schema.find({ type: "user" });

    if (list.length === 0) {
      return res.status(404).json({
        message:
          "No user found add few user by different account to explore all feature of app",
      });
    }

    return res.status(200).json({
      messaged: "Successfully fetched all documents with type user",
      databyme: list,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      messaged: "Failed to fetched all documents with type user",
      error: error.message,
    });
  }
}

export async function findbyidandupdate(req, res) {
  try {
    const update = await Schema.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          teamleadarr: {
            $each: req.body,
            $position: Number(req.params.posi),
          },
        },
      },
      {
        returnDocument: "after",
      },
    );

    if (!update) {
      return res.status(404).json({ message: "Id for updating doc not found" });
    }

    res
      .status(200)
      .json({ message: "Successfully updated doc by push", mydata: update });
  } catch (error) {
    console.log("error in findbyidandupdate function", error);
    res
      .status(500)
      .json({ message: "Failed to update doc by push.", error: error.message });
  }
}

export async function updatebypush(req, res) {
  try {
    const procetcartpush = await Schema.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          projectCard: {
            $each: [req.body],
            $position: Number(req.params.posi),
          },
        },
      },
      { returnDocument: "after" },
    );

    if (!procetcartpush) {
      return res.status(404).json({ message: "Document id not found" });
    }

    res.status(200).json({
      message: "Successfully updated arr by push",
      data: procetcartpush,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to Update doc", error: error.message });
    console.log(error);
  }
}

export async function updatebypull(req, res) {
  try {
    const ids = req.body.idsfront;

    const update = await Schema.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          projectCard: { _id: { $in: ids } },
        },
      },
      { returnDocument: "after" },
    );

    if (!update) {
      res
        .status(404)
        .json({ message: "Doc id for updatespecificbypullandpush not found" });
    }

    res.status(200).json({
      message: "Successfully removed obj with updatespecificbypullandpush",
      data: update,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "faield to updatebypull", error: error.message });
    console.log(error);
  }
}

export async function updatebypullforlead(req, res) {
  try {
    const ids = req.body.idsfront;

    const update = await Schema.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          teamleadarr: { _id: { $in: ids } },
        },
      },
      { returnDocument: "after" },
    );

    console.log(ids, req.params.id);

    if (!update) {
      res
        .status(404)
        .json({ message: "Doc id for updatespecificbypullandpush not found" });
    }

    res.status(200).json({
      message: "Successfully removed obj with updatebypullforlead",
      data: update,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "failed to updatebypullforlead", error: error.message });
    console.log(error);
  }
}

export async function findteamleadfillarr(req, res) {
  try {
    const found = await Schema.find({ "teamleadarr.0": { $exists: true } });

    if (found.length === 0) {
      return res.status(404).json({ message: "found zero filled array" });
    }

    return res.status(200).json({
      message:
        "Successfully found team teamleadarr array with above zero elements ",
      mydata: found,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to find team lead array with above zero elements",
      error: error.message,
    });
  }
}

export function decodetoken(req, res) {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];

      const jwtSecret = process.env.jwtpassword;

      const unloadpayload = jwt.verify(token, jwtSecret);

      const { id, adminultraid } = unloadpayload;

      return res.status(200).json({
        message: "token decoded successfully",
        decoded: { id: id, adminultraid: adminultraid },
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Failed to decode token", error: error.message });
    }
  } else {
    return res.status(400).send("token is missing");
  }
}

