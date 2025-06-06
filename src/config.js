const config = {
  BACKEND_URL: 'http://192.168.1.208:8000/api',
  theme: {
    colors: {
      background: '#1E1E1E',        // dark gray
      primary: '#2E2E2E',           // slightly lighter gray
      secondary: '#3C3C3C',         // muted gray
      danger: '#FF4C4C',            // bright red
      success: '#28A745',           // green
      disabled: '#5A5A5A',          // dimmed gray
      text1: '#F5F5F5',             // main white text
      text2: '#CCCCCC',             // secondary light gray
      text3: '#999999',             // muted gray
      accent: '#4A90E2',            // modern blue for buttons/accents
      tabInactive: '#757575',       // dimmed text
      tabBackground: '#2A2A2A',     // darker bottom bar gray
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
