/*
Crea un type alias Person per rappresentare una persona generica.

Il tipo deve includere le seguenti proprietà:

id: numero identificativo, non modificabile
name: nome completo, stringa non modificabile
birth_year: anno di nascita, numero
death_year: anno di morte, numero opzionale
biography: breve biografia, stringa
image: URL dell'immagine, stringa
*/

type Person = {
  name: string,
  birth_year: number,
  death_year: number,
  biography: string,
  image: string
}

/*
Crea un type alias Actress che oltre a tutte le proprietà di Person, aggiunge le seguenti proprietà:

most_famous_movies: una tuple di 3 stringhe
awards: una stringa
nationality: una stringa tra un insieme definito di valori.
Le nazionalità accettate sono: American, British, Australian, Israeli-American, South African, French, Indian, Israeli, Spanish, South Korean, Chinese.
*/

const nationalities = [
  'American', 'British', 'Australian', 'Israeli-American', 'South African', 'French', 'Indian', 'Israeli', 'Spanish', 'South Korean', 'Chinese'
];

type Actress = Person & {
  most_famous_movies: [string, string, string],
  awards: string,
  nationality: typeof nationalities[number]
}

/*
Crea una funzione getActress che, dato un id, effettua una chiamata a:

GET https://boolean-spec-frontend.vercel.app/freetestapi/actresses/:id
La funzione deve restituire l’oggetto Actress, se esiste, oppure null se non trovato.

Utilizza un type guard chiamato isActress per assicurarti che la struttura del dato ricevuto sia corretta.
*/
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

console.log(getActress(2));
