// Shared by the build scripts and typed server loader. Keep legacy queries untouched.
const imageProjection = `{alt, crop, hotspot, asset->{_id, url, metadata{dimensions, lqip}}}`;
const seoProjection = `{title, description, image${imageProjection}}`;
const settingsQuery = `*[_id == "siteSettingsV2" && _type == "siteSettingsV2"][0]{
  _id, _rev, navigation[]{_key, label, href}, consultationUrl, consultationLabel,
  footer{heading, tagline, copyright, trademark, privacyLink{label, href}, socials[]{_key, label, href}},
  seo${seoProjection}
}`;
const homeQuery = `*[_id == "homePageV2" && _type == "homePageV2"][0]{
  _id, _rev, loadingPairs[]{_key, first, second},
  landing{statement, desktopImage${imageProjection}, mobileImage${imageProjection}},
  introduction{heading, statement, link{label, href}},
  services[]{_key, title, description, contactLabel, projects[]{_key, caption,
    "projectId": project._ref,
    project->{_id, title, "slug": slug.current, archiveProject}, image${imageProjection}}},
  results[]{_key, client, quote, attribution, background${imageProjection}, mobileBackground${imageProjection}, logo${imageProjection}},
  noticed[]{_key, title, source, year, link{label, href}, image${imageProjection}}, seo${seoProjection}
}`;
const ourWayQuery = `*[_id == "ourWayPage" && _type == "ourWayPage"][0]{
  _id, _rev, hero{statement, scrollLabel, image${imageProjection}, mobileImage${imageProjection}},
  introduction{text}, partnership{heading, founderNote, principles[]{_key, title, description}},
  process{heading, description, stages[]{_key, title, description, services[]{_key, title, detail, link{label, href}}}},
  consultation{heading, text, buttonLabel, artwork${imageProjection}},
  credentials{founderHeading, biography, services[]{_key, title, detail, link{label, href}},
    clients[]{_key, title, detail, link{label, href}}, recognition[]{_key, title, detail, link{label, href}},
    logos[]{_key, title, image${imageProjection}, link{label, href}}}, seo${seoProjection}
}`;
const redesignQuery = `{"settings": ${settingsQuery}, "home": ${homeQuery}, "ourWay": ${ourWayQuery}}`;
module.exports = { settingsQuery, homeQuery, ourWayQuery, redesignQuery };
