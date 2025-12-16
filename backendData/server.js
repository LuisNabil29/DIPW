import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});

// Ruta para enviar correo
app.post("/api/enviar-correo", async (req, res) => {
  const { nombre, correo, mensaje } = req.body;

  try {
    // Configurar transporte SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    // Contenido del correo
    const mailOptions = {
      from: `"Contacto DataIntelligenz" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL,       // Se envía a ti mismo
      subject: "Contacto DataIntelligenz",
      text: `
      Nuevo mensaje desde el formulario de contacto de dataIntelligenz:

      Nombre: ${nombre}
      Correo: ${correo}
      Mensaje: ${mensaje}
      `
    };

    // Enviar correo
    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Correo enviado correctamente" });
  } catch (error) {
    console.error("Error enviando correo:", error);
    res.status(500).json({ success: false, message: "Error al enviar correo" });
  }
});

// Iniciar servidor
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Servidor backend en http://localhost:${PORT}`);
});
