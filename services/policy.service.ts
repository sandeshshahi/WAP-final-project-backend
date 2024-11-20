import db from "../database/db";
import { Policy } from "../types";

export const getAllPolicies = (
  from?: number,
  to?: number
): Promise<Policy[]> => {
  if (from && to) {
    //filter
    const fromDate = new Date(`${from}-01-01`);
    const toDate = new Date(`${to}-01-01`);

    return new Promise((resolve, reject) => {
      db.all(
        "SELECT p.*, u.name, count(v.user_id) as vote FROM policies p INNER JOIN users u ON u.id = p.user_id LEFT JOIN votes v on v.policy_id = p.id WHERE p.date >= ? AND p.date < ? GROUP BY p.id ORDER BY vote DESC",
        [fromDate, toDate],
        (err, rows) => {
          if (err) {
            return reject(err);
          }
          resolve(rows as Policy[]);
        }
      );
    });
  }
  return new Promise((resolve, reject) => {
    db.all(
      "SELECT p.*, u.name, count(v.user_id) as vote FROM policies p INNER JOIN users u ON u.id = p.user_id LEFT JOIN votes v on v.policy_id = p.id GROUP BY p.id ORDER BY vote DESC",
      (err, rows) => {
        if (err) {
          return reject(err);
        }
        resolve(rows as Policy[]);
      }
    );
  });
};

export const getPoliciesByUserId = (id: number): Promise<Policy[]> => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM policies where user_id=?", [id], (err, row) => {
      if (err) {
        return reject(err);
      }
      resolve(row as Policy[]);
    });
  });
};

export const getPolicyByPolicyId = (id: number): Promise<Policy[]> => {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT p.*, u.name, count(v.user_id) as vote FROM policies p INNER JOIN users u ON u.id = p.user_id LEFT JOIN votes v on v.policy_id = p.id WHERE p.id=?",
      [id],
      (err, row) => {
        if (err) {
          return reject(err);
        }
        resolve(row as Policy[]);
      }
    );
  });
};

export const createPolicy = async (policy: Policy): Promise<Policy> => {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO policies (title, description, category, date, user_id) VALUES (?, ?, ?, ?, ?)",
      [
        policy.title,
        policy.description,
        policy.category,
        new Date(policy.date),
        policy.user_id,
      ],
      function (err, row) {
        if (err) {
          console.log("error: ", err);
          return reject(err);
        }
        console.log("resolve: ", row);
        resolve(row as Policy);
      }
    );
  });
};
