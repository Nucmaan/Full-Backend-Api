


const getAllUsers =  (req, res) => {

    return res.status(200).json({
        success: true,
        message: "All Users List ! ",
    });
}

module.exports = {
    getAllUsers
}