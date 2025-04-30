type Person = {
  name: string,
  birth_year: number,
  death_year: number,
  biography: string,
  image: string
}

const nationalities = [
  'American', 'British', 'Australian', 'Israeli-American', 'South African', 'French', 'Indian', 'Israeli', 'Spanish', 'South Korean', 'Chinese'
];

type Actress = Person & {
  most_famous_movies: [string, string, string],
  awards: string,
  nationality: typeof nationalities[number]
}

function isActress(dati: unknown): dati is Actress {
  if (
    dati &&
    typeof dati === 'object' &&
    'name' in dati &&
    typeof dati.name === 'string' &&
    'birth_year' in dati &&
    typeof dati.birth_year === 'number' &&
    'death_year' in dati &&
    (typeof dati.death_year === 'number' || dati.death_year === undefined) &&
    'biography' in dati &&
    typeof dati.biography === 'string' &&
    'image' in dati &&
    typeof dati.image === 'string' &&
    'most_famous_movies' in dati &&
    Array.isArray(dati.most_famous_movies) &&
    dati.most_famous_movies.length === 3 &&
    dati.most_famous_movies.every(movie => typeof movie === 'string') &&
    'awards' in dati &&
    typeof dati.awards === 'string' &&
    'nationality' in dati &&
    typeof dati.nationality === 'string' &&
    nationalities.includes(dati.nationality)
  ) {
    return true;
  }
  return false;
}

async function getActress(id: number): Promise<Actress | null> {
  try {
    const response = await fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/actresses/${id}`);
    if (!response.ok) {
      throw new Error('Errore Http');
    }
    const dati: unknown = await response.json();
    if (isActress(dati)) {
      return dati;
    }
    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function getAllActresses(): Promise<Actress[] | null> {
  try {
    const response = await fetch('https://boolean-spec-frontend.vercel.app/freetestapi/actresses');
    if (!response.ok) {
      throw new Error('Errore Http');
    }
    const dati: unknown = await response.json();
    if (Array.isArray(dati) && dati.every(isActress)) {
      return dati;
    }
    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function getActresses(ids: number[]): Promise<Actress[] | null> {
  try {
    const promises = ids.map(id => fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/actresses/${id}`));
    const responses = await Promise.all(promises);
    const data = await Promise.all(responses.map(response => response.json()));

    return data as Actress[];
  } catch (err) {
    console.error(err);
    return null;
  }
}


