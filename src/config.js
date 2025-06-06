const config = {
  BACKEND_URL: 'http://192.168.1.208:8000/api',
  theme: {
    colors: {
      background: '#121B2C',        // deep dark blue
      primary: '#1E3A8A',           // strong navy blue
      secondary: '#2D3E50',         // darker muted blue
      danger: '#FF5C5C',
      success: '#22C55E',
      disabled: '#3B3B3B',
      text1: '#FFFFFF',             // main white text
      text2: '#D0D0D0',             // secondary light gray
      text3: '#AAAAAA',             // muted gray
      accent: '#3B82F6',            // brighter blue for buttons/accents
      tabInactive: '#6B7280',       // dimmed text
      tabBackground: '#0E1626',     // darker bottom bar blue
    },
    fontSizes: {
      title: 26,
      subtitle: 20,
      body: 15,
      label: 14,
      button: 14,
      toast: 14,
    },
    fonts: {
      title: 'System',
      body: 'System',
    },
    borderRadius: {
      input: 10,
      button: 16,
      modal: 14,
    },
  },
};

export default config;
