/**
 * Create Navigation Query
 * @param id
 * @returns
 */
export const createNavigationQuery = () => {
  const id = '4FsGf6XPSDTPppGDlyFYm9';
  return `navigation(id: "${id}") {
      ${navCollection}
    }`;
};

/**
 * Create Custom Page Collection Query
 * @param slug
 * @returns query
 */
export const createCustomPageQuery = (slug: string) => {
  return `{
      customPageCollection(limit:1,where:{slug:"${slug}"}){
        items {
          ... on CustomPage {
            title
            ${sectionsCollection}
          }
        }  
      }
    }
  `;
};

/**
 * Create Blog Page Query
 * @param slug
 * @returns
 */
export const createBlogPageQuery = (slug: string) => {
  return `{
    blogPostCollection(limit:1,where:{slug:"${slug}"}){
      items {
        ... on BlogPost {
          ${blogCollection}
          body {
            json
           }
        }
      }  
    }
  }`;
};

/**
 * Create Blog Query
 * @param name
 * @returns query
 */
export const createBlogQuery = (name: string) => {
  const id = '4ulCCf7tXS1iFRb7TBRXV7';

  return `query {${name}(id: "${id}") { 
    name
    postsCollection {
      items {
        ... on BlogPost {
          ${blogCollection}
        }
      }
    }
   }}`;
};

/**
 * Create Section Collection Query
 * @param name
 * @returns query
 */
export const createSectionsQuery = (name: string) => {
  const id = 'iUw7LHBaBcgGaKydU2qKJ';

  return `query {${name}(id: "${id}") { ${sectionsCollection} }}`;
};

/**
 * Query Bank
 */
const blogCollection = `
sys {
  id
}
slug
title
date
preview
image {
  url 
  description
}
`;

const navCollection = `
linksCollection {
  items {
    ... on Link {
      href
      label
      text
    }
  }
}
bannerText 
bannerIcon`;

const sectionsCollection = `
sectionsCollection {
  items {
    ... on Grid {
      __typename
    }
    ... on EmailSignUp {
      __typename
    }
    ... on Subscribe {
      __typename
    }
    ... on TileSpotlight {
      __typename
      title
      body
      background
      adornment
      textColor

      tilesCollection {
        items {
          ... on SpotlightTile {
            image {
              url
              description
            }
            imageAlt
            title
            description
            ctaTitle
            ctaHref
          }
        }
      }
    }
    ... on ValueProps {
      __typename
    }
    ... on Testimonial {
      __typename
    }
    ... on Hero {
      __typename
      imageAlt
      ctaTitle
      ctaHref
      cta2Title
      cta2Href
      title
      mobileImage {
        url
        description
      }
      desktopImage{
        url
        description
      }
      body
    }
    ... on TitleDescription {
    __typename
      title
      description
    }
    ...on Fiftyfifty {
      __typename
      title
      subtitle
      background
      adornment
      ctaTitle
      ctaHref
      ctaStyle
      richText {
        json
       }
      textColor
      accentImage {
        url
        description
      }
      accentImageAlt
      layout
      imageAlt
      mobileImage{
        url
        description
      }
      desktopImage{
        url
        description
      }
    } 
  }
}`;
