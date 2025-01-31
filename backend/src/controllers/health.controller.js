export const getHealth = async (req, res) => {
    try {
      const messages = {message: "server is up and running✅"};
      res.status(200).json(messages);
    } catch (error) {
      console.log("Error in health controller: ", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };