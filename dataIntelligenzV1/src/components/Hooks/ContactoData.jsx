import { useEffect, useState } from "react";

export default function useContactoData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/data/Contacto.xml")
      .then(res => {
        if (!res.ok) throw new Error("No se pudo cargar el XML");
        return res.text();
      })
      .then(xmlText => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlText, "text/xml");

        const telefonoNode = xml.querySelector("telefono");
        const correoNode = xml.querySelector("correo");

        const redesNode = xml.querySelector("redes");

        if (!telefonoNode || !correoNode || !redesNode) {
          throw new Error("Estructura XML inválida");
        }

        setData({
          telefono: {
            display: telefonoNode.getAttribute("display"),
            link: telefonoNode.getAttribute("link"),
          },
          correo: correoNode.textContent,
          redes: {
            instagram: redesNode.querySelector("instagram")?.textContent || "",
            facebook: redesNode.querySelector("facebook")?.textContent || "",
            linkedin: redesNode.querySelector("linkedin")?.textContent || "",
          }
        });
      })
      .catch(err => {
        console.error("Error cargando contacto:", err);
      });
  }, []);

  return data;
}
