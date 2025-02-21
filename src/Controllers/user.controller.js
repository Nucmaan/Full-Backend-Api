const db = require("../Database/dbConnection");

const bcryptjs = require("bcryptjs");


const getAllUsers = (req, res) => {

  const sql = "SELECT * FROM users";

  db.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error in fetching data! ",
      });
    }

    res.status(200).json({
      success: true,
      message: "Users fetched successfully!",
      totalUsers: result.length,
      data: result,
    });

  });
};

const AddNewUser = async (req, res) => {
    const { userName, userEmail, userAge, userPassword } = req.body;

    // Validate input
    if (!userName || !userEmail || !userAge || !userPassword) {
        return res.status(400).json({
            success: false,
            message: "All fields are required!",
        });
    }

    try {
        // Hash password correctly
        const hashedPassword = await bcryptjs.hash(userPassword, 10);

        const sql = "INSERT INTO users (userName, userEmail, userAge, userPassword) VALUES (?,?,?,?)";
        const values = [userName, userEmail, userAge, hashedPassword];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error("Database Error:", err);
                return res.status(500).json({
                    success: false,
                    message: "Error in adding user!",
                });
            }

            res.status(201).json({
                success: true,
                message: "User added successfully!",
                userId: result.insertId,
            });
        });
    } catch (error) {
        console.error("❌ Hashing Error:", error);
        return res.status(500).json({
            success: false,
            message: "Error in processing password!",
        });
    }
};


const GetSingleUser = (req, res) => {

    const userId = req.params.userId;

    if (!userId) {
        return res.status(400).json({
            success: false,
            message: "User ID is required!",
        });
    }

    const sql = "SELECT * FROM users WHERE userId = ?";
    
    db.query(sql, [userId], (err, result) => {
        if (err) {
            console.error("Database Error:", err.message);
            return res.status(500).json({
                success: false,
                message: "Error in fetching data!",
            });
        }

        if (result.length === 0) {
            return res.status(400).json({
                success: false,
                message: "User not found!",
            });
        }

        res.status(200).json({
            success: true,
            message: "User fetched successfully!",
            user: result[0],
        });
    });
};

const deleteUser = (req, res) => {
    const userId = req.params.userId;
    
    if (!userId) {
        return res.status(400).json({
            success: false,
            message: "User ID is required!",
        });
    }

    const sql = "DELETE FROM users WHERE userId =?";
    
    db.query(sql, [userId], (err, result) => {
        if (err) {
            console.error("Database Error:", err.message);
            return res.status(500).json({
                success: false,
                message: "Error in deleting user!",
            });
        }
        
        if (result.affectedRows === 0) {
            return res.status(400).json({
                success: false,
                message: "User not found!",
            });
        }
        
        res.status(200).json({
            success: true,
            message: "User deleted successfully!",
        });
    });
}

const updateUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { userName, userEmail, userAge, userPassword } = req.body;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required!",
            });
        }

         db.query("SELECT * FROM users WHERE userId = ?", [userId], async (err, results) => {
            if (err) {
                console.error("Database Error:", err.message);
                return res.status(500).json({
                    success: false,
                    message: "Error fetching user data!",
                });
            }

            if (results.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "User not found!",
                });
            }

             const existingUser = results[0];

             const updatedUser = {
                userName: userName || existingUser.userName,
                userEmail: userEmail || existingUser.userEmail,
                userAge: userAge || existingUser.userAge,
                userPassword: userPassword ? await bcryptjs.hash(userPassword, 10) : existingUser.userPassword
            };

             const sql = `UPDATE users SET userName = ?, userEmail = ?, userAge = ?, userPassword = ? WHERE userId = ?`;
            const values = [
                updatedUser.userName,
                updatedUser.userEmail,
                updatedUser.userAge,
                updatedUser.userPassword,
                userId
            ];

             db.query(sql, values, (updateErr, result) => {
                if (updateErr) {
                    console.error("Database Error:", updateErr.message);
                    return res.status(500).json({
                        success: false,
                        message: "Error updating user!",
                    });
                }

                res.status(200).json({
                    success: true,
                    message: "User updated successfully!",
                });
            });
        });

    } catch (error) {
        console.error("Hashing Error:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong!",
        });
    }
};


    

module.exports = {
  getAllUsers,
  AddNewUser,
  GetSingleUser,
  deleteUser,
  updateUser
};
