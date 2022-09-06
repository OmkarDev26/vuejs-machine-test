import countryRepository from "./countryRepository";

const respositories = {
  country: countryRepository,
};

export const RepositoryFactory = {
  get: (name) => respositories[name],
};
