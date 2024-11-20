import bcrypt from "bcrypt";
import db from "../database/db";
import { User } from "../types";

const saltRounds = 10;

const salt = bcrypt.genSaltSync(saltRounds);

export const getAllUsers = (): Promise<User[]> => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM users", (err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows as User[]);
    });
  });
};

export const getUserByEmail = (email: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM users where email=?", [email], (err, row) => {
      if (err) {
        return reject(err);
      }
      resolve(row as User);
    });
  });
};

export const hashPassword = (password?: string) => {
  if (!password) return "";
  return bcrypt.hashSync(password, salt);
};

export const createUser = async (user: Partial<User>): Promise<User> => {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [user.name, user.email, hashPassword(user.password)],
      function (err, row) {
        if (err) {
          return reject(err);
        }
        resolve(row as User);
      }
    );
  });
};
