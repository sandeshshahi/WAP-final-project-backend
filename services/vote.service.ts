import db from "../database/db";

export const votePolicy = async (
  userId: number,
  policyId: number
): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO votes (user_id,policy_id) VALUES(?,?)",
      [userId, policyId],
      function (err) {
        if (err) {
          return reject(err);
        }
        resolve();
      }
    );
  });
};

export const hasUserVoted = async (
  userId: number,
  policyId: number
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT 1 FROM votes WHERE user_id=? AND policy_id=? LIMIT 1",
      [userId, policyId],
      (err, row) => {
        if (err) {
          return reject(err);
        }
        resolve(!!row);
      }
    );
  });
};
