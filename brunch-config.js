exports.config = {
  files: {
    javascripts: {
      joinTo: "js/app.js"
    },
    stylesheets: {
      joinTo: "css/app.css"
    },
    templates: {
      joinTo: "js/app.js"
    }
  },

  paths: {
    watched: ["web/static", "test/static"],
    public: "priv/static"
  },

  plugins: {
    ES6to5: {
      ignore: [/^(web\/static\/vendor)/]
    }
  }
};
