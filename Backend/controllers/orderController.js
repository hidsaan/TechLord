const Order = require("../models/orderModel");
const nodemailer = require("nodemailer");


const orderHandler = async (req, res) => {
  try {
    const { name, email, address, phone, order } = req.body;

    if (name && email && address && phone && order !== "") {
    

      const sendMailClient = await transporter.sendMail(receiver); 
      await transporter.sendMail(executor); 

      if (sendMailClient) {
        const newOrder = new Order({ name, address, phone, order });
        await newOrder.save(); 
        res.json({
          message: "Your order has been accepted ..and will ready in 30 mins",
        });
      }
    } else {
      res.json({ message: "kindly fill in the details!" });
    }
  } catch (error) {
    res.json({ message: "server time out" });
    console.log(error);
  }
};

const cancelOrderHandler = async (req, res) => {
    try {
      const { orderId } = req.body;
  
      if (orderId) {
        // Assuming you have a method to find the order by orderId
        const existingOrder = await Order.findOne({ _id: orderId });
  
        if (existingOrder) {
          // Implement your logic for canceling the order, updating the order status, or any other necessary steps
          // For example, you can update the order status to "canceled"
          existingOrder.status = "canceled";
          await existingOrder.save();

  
          res.json({ message: "Order canceled successfully" });
        } else {
          res.json({ message: "Order not found" });
        }
      } else {
        res.json({ message: "Please provide the orderId for cancellation" });
      }
    } catch (error) {
      res.status(500).json({ message: "Server error" });
      console.error(error);
    }
  };

module.exports = { orderHandler, cancelOrderHandler };
