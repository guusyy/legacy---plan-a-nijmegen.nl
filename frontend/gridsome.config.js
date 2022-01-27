// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: "Plan A Nijmegen",
  siteDescription: "Een multifunctionele plek in Nijmegen-West waar je kan werken, ontmoeten, eten & drinken. Overdag een werkplek, in de avond en het weekend een plek om gezellig te borrelen en dineren.",
  plugins: [
    {
      use: "@gridsome/source-graphql",
      options: {
        url:
          (process.env.GRIDSOME_STRAPI_URL || "http://localhost:1337") +
          "/graphql",
        fieldName: "strapi",
        typeName: "strapiTypes",
      },
    },
  ],
};
