import sha256 from 'js-sha256'

const names = {
  "korean": {
    "surnames": [
      'kim', 'lee', 'park', 'jeong', 'choe', 'jo', 'gang', 'jang', 'yun', 'im', 'sin', 'yoo', 'ryu', 'han', 'oh', 'seo', 'jeon', 'kwon', 'hwang', 'an', 'song', 'hong', 'yang', 'go', 'mun', 'son', 'bae', 'baek', 'heo', 'no', 'nam', 'sim', 'ha', 'ju', 'gu', 'kwak', 'seong', 'woo', 'cha', 'jin', 'min', 'na', 'ra', 'ji', 'eom', 'byeon', 'chae', 'won', 'bang', 'cheon', 'kyeong'
    ],
    "male": [
      'minjun', 'seojun', 'doyun', 'yejun', 'siu', 'hajun', 'juwon', 'jiho', 'jihu', 'junu', 'junseo', 'dohyeon', 'geonu', 'hyeonu', 'ujin', 'jihun', 'seonu', 'seojin', 'yeonu', 'yujun', 'eunu', 'minjae', 'hyeonjun', 'jeongu', 'siyun', 'ijun', 'seungu', 'yunu', 'seunghyeon', 'jiu', 'jihwan', 'junhyeok', 'yuchan', 'seungmin', 'suho', 'sihu', 'jinu', 'minseong', 'junyeong', 'suhyeon', 'jiwon', 'ian', 'jaeyun', 'sihyeon', 'taeyun', 'hangyeol', 'jian', 'donghyeon', 'yunho', 'siwon', 'eunchan', 'jaewon', 'mingyu', 'sion', 'minu', 'jaemin', 'jihan', 'minchan', 'seou', 'eunho', 'ubin', 'uju', 'hayul', 'junho', 'seongmin', 'seungjun', 'jiyul', 'yul', 'hajin', 'seonghyeon', 'hyeonseo', 'jaehyeon', 'minho', 'taemin', 'jun', 'jimin', 'taehyeon', 'yeseong', 'yunjae', 'jiseong', 'minhyeok', 'seongjun', 'gyumin', 'haram', 'jeongmin', 'hamin', 'yunseong', 'taeyang', 'roun', 'yechan', 'eunseong', 'junsu', 'dohun', 'junhui', 'ihyeon', 'minseok', 'daon', 'geon', 'juan', 'juho', 'jiwan', 'taejun', 'ideun', 'jio', 'gangmin', 'doha', 'seungwon', 'junseong', 'harang', 'jeonghyeon', 'hyeonsu', 'seungho', 'doyeong', 'siyul', 'doyul', 'seongbin', 'uhyeon', 'sihun', 'minseo', 'geonhui', 'seoyul', 'juhwan', 'siwan', 'minsu', 'raon', 'wonjun', 'jeonghun', 'hyeonmin', 'seungyun', 'dongha', 'mingi', 'juyeong', 'gyeongmin', 'dogyeong', 'seohu', 'jaeha', 'hyeonseong', 'yun', 'sihwan', 'danu', 'taeo', 'dowon', 'mingeon', 'jeonghu', 'gaon', 'taehun', 'onyu', 'jeongwon', 'sian', 'seungbin', 'hyeon', 'hojun', 'jaejun', 'jaehun', 'taeyeong', 'sehyeon', 'donggeon', 'taegyeong', 'yeonjun', 'beomjun', 'chanyeong', 'hyeonjin', 'taeyul', 'yugeon', 'jaeyeong', 'yeongjun', 'hayun', 'seongyun', 'haon', 'hyeonseung', 'dojun', 'chanu', 'sanghyeon', 'juhyeok', 'seunghun', 'dongyun', 'sejun', 'seungjae', 'useong', 'geonho', 'taeho', 'haneul', 'jihyeok', 'san', 'chanhui', 'yunchan', 'seonghun', 'chan', 'yunhu', 'yeonho', 'sumin', 'donguk', 'seungchan', 'taeu', 'jiun', 'hyeonho', 'gyubin', 'dogyeom', 'seoho', 'yuan'
    ],
    "female": [
      'seoyun', 'seoyeon', 'jiu', 'seohyeon', 'hayun', 'haeun', 'minseo', 'jiyu', 'yunseo', 'chaewon', 'jimin', 'sua', 'jia', 'jiyun', 'eunseo', 'daeun', 'yeeun', 'jian', 'soyul', 'yerin', 'subin', 'seoa', 'harin', 'soyun', 'yewon', 'jiwon', 'yuna', 'sieun', 'yujin', 'chaeeun', 'yuna', 'yena', 'gaeun', 'sia', 'seoyeong', 'arin', 'yeseo', 'yejin', 'yeonu', 'minji', 'jua', 'sumin', 'hayul', 'dain', 'suyeon', 'yuju', 'ayun', 'ain', 'yeonseo', 'seou', 'siyeon', 'seoeun', 'dayeon', 'chaeyun', 'hayeon', 'seoyul', 'naeun', 'nayun', 'hyeonseo', 'jiyul', 'seoha', 'seojin', 'yubin', 'dahyeon', 'yeji', 'suhyeon', 'chaea', 'soeun', 'sarang', 'nayeon', 'jieun', 'sihyeon', 'yebin', 'minju', 'yunji', 'eunchae', 'sea', 'jihyeon', 'soyeon', 'juha', 'dayun', 'jisu', 'seunga', 'somin', 'hyewon', 'daon', 'hayeong', 'chaerin', 'mina', 'seohui', 'nahyeon', 'seeun', 'ayeong', 'doyeon', 'gyuri', 'gayun', 'ahyeon', 'iseo', 'minchae', 'siyun', 'jiyeon', 'yeona', 'yuha', 'taehui', 'yerim', 'jueun', 'yujeong', 'soi', 'sohyeon', 'bomin', 'ria', 'jeongwon', 'minjeong', 'sujin', 'yunha', 'rahui', 'nagyeong', 'hyeonji', 'seyeon', 'jaei', 'mingyeong', 'gahyeon', 'bom', 'yunseul', 'jihyo', 'gaon', 'eunji', 'gayeon', 'haneul', 'yeseul', 'hanbyeol', 'chaeyeon', 'seola', 'sohui', 'hyeona', 'hana', 'yurim', 'hajin', 'hyoju', 'harang', 'eunsol', 'chaemin', 'chaei', 'yuri', 'yeju', 'dahui', 'dasom', 'taerin', 'gayeong', 'juyeon', 'hyerin', 'taeyeon', 'eunu', 'dana', 'dabin', 'roa', 'haram', 'eunyu', 'yumin', 'sion', 'hyein', 'dahye', 'jaein', 'jihye', 'taeeun', 'suin', 'seungyeon', 'goeun', 'jiyeong', 'sujeong', 'chaeyeong', 'jion', 'ara', 'minha', 'juwon', 'suji', 'jihu', 'raon', 'taeri', 'gabin', 'eunbyeol', 'seoin', 'nayeong', 'soyeong', 'yesol', 'ajin', 'nayul', 'ihyeon', 'rua', 'dayeong', 'yul', 'chaehyeon', 'bogyeong', 'seula', 'seobin', 'juhui', 'dohui', 'byeol', 'dayul', 'siu'
    ]
  },
  "japanese": {
    "surnames": [
      'satō', 'suzuki', 'takahashi', 'tanaka', 'watanabe', 'itō', 'nakamura', 'kobayashi', 'yamamoto', 'katō', 'yoshida', 'yamada', 'sasaki', 'yamaguchi', 'matsumoto', 'inoue', 'kimura', 'shimizu', 'hayashi', 'saitō', 'saitō', 'yamazaki', 'nakajima', 'mori', 'abe', 'ikeda', 'hashimoto', 'ishikawa', 'yamashita', 'ogawa', 'ishii', 'hasegawa', 'gotō', 'okada', 'kondō', 'maeda', 'fujita', 'endō', 'aoki', 'sakamoto', 'murakami', 'ōta', 'kaneko', 'fujii', 'fukuda', 'nishimura', 'miura', 'takeuchi', 'nakagawa', 'okamoto', 'matsuda', 'harada', 'nakano', 'ono', 'tamura', 'fujiwara', 'nakayama', 'ishida', 'kojima', 'wada', 'morita', 'uchida', 'shibata', 'sakai', 'hara', 'takagi', 'yokoyama', 'andō', 'miyazaki', 'ueda', 'shimada', 'kudō', 'ōno', 'miyamoto', 'sugiyama', 'imai', 'maruyama', 'masuda', 'takada', 'murata', 'hirano', 'ōtsuka', 'sugawara', 'takeda', 'arai', 'koyama', 'noguchi', 'sakurai', 'chiba', 'iwasaki', 'sano', 'taniguchi', 'ueno', 'matsui', 'kōno', 'ichikawa', 'watanabe', 'nomura', 'kikuchi', 'kinoshita'
    ],
    "male": [
      'issei', 'ren', 'takumi', 'shosei', 'shion', 'keigo', 'syoya', 'junki', 'sukai', 'yugo', 'shunya', 'tomoaki', 'kosuke', 'masahiko', 'minato', 'shion', 'jun', 'kim', 'fumiya', 'koshin', 'ryuji', 'kanta', 'tatsutoshi', 'masanami', 'sho', 'taiga', 'kaito', 'shuta', 'kim'
    ],
    "female": [
      'hikaru', 'mashiro', 'yurina', 'shana', 'ruan', 'ririka', 'may', 'kotone', 'reina', 'ayana', 'moana', 'shihona', 'risako', 'ayaka', 'hana', 'miyu', 'fuko', 'rinka', 'rinka', 'momoko', 'vivienne', 'rei', 'hina', 'sumomo', 'fuka', 'yuna', 'kyara'
    ]
  },
  "chinese": {
    "surnames": [
      'li', 'wang', 'zhang', 'liu', 'chen', 'yang', 'zhao', 'huang', 'zhou', 'wu', 'xu', 'sun', 'hu', 'zhu', 'gao', 'lin', 'he', 'guo', 'ma', 'luo', 'liang', 'song', 'zheng', 'xie', 'han', 'tang', 'feng', 'yu', 'dong', 'xiao', 'cheng', 'cao', 'yuan', 'deng', 'xu', 'fu', 'shen', 'zeng', 'peng', 'su', 'lu', 'jiang', 'cai', 'jia', 'ding', 'wei', 'xue', 'ye', 'yan', 'yu', 'pan', 'du', 'dai', 'xia', 'zhong', 'wang', 'tian', 'ren', 'jiang', 'fan', 'fang', 'shi', 'yao', 'tan', 'liao', 'zou', 'xiong', 'jin', 'lu', 'hao', 'kong', 'bai', 'cui', 'kang', 'mao', 'qiu', 'qin', 'jiang', 'shi', 'gu', 'hou', 'shao', 'meng', 'long', 'wan', 'duan', 'lei', 'qian', 'tang', 'yin', 'li', 'yi', 'chang', 'wu', 'qiao', 'he', 'lai', 'gong', 'wen', 'pang', 'fan', 'lan', 'yin', 'shi', 'tao', 'hong', 'di', 'an', 'yan', 'ni', 'yan', 'niu', 'wen', 'lu', 'ji', 'yu', 'zhang', 'lu', 'ge', 'wu', 'wei', 'shen', 'you', 'bi', 'nie', 'cong', 'jiao', 'xiang', 'liu', 'xing', 'lu', 'yue', 'qi', 'yan', 'mei', 'mo', 'zhuang', 'xin', 'guan', 'zhu', 'zuo', 'tu', 'gu', 'qi', 'shi', 'shu', 'geng', 'mou', 'bu'
    ],
    "male": [
      'yichen', 'yuxuan', 'haoyu', 'yichen', 'yuchen', 'zimo', 'yuhang', 'haoran', 'zihao', 'yichen', 'mingtao', 'haoran', 'junjie', 'zihan', 'mingzhe', 'zehong', 'jiahao', 'zirui', 'bowen', 'yiming', 'junde', 'haoyu', 'haoyang', 'yongle', 'yuze', 'jiawei', 'jianhao', 'weiguo', 'mingyu', 'zixin', 'shilei', 'zhipeng', 'zixuan', 'muyang', 'leyang', 'bocheng', 'jianyu', 'tiankuo', 'dongyang'
    ],
    "female": [
      'yinuo', 'xinyi', 'zihan', 'yutong', 'xinyan', 'kexin', 'yuxi', 'yutong', 'mengyao', 'chanjuan', 'chunhua', 'dongmei', 'huiying', 'huifen', 'jiali', 'jiayi', 'jiahui', 'lanfen', 'lihua', 'limei', 'lina', 'meilian', 'mingxia', 'mingzhu', 'qiaohui', 'xiaodan', 'xiaohui', 'yuming', 'shiyun', 'meiqi', 'yitong', 'ruo', 'xinyue', 'yanya', 'leqi', 'siyu', 'qingyi', 'yiran'
    ]
  },
  "english": {
    "surnames": [
      'smith', 'johnson', 'williams', 'brown', 'jones', 'garcia', 'miller', 'davis', 'rodriguez', 'martinez', 'hernandez', 'lopez', 'gonzalez', 'wilson', 'anderson', 'thomas', 'taylor', 'moore', 'jackson', 'martin', 'lee', 'perez', 'thompson', 'white', 'harris', 'sanchez', 'clark', 'ramirez', 'lewis', 'robinson', 'walker', 'young', 'allen', 'king', 'wright', 'scott', 'torres', 'nguyen', 'hill', 'flores', 'green', 'adams', 'nelson', 'baker', 'hall', 'rivera', 'campbell', 'mitchell', 'carter', 'roberts'
    ],
    "male": [
      'james', 'robert', 'john', 'michael', 'david', 'william', 'richard', 'joseph', 'thomas', 'christopher', 'charles', 'daniel', 'matthew', 'anthony', 'mark', 'donald', 'steven', 'andrew', 'paul', 'joshua', 'kenneth', 'kevin', 'brian', 'george', 'timothy', 'ronald', 'jason', 'edward', 'jeffrey', 'ryan', 'jacob', 'gary', 'nicholas', 'eric', 'jonathan', 'stephen', 'larry', 'justin', 'scott', 'brandon', 'benjamin', 'samuel', 'gregory', 'alexander', 'patrick', 'frank', 'raymond', 'jack', 'dennis', 'jerry', 'tyler', 'aaron', 'jose', 'adam', 'nathan', 'henry', 'zachary', 'douglas', 'peter', 'kyle', 'noah', 'ethan', 'jeremy', 'walter', 'christian', 'keith', 'roger', 'terry', 'austin', 'sean', 'gerald', 'carl', 'harold', 'dylan', 'arthur', 'lawrence', 'jordan', 'jesse', 'bryan', 'billy', 'bruce', 'gabriel', 'joe', 'logan', 'alan', 'juan', 'albert', 'willie', 'elijah', 'wayne', 'randy', 'vincent', 'mason', 'roy', 'ralph', 'bobby', 'russell', 'bradley', 'philip', 'eugene'
    ],
    "female": [
      'mary', 'patricia', 'jennifer', 'linda', 'elizabeth', 'barbara', 'susan', 'jessica', 'sarah', 'karen', 'lisa', 'nancy', 'betty', 'sandra', 'margaret', 'ashley', 'kimberly', 'emily', 'donna', 'michelle', 'carol', 'amanda', 'melissa', 'deborah', 'stephanie', 'dorothy', 'rebecca', 'sharon', 'laura', 'cynthia', 'amy', 'kathleen', 'angela', 'shirley', 'brenda', 'emma', 'anna', 'pamela', 'nicole', 'samantha', 'katherine', 'christine', 'helen', 'debra', 'rachel', 'carolyn', 'janet', 'maria', 'catherine', 'heather', 'diane', 'olivia', 'julie', 'joyce', 'victoria', 'ruth', 'virginia', 'lauren', 'kelly', 'christina', 'joan', 'evelyn', 'judith', 'andrea', 'hannah', 'megan', 'cheryl', 'jacqueline', 'martha', 'madison', 'teresa', 'gloria', 'sara', 'janice', 'ann', 'kathryn', 'abigail', 'sophia', 'frances', 'jean', 'alice', 'judy', 'isabella', 'julia', 'grace', 'amber', 'denise', 'danielle', 'marilyn', 'beverly', 'charlotte', 'natalie', 'theresa', 'diana', 'brittany', 'doris', 'kayla', 'alexis', 'lori', 'marie'
    ]
  }
}

export const skills = {
  idol: ["vocal", "dance", "rap", "performance"],
  creative: ["producing", "lyrics", "choreography", "videography"],
  entertainment: ["entertainment"]
}

function findSkillCategory(skill) {
  for (let category in skills) {
    if (skills[category].includes(skill)) {
      return category
    }
  }
}
  
function fixLevels(resources) {
  let nextLevel = (resources.level + 1) * 100
  while (resources.exp >= nextLevel) {
    resources.exp -= nextLevel
    resources.level += 1
    nextLevel = (resources.level + 1) * 100
  }
  return resources
}

export function addObjVals(obj1, obj2) {
  const result = { ...obj1 }; // Start with a copy of the first object
  
  for (const key in obj2) {
    if (key in result) {
      // If both objects have the key and both values are numbers, add them
      if (typeof obj1[key] === 'number' && typeof obj2[key] === 'number') {
        result[key] = obj1[key] + obj2[key];
      } else {
        // If values aren't both numbers, keep the first object's value
        result[key] = obj1[key];
      }
    } else {
      // If key doesn't exist in first object, add it
      result[key] = obj2[key];
    }
  }

  return fixLevels(result)
}

export function multiplyObjVals(obj, n) {
  const result = {};
  for (const key in obj) {
    if (typeof obj[key] === 'number') {
      result[key] = obj[key] * n;
    } else {
      result[key] = obj[key]; // keep non-number values unchanged
    }
  }
  return result;
}

export function isAffordable(resources, costs) {
  for (const [key, cost] of Object.entries(costs)) {
    if ((resources[key] ?? 0) < cost) {
      return false; // not enough of this resource
    }
  }
  return true; // all costs can be covered
}

export function maxAffordable(resources, costs) {
  let max = Infinity;
  for (const [key, cost] of Object.entries(costs)) {
    const available = resources[key] ?? 0;
    if (cost > 0) {
      max = Math.min(max, Math.floor(available / cost));
    }
  }
  return isFinite(max) ? max : 0;
}

export function costsToString(costs) {
  return Object.entries(costs)
    .map(([key, value]) => {
      if (key === "money") {
        return `$${value}`
      } else if (key === "energy") {
        return `${value}⚡️`
      }
    })
    .join(', ');
}

function average(arr) {
  return arr.reduce((a, b) => a + b) / arr.length
}

export function weightedRandomPick(weightMap) {
  const entries = Object.entries(weightMap);
  const totalWeight = entries.reduce((sum, [, weight]) => sum + weight, 0);
  const rand = Math.random() * totalWeight;

  let cumulative = 0;
  for (const [key, weight] of entries) {
    cumulative += weight;
    if (rand < cumulative) return key;
  }
}

function pickOne(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function pickName(gender) {
  if (gender === "non-binary") {
    gender = pickOne(["male", "female"])
  }
  const weights = {korean: 5, chinese: 2, japanese: 2, english: 1}
  const surnameLanguage = weightedRandomPick(weights)
  const surname = pickOne(names[surnameLanguage].surnames)
  const newWeights = {english: 1}
  newWeights[surnameLanguage] = 9
  const nameLanguage = weightedRandomPick(newWeights)
  const name = pickOne(names[nameLanguage][gender])
  return {name: name, surname: surname, stageName: name, nameFirst: (nameLanguage === "english" || surnameLanguage === "english")}
}

export function numToGrade(num) {
  if (num === 100) return "SSS+";

  const grades = ['U', 'F', 'E', 'D', 'C', 'B', 'A', 'S', 'SS', 'SSS'];
  const base = Math.floor(num / 10);
  let grade = grades[base] ?? 'F'; // fallback in case num < 0

  const remainder = num % 10;
  if (remainder < 3) grade += '-';
  else if (remainder >= 7) grade += '+';

  return grade;
}

export function getCustomValue(peak = 50, min = 0, max = 100) {
  while (true) {
    const x = Math.random() * (max - min) + min;
    const y = Math.random(); // accept threshold
    
    // Width controls how spread out the distribution is
    const width = (max - min) / 6; // stddev-like
    const pdf = Math.exp(-Math.pow((x - peak) / width, 2));
    
    if (y < pdf) return x;
  }
}

export function passingProbability(peak, threshold, nAveraged = 1, min = 0, max = 100, steps = 1000000) {
  const width = (max - min) / 6 / Math.sqrt(nAveraged)
  const stepSize = (max - min) / steps;

  let totalArea = 0;
  let passingArea = 0;

  for (let i = 0; i < steps; i++) {
    const x = min + i * stepSize + stepSize / 2; // midpoint for better accuracy
    const y = Math.exp(-Math.pow((x - peak) / width, 2));
    totalArea += y * stepSize;
    if (x >= threshold) {
      passingArea += y * stepSize;
    }
  }

  return Math.round((passingArea / totalArea) * 100);
}

export class Trainee {
  constructor(obj) {
    if (!obj) {
      obj = generateTrainee()
    }
    for (let i in obj) {
      this[i] = obj[i]
    }
  }

  fullName() {
    if (this.profile.nameFirst) {
      return this.profile.name + " " + this.profile.surname
    } else {
      return this.profile.surname + " " + this.profile.name
    }
  }

  idolSkill() {
    return average(Object.values(this.skills.idol)) 
  }

  creativeSkill() {
    return average(Object.values(this.skills.creative))
  }

  overallSkill() {
    return (this.idolSkill() * 3 + this.creativeSkill() + this.skills.entertainment) / 5
  }
}

function generateTrainee(peak, time) {
  const obj = {}

  obj.id = crypto.randomUUID()
  obj.profile = {
    age: getCustomValue(16, 13, 25),
    gender: weightedRandomPick({"male": 4, "female": 4, "non-binary": 1})
  }
  obj.profile = { ...obj.profile, ...pickName(obj.profile.gender) }
  obj.history = {
    enteredCompany: time
  }
  obj.metrics = {
    health: 100,
    passion: 100,
    happiness: 100,
    potential: getCustomValue(),
    trust: 0,
    fanpages: {},
    fandom: {
      number: 0,
      anticipation: 0,
      happiness: 100,
      preferences: {
        content: {},
        music: {}
      }
    }
  }
  obj.skills = {
    idol: {
      vocal: getCustomValue(peak),
      rap: getCustomValue(peak),
      dance: getCustomValue(peak),
      performance: getCustomValue(peak),
    },
    creative: {
      producing: getCustomValue(peak),
      lyrics: getCustomValue(peak),
      videography: getCustomValue(peak),
      choreography: getCustomValue(peak),
    },
    entertainment: getCustomValue(peak),
  }

  return new Trainee(obj)
}

export function generateTrainees(n, peak, threshold, time) {
  const trainees = {}
  for (let i = 0; i < n; i++) {
    const trainee = generateTrainee(peak, time) 
    if (trainee.overallSkill() >= threshold) {
      trainees[trainee.id] = trainee
    }
  }
  return trainees
}

function textToHex(text) {
  const hash = sha256.create()
  hash.update(text)
  const fullHash = hash.hex()
  return `#${fullHash.slice(0, 6)}`
}

export class Activity {
  constructor(name, func) {
    this.name = name
    this.func = func
    this.color = textToHex(name)
  }
}

export class TrainingActivity extends Activity {
  constructor(skill) {
    const func = (trainee, trainer) => {
      const gain = getCustomValue(0.5, -1, 1) *
        (trainer.score ** 0.25) *
        ((1 + trainee.metrics.potential) / 100) *
        ((1 + trainee.metrics.happiness) / 100) *
        ((1 + trainee.metrics.passion) / 100) *
        Math.sqrt(1 + trainee.metrics.trust) / 4
      console.log(skill, gain)

      const category = findSkillCategory(skill)
      if (category !== "entertainment") {
        const current = trainee.skills[category][skill]
        const updated = Math.min(current + gain, 100)
        trainee.skills[category][skill] = Math.max(updated, 0)
      } else {
        const updated = Math.min(trainee.skills.entertainment + gain, 100)
        trainee.skills.entertainment = Math.max(updated, 0)
      }

      trainee.metrics.health = Math.max(
        trainee.metrics.health - Math.round(getCustomValue(0.5, 0, 1) * 5),
        0
      )

      if (gain > 0) {
        trainee.metrics.happiness += Math.round(getCustomValue(0.5, 0, 1) * 10)
        trainee.metrics.passion += Math.round(getCustomValue(0.5, 0, 1) * 5)

        const happinessOverflow = Math.max(trainee.metrics.happiness - 100, 0)
        const passionOverflow = Math.max(trainee.metrics.passion - 100, 0)

        const trustGain = Math.sqrt(happinessOverflow + passionOverflow)
        trainee.metrics.trust = Math.min(trainee.metrics.trust + trustGain, 100)

        trainee.metrics.happiness = Math.min(trainee.metrics.happiness, 100)
        trainee.metrics.passion = Math.min(trainee.metrics.passion, 100)
      } else {
        trainee.metrics.happiness = Math.max(
          trainee.metrics.happiness - Math.round(getCustomValue(0.5, 0, 1) * 5),
          0
        )
        trainee.metrics.passion = Math.max(
          trainee.metrics.passion - Math.round(getCustomValue(0.5, 0, 1) * 3),
          0
        )
      }

      return trainee
    }

    super(`${skill} training`, func)
  }
}


export class Rest extends Activity {
  constructor() {
    super("rest", (trainee) => {
      trainee.metrics.health = Math.min(
        trainee.metrics.health + getCustomValue(0.5, 0, 1) * trainee.metrics.health / 10,
        100
      )

      trainee.metrics.happiness += Math.round(getCustomValue(0.5, 0, 1) * trainee.metrics.happiness / 10)
      const happinessOverflow = Math.max(trainee.metrics.happiness - 100, 0)

      trainee.metrics.trust = Math.min(trainee.metrics.trust + Math.sqrt(happinessOverflow), 100)
      trainee.metrics.happiness = Math.min(trainee.metrics.happiness, 100)
      
      return trainee
    })
  }
}

class Staff {
  constructor(obj) {
    for (let i in obj) {
      this[i] = obj[i]
    }
  }

  fullName() {
    if (this.profile.nameFirst) {
      return this.profile.name + " " + this.profile.surname
    } else {
      return this.profile.surname + " " + this.profile.name
    }
  }
}

export function generateManager(peak, time) {
  let profile = {
    age: getCustomValue(40, 30, 60),
    gender: weightedRandomPick({"male": 4, "female": 4, "non-binary": 1})
  }
  profile = { ...profile, ...pickName(profile.gender) }

  return new Staff({
    profile: profile,
    artist: null,
    score: getCustomValue(peak),
    history: {
      enteredCompany: time
    }
  })
}

export function generateTrainer(peak, time) {
  let profile = {
    age: getCustomValue(40, 30, 60),
    gender: weightedRandomPick({"male": 4, "female": 4, "non-binary": 1})
  }
  profile = { ...profile, ...pickName(profile.gender) }

  return new Staff({
    profile: profile,
    skill: pickOne(Object.values(skills).flat()),
    score: getCustomValue(peak),
    history: {
      enteredCompany: time
    }
  })
}

export function stripFunctionsForJSON(obj) {
  if (Array.isArray(obj)) {
    return obj
      .map(stripFunctionsForJSON)
      .filter(item => typeof item !== 'function');
  } else if (obj && typeof obj === 'object') {
    const result = {};
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value !== 'function') {
        const cleaned = stripFunctionsForJSON(value);
        if (cleaned !== undefined) result[key] = cleaned;
      }
    }
    return result;
  } else if (typeof obj !== 'function') {
    return obj;
  }
  return undefined;
}

function reconstructActivity(obj) {
  if (!obj || typeof obj.name !== "string") return null

  if (obj.name === "rest") {
    return new Rest()
  }

  if (obj.name.endsWith(" training")) {
    const skill = obj.name.replace(" training", "")
    return new TrainingActivity(skill)
  }

  return null // fallback
}

export function reconstructAllSchedules(schedule) {
  const groups = schedule.trainees.groups

  for (const groupName in groups) {
    const group = groups[groupName]
    group.schedule = group.schedule.map(day =>
      day.map(activityObj => reconstructActivity(activityObj))
    )
  }

  return schedule
}

export function reconstructStaff(obj) {
  const reconstructed = {
    trainers: {},
    managers: []
  }

  for (const skill of Object.values(skills).flat()) {
    const data = obj.trainers[skill]
    reconstructed.trainers[skill] = data ? new Staff(data) : null
  }

  reconstructed.managers = obj.managers.map(data => new Staff(data))

  return reconstructed
}

export function FinancialReport(data) {
  let trainingFees = 0
  const groups = data.schedule.trainees.groups
  for (let group in groups) {
    for (let activity in groups[group].schedule.flat()) {
      const noOfMembers = groups[group].members.length
      if (activity instanceof TrainingActivity) {
        const skill = activity.name.split(" ")[0]
        const trainerScore = data.staff.trainers[skill].score
        trainingFees += 3 * trainerScore * noOfMembers
      }
    }
  }

  const totalTrainees = Object.keys(data.trainees).length
  const totalStaff = Object.keys(data.staff.trainers).length + Object.keys(data.staff.managers).length
  
  return {
    training: trainingFees,
    maintenance: 100 * (totalTrainees + totalStaff)
  }
}

export function passTime(data, addNotification) {
  console.time("passTime total")
  let notificationBody = ""

  // --- Time Management ---
  console.time("time increment")
  data.time.week += 1
  while (data.time.week > 4) {
    data.time.week -= 4
    data.time.month += 1
  }
  while (data.time.month > 12) {
    data.time.month -= 12
    data.time.year += 1
  }
  console.timeEnd("time increment")

  // --- Financial Report ---
  console.time("financial + energy")
  const report = FinancialReport(data)
  const totalCosts = Object.values(report).reduce((a, b) => a + b, 0)
  data.resources.money -= totalCosts
  data.resources.energy = Math.min(data.resources.energy + 75, 100)
  notificationBody += `you spent $${totalCosts} this week.\n`
  for (let value in report) {
    notificationBody += `${value}: $${report[value]}\n`
  }
  console.timeEnd("financial + energy")

  // --- Weekly Activities ---
  console.time("weekly activities")
  const groups = data.schedule.trainees.groups
  for (let group in groups) {
    const fullWeek = [...groups[group].schedule.flat(), ...Array(6).fill(new Rest())]
    for (let trainingItem of fullWeek) {
      for (let member of groups[group].members) {
        if (trainingItem instanceof TrainingActivity) {
          const skill = trainingItem.name.split(" ")[0]
          const trainer = data.staff.trainers[skill]
          data.trainees[member] = trainingItem.func(data.trainees[member], trainer)
          data.resources.exp += Math.round(Math.sqrt(groups[group].members.length))
        } else if (trainingItem instanceof Rest) {
          data.trainees[member] = trainingItem.func(data.trainees[member])
        }
      }
    }
  }
  console.timeEnd("weekly activities")

  // --- Metric Decay & Dropouts ---
  console.time("metric decay")
  const traineesToRemove = []
  for (let trainee in data.trainees) {
    data.trainees[trainee].profile.age += 1 / 48
    const happiness = data.trainees[trainee].metrics.happiness
    const passion = data.trainees[trainee].metrics.passion

    if (data.trainees[trainee].metrics.health < 50) {
      data.trainees[trainee].metrics.happiness = Math.max(
        happiness - getCustomValue(0.5, 0, 1) * 5, 0
      )
      data.trainees[trainee].metrics.passion = Math.max(
        passion - getCustomValue(0.5, 0, 1) * 5, 0
      )
    }

    if (happiness < 50) {
      data.trainees[trainee].metrics.passion = Math.max(
        passion - getCustomValue(0.5, 0, 1) * 5, 0
      )
    }

    data.trainees[trainee].metrics.potential = Math.min(
      getCustomValue(happiness * passion / 10000, 0, 1) + data.trainees[trainee].metrics.potential,
      100
    )

    if (happiness < 20 && passion < 20 && getCustomValue(0.5, 0, 1) < 0.2) {
      traineesToRemove.push(trainee)
    }
  }
  console.timeEnd("metric decay")
 
  if (traineesToRemove.length) {
    notificationBody += `${traineesToRemove.length} trainees left your company\n`
  }

  // --- Trainee Removal ---
  console.time("remove dropouts")
  data.trainees = Object.fromEntries(
    Object.entries(data.trainees).filter(([key]) => !traineesToRemove.includes(key))
  )
  console.timeEnd("remove dropouts")

  // --- Resource Clamp ---
  console.time("fix levels")
  data.resources = fixLevels(data.resources)
  console.timeEnd("fix levels")

  console.timeEnd("passTime total")
  addNotification(notificationBody)
  return data
}

