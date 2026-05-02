import { useEffect } from 'react';
import emailjs from '@emailjs/browser';

export const useTrackVisit = () => {
  useEffect(() => {
    const trackVisit = async () => {
      // Check if tracked in this session to avoid spamming
      if (sessionStorage.getItem('portfolio_tracked')) return;

      try {
        const visitData = {
          userAgent: navigator.userAgent,
          language: navigator.language,
          referrer: document.referrer || 'direct',
          screenResolution: `${window.screen.width}x${window.screen.height}`,
          page: window.location.pathname
        };

        // 1. Log to Local SQL API
        const apiUrl = localStorage.getItem('VITE_API_URL_OVERRIDE') || import.meta.env.VITE_API_URL || 'http://localhost:5000';
        await fetch(`${apiUrl}/api/track`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(visitData)
        });

        // 2. Send Email Notification via EmailJS
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        if (serviceId?.startsWith('service_') && templateId?.startsWith('template_') && publicKey?.length > 5) {
          const templateParams = {
            time: new Date().toLocaleString(),
            userAgent: navigator.userAgent,
            referrer: document.referrer || 'direct',
            to_email: 'jeeldarji@gmail.com',
          };

          await emailjs.send(serviceId, templateId, templateParams, publicKey);
        }

        sessionStorage.setItem('portfolio_tracked', 'true');
      } catch (error) {
        console.error("Error tracking visit:", error);
      }
    };

    trackVisit();
  }, []);
};
