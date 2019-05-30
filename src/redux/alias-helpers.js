import _ from 'lodash';

// From https://stackoverflow.com/questions/10306690/what-is-a-regular-expression-which-will-match-a-valid-domain-name-without-a-subd
const VALID_DOMAIN_REGEX = /^(((?!-))(xn--|_{1,1})?[a-z0-9-]{0,61}[a-z0-9]{1,1}\.)*(xn--)?([a-z0-9-]{1,61}|[a-z0-9-]{1,30}\.[a-z]{2,})$/i;

// From https://emailregex.com/
const VALID_EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/i;

export function extractDomains(aliases) {
  const aliasMap = {};
  _.each(aliases, (alias) => {
    const domain = extractDomain(alias.address);
    const count = _.get(aliasMap, domain, 0);
    aliasMap[domain] = count + 1;
  });

  return _.orderBy(_.keys(aliasMap), name => aliasMap[name], 'desc');
}

export function extractDomain(alias) {
  const splits = _.split(alias, '@');
  return splits[1];
}

export function validateDomain(domain) {
  return VALID_DOMAIN_REGEX.test(domain);
}

export function validateEmail(email) {
  return VALID_EMAIL_REGEX.test(email);
}