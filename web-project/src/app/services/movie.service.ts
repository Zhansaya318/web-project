import { Injectable } from '@angular/core';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private movies: Movie[] = [
    {
      id: 1,
      title: 'Interstellar',
      titleRu: 'Интерстеллар',
      titleKz: 'Интерстеллар',
      genres: ['Sci-Fi', 'Drama', 'Adventure'],
      year: 2014,
      description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
      descriptionRu: 'Команда исследователей путешествует через червоточину в космосе, пытаясь обеспечить выживание человечества.',
      descriptionKz: 'Зерттеушілер тобы адамзаттың тіршілігін қамтамасыз ету үшін ғарыштағы құрт тесігі арқылы саяхат жасайды.',
      rating: 9.2,
      poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
      trailerId: 'zSWdZVtXT7E'
    },
    {
      id: 2,
      title: 'Inception',
      titleRu: 'Начало',
      titleKz: 'Бастау',
      genres: ['Sci-Fi', 'Thriller', 'Action'],
      year: 2010,
      description: 'A thief who steals corporate secrets through dream-sharing technology is given the task of planting an idea.',
      descriptionRu: 'Вору, похищающему корпоративные секреты с помощью технологии проникновения в сны, поручают обратную задачу — внедрить идею.',
      descriptionKz: 'Арман бөлісу технологиясы арқылы корпоративтік құпияларды ұрлайтын ұры идея отырғызу тапсырмасын алады.',
      rating: 9.1,
      poster: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
      trailerId: 'YoHD9XEInc0'
    },
    {
      id: 3,
      title: 'Arrival',
      titleRu: 'Прибытие',
      titleKz: 'Келу',
      genres: ['Sci-Fi', 'Drama', 'Mystery'],
      year: 2016,
      description: 'A linguist works with the military to communicate with alien lifeforms after twelve mysterious spacecraft appear around the world.',
      descriptionRu: 'Лингвист работает с военными, чтобы наладить связь с инопланетными существами после появления двенадцати таинственных кораблей.',
      descriptionKz: 'Тілші он екі жұмбақ ғарыш кемесі пайда болғаннан кейін бөтен тіршілік иелерімен байланыс орнату үшін әскерилермен жұмыс істейді.',
      rating: 8.1,
      poster: 'https://image.tmdb.org/t/p/w500/x2FJsf1ElAgr63Y3PNPtJrcmpoe.jpg',
      trailerId: 'tFMo3UJ4B4g'
    },
    {
      id: 4,
      title: 'The Dark Knight',
      titleRu: 'Тёмный рыцарь',
      titleKz: 'Қараңғы рыцарь',
      genres: ['Action', 'Crime', 'Drama'],
      year: 2008,
      description: 'Batman faces the Joker, a criminal mastermind who plunges Gotham City into anarchy.',
      descriptionRu: 'Бэтмен противостоит Джокеру — криминальному гению, погружающему Готэм-сити в хаос.',
      descriptionKz: 'Бэтмен Готэм қаласын анархияға батырған қылмыстық данышпан Джокермен бетпе-бет келеді.',
      rating: 9.3,
      poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
      trailerId: 'EXeTwQWrcwY'
    },
    {
      id: 5,
      title: 'Titanic',
      titleRu: 'Титаник',
      titleKz: 'Титаник',
      genres: ['Drama', 'Romance'],
      year: 1997,
      description: 'A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.',
      descriptionRu: 'Семнадцатилетняя аристократка влюбляется в доброго, но бедного художника на борту роскошного злосчастного лайнера «Титаник».',
      descriptionKz: 'Он жеті жасар аристократ сорлы «Титаник» лайнерінде мейірімді бірақ кедей суретшіге ғашық болады.',
      rating: 7.9,
      poster: 'https://image.tmdb.org/t/p/w500/kHXEpyfl6zqn8a6YuozZUujufXf.jpg',
      trailerId: 'CHekZpCCExA'
    },
    {
      id: 6,
      title: 'The Shawshank Redemption',
      titleRu: 'Побег из Шоушенка',
      titleKz: 'Шоушенктен қашу',
      genres: ['Drama', 'Crime'],
      year: 1994,
      description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
      descriptionRu: 'Два заключённых на протяжении многих лет обретают душевное утешение и находят искупление через человеческое достоинство.',
      descriptionKz: 'Екі тұтқын бірнеше жыл бойы адамгершілік арқылы жұбаныш тауып, ақыры өтеу табады.',
      rating: 9.3,
      poster: 'https://image.tmdb.org/t/p/w500/lyQBXzOQSuE59IsHyhrp0qIiPAz.jpg',
      trailerId: '6hB3S9bIaco'
    },
    {
      id: 7,
      title: 'The Godfather',
      titleRu: 'Крёстный отец',
      titleKz: 'Құдайата',
      genres: ['Crime', 'Drama'],
      year: 1972,
      description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
      descriptionRu: 'Стареющий патриарх криминальной династии передаёт контроль над тайной империей своему нежелающему сыну.',
      descriptionKz: 'Ұйымдасқан қылмыс әулетінің қартайған атасы жасырын империясын өз ұлына беруге мәжбүр болады.',
      rating: 9.2,
      poster: 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsLegHnDmni7.jpg',
      trailerId: 'sY1S34973zA'
    },
    {
      id: 8,
      title: 'Pulp Fiction',
      titleRu: 'Криминальное чтиво',
      titleKz: 'Қылмыстық оқу',
      genres: ['Crime', 'Drama', 'Thriller'],
      year: 1994,
      description: 'The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.',
      descriptionRu: 'Жизни двух наёмных убийц, боксёра, гангстера и его жены переплетаются в четырёх историях о насилии и искуплении.',
      descriptionKz: 'Екі жалдамалы өлтірушінің, боксшының, гангстер мен оның әйелінің өмірлері зорлық-зомбылық пен өтеу туралы төрт тарихта қиылысады.',
      rating: 8.9,
      poster: 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
      trailerId: 's7EdQ4FqbhY'
    },
    {
      id: 9,
      title: 'The Matrix',
      titleRu: 'Матрица',
      titleKz: 'Матрица',
      genres: ['Sci-Fi', 'Action', 'Thriller'],
      year: 1999,
      description: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
      descriptionRu: 'Хакер узнаёт от таинственных повстанцев об истинной природе своей реальности и своей роли в войне против её создателей.',
      descriptionKz: 'Хакер жұмбақ бүлікшілерден өз шындығының шынайы табиғаты мен оның бақылаушыларына қарсы соғыстағы рөлі туралы біледі.',
      rating: 8.7,
      poster: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
      trailerId: 'vKQi3bBA1y8'
    },
    {
      id: 10,
      title: 'Forrest Gump',
      titleRu: 'Форрест Гамп',
      titleKz: 'Форрест Гамп',
      genres: ['Drama', 'Romance', 'Comedy'],
      year: 1994,
      description: 'The presidencies of Kennedy and Johnson, Vietnam, Watergate, and other history unfold through the perspective of an Alabama man.',
      descriptionRu: 'Президентства Кеннеди и Джонсона, Вьетнам, Уотергейт и другая история разворачиваются через призму жизни алабамца.',
      descriptionKz: 'Кеннеди мен Джонсонның президенттіктері, Вьетнам, Уотергейт және басқа тарих Алабама тұрғынының көзімен ашылады.',
      rating: 8.8,
      poster: 'https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg',
      trailerId: 'bLvqoHBptjg'
    },
    {
      id: 11,
      title: 'Goodfellas',
      titleRu: 'Славные парни',
      titleKz: 'Жақсы жігіттер',
      genres: ['Crime', 'Drama'],
      year: 1990,
      description: 'The story of Henry Hill and his life in the mob, covering his introduction into the mafia life at an early age.',
      descriptionRu: 'История Генри Хилла и его жизни в мафии, начиная с раннего вступления в преступный мир.',
      descriptionKz: 'Генри Хиллдің мафиядағы өмірі туралы әңгіме, жас кезінен қылмыстық дүниеге кіруінен бастап.',
      rating: 8.7,
      poster: 'https://image.tmdb.org/t/p/w500/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg',
      trailerId: '2IL6-sQSPAo'
    },
    {
      id: 12,
      title: 'Fight Club',
      titleRu: 'Бойцовский клуб',
      titleKz: 'Жекпе-жек клубы',
      genres: ['Drama', 'Thriller'],
      year: 1999,
      description: 'An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much more.',
      descriptionRu: 'Страдающий бессонницей офисный работник и беззаботный мыловар создают подпольный бойцовский клуб, который перерастает во что-то большее.',
      descriptionKz: 'Ұйқысыздықтан зардап шегетін кеңсе қызметкері мен салғырт сабын жасаушы жер асты жекпе-жек клубын құрады.',
      rating: 8.8,
      poster: 'https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
      trailerId: 'SUXWAEX2jlg'
    },
    {
      id: 13,
      title: 'Parasite',
      titleRu: 'Паразиты',
      titleKz: 'Паразиттер',
      genres: ['Drama', 'Thriller', 'Comedy'],
      year: 2019,
      description: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
      descriptionRu: 'Жадность и классовая дискриминация угрожают симбиотическим отношениям между богатой семьёй Пак и бедной семьёй Ким.',
      descriptionKz: 'Ашкөздік пен таптық кемсіту бай Пак отбасы мен кедей Ким руының арасындағы симбиотикалық қарым-қатынасқа қауіп төндіреді.',
      rating: 8.5,
      poster: 'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
      trailerId: '5xH0HfJHsaY'
    },
    {
      id: 14,
      title: 'Joker',
      titleRu: 'Джокер',
      titleKz: 'Джокер',
      genres: ['Crime', 'Drama', 'Thriller'],
      year: 2019,
      description: 'A mentally troubled stand-up comedian embarks on a downward spiral that leads to the creation of an iconic villain.',
      descriptionRu: 'Психически нестабильный стендап-комик начинает нисходящую спираль, которая приводит к созданию культового злодея.',
      descriptionKz: 'Психикасы тұрақсыз стендап-комик атышулы зұлымның дүниеге келуіне алып келетін төмендеу спиралін бастайды.',
      rating: 8.4,
      poster: 'https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg',
      trailerId: 'zAGVQLHvwOY'
    },
    {
      id: 15,
      title: 'Oppenheimer',
      titleRu: 'Оппенгеймер',
      titleKz: 'Оппенгеймер',
      genres: ['Drama', 'Mystery', 'Thriller'],
      year: 2023,
      description: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.',
      descriptionRu: 'История американского учёного Дж. Роберта Оппенгеймера и его роли в создании атомной бомбы.',
      descriptionKz: 'Американдық ғалым Дж. Роберт Оппенгеймердің атом бомбасын жасаудағы рөлі туралы тарих.',
      rating: 8.9,
      poster: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
      trailerId: 'uYPbbksJxIg'
    }
  ];

  getMovies(): Movie[] {
    return this.movies;
  }

  getMovieById(id: number): Movie | undefined {
    return this.movies.find(movie => movie.id === id);
  }
}