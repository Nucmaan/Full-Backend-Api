const test = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Hello from the test controller  ! ",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing your request.",
    });
  }
};

module.exports = {
  test,
};
