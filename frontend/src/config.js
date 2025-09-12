// Development'ta localhost proxy kullan, production'da direkt API
const API_BASE_URL = import.meta.env.DEV 
  ? "/api" 
  : "https://yonelticapi.onrender.com/api";

export default {
  API_BASE_URL,
  WHATSAPP_NUMBER: "905551234567", // WhatsApp numarası
}; 