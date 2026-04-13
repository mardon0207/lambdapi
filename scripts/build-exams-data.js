const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const ATTESTATION_DIR = path.join(ROOT, 'Attestasiya');
const OUTPUT_FILE = path.join(ROOT, 'js', 'data.js');

const ATT_TEST_IDS = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

const DEMO_TESTS = {
  DTM: {
    demo: [
      {
        id: 1,
        image: null,
        correct: 'B',
        variants: {
          ru: {
            text: 'Решите уравнение: \\(2x + 5 = 17\\).',
            options: ['4', '6', '7', '8']
          },
          uz: {
            text: '\\(2x + 5 = 17\\) tenglamani yeching.',
            options: ['4', '6', '7', '8']
          }
        }
      },
      {
        id: 2,
        image: null,
        correct: 'C',
        variants: {
          ru: {
            text: 'Найдите значение выражения \\(3^2 + 4^2\\).',
            options: ['12', '20', '25', '49']
          },
          uz: {
            text: '\\(3^2 + 4^2\\) ifodaning qiymatini toping.',
            options: ['12', '20', '25', '49']
          }
        }
      },
      {
        id: 3,
        image: null,
        correct: 'A',
        variants: {
          ru: {
            text: 'Если \\(f(x) = 2x - 3\\), найдите \\(f(5)\\).',
            options: ['7', '8', '10', '13']
          },
          uz: {
            text: 'Agar \\(f(x) = 2x - 3\\) bo‘lsa, \\(f(5)\\) ni toping.',
            options: ['7', '8', '10', '13']
          }
        }
      },
      {
        id: 4,
        image: null,
        correct: 'D',
        variants: {
          ru: {
            text: 'Сколько градусов содержит сумма внутренних углов треугольника?',
            options: ['90', '120', '270', '180']
          },
          uz: {
            text: 'Uchburchak ichki burchaklari yig‘indisi necha gradusga teng?',
            options: ['90', '120', '270', '180']
          }
        }
      },
      {
        id: 5,
        image: null,
        correct: 'B',
        variants: {
          ru: {
            text: 'Найдите \\(\\sqrt{81}\\).',
            options: ['7', '9', '8', '6']
          },
          uz: {
            text: '\\(\\sqrt{81}\\) ni toping.',
            options: ['7', '9', '8', '6']
          }
        }
      }
    ]
  },
  MS: {
    demo: [
      {
        id: 1,
        image: null,
        correct: 'C',
        variants: {
          ru: {
            text: 'Решите неравенство: \\(x - 4 > 3\\).',
            options: ['\\(x > 6\\)', '\\(x > 8\\)', '\\(x > 7\\)', '\\(x > 1\\)']
          },
          uz: {
            text: '\\(x - 4 > 3\\) tengsizlikni yeching.',
            options: ['\\(x > 6\\)', '\\(x > 8\\)', '\\(x > 7\\)', '\\(x > 1\\)']
          }
        }
      },
      {
        id: 2,
        image: null,
        correct: 'A',
        variants: {
          ru: {
            text: 'Найдите значение \\(\\frac{18}{3} + 2\\).',
            options: ['8', '6', '9', '12']
          },
          uz: {
            text: '\\(\\frac{18}{3} + 2\\) ifodaning qiymatini toping.',
            options: ['8', '6', '9', '12']
          }
        }
      },
      {
        id: 3,
        image: null,
        correct: 'D',
        variants: {
          ru: {
            text: 'Если стороны прямоугольника равны 3 и 5, найдите его площадь.',
            options: ['8', '10', '12', '15']
          },
          uz: {
            text: 'Tomonlari 3 va 5 ga teng to‘g‘ri to‘rtburchakning yuzini toping.',
            options: ['8', '10', '12', '15']
          }
        }
      },
      {
        id: 4,
        image: null,
        correct: 'B',
        variants: {
          ru: {
            text: 'Найдите значение \\(2^5\\).',
            options: ['16', '32', '25', '64']
          },
          uz: {
            text: '\\(2^5\\) ning qiymatini toping.',
            options: ['16', '32', '25', '64']
          }
        }
      },
      {
        id: 5,
        image: null,
        correct: 'C',
        variants: {
          ru: {
            text: 'В арифметической прогрессии \\(2, 5, 8, \\dots\\) найдите следующий член.',
            options: ['9', '10', '12', '11']
          },
          uz: {
            text: '\\(2, 5, 8, \\dots\\) arifmetik progressiyada navbatdagi hadni toping.',
            options: ['9', '10', '11', '12']
          }
        }
      }
    ]
  }
};

function readFileSafe(filePath) {
  return fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');
}

function normalizeAnswerLetter(value) {
  const raw = value.trim().toUpperCase();
  const map = {
    A: 'A',
    B: 'B',
    C: 'C',
    D: 'D',
    А: 'A',
    В: 'B',
    С: 'C',
    Д: 'D'
  };

  return map[raw] || raw;
}

function parseAnswers(testId) {
  const filePath = path.join(ATTESTATION_DIR, testId, `answers_${testId}.txt`);
  const content = readFileSafe(filePath);
  const answers = new Map();

  for (const line of content.split('\n')) {
    const match = line.match(/^\s*(\d+)\s+(\S)\s*$/u);
    if (!match) continue;
    answers.set(Number(match[1]), normalizeAnswerLetter(match[2]));
  }

  return answers;
}

function removeComments(text) {
  return text
    .split('\n')
    .map((line) => line.replace(/(^|[^\\])%.*/, '$1'))
    .join('\n');
}

function extractRelevantImage(text) {
  const images = [];
  const patterns = [
    /\\questionimage\{([^}]+)\}/g,
    /\\includegraphics(?:\[[^\]]*\])?\{([^}]+)\}/g
  ];

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(text))) {
      images.push(match[1].trim());
    }
  }

  return (
    images.find((name) => !/^(logo|tg|tgLogo)\b/i.test(path.basename(name, path.extname(name)))) ||
    null
  );
}

function flattenInnerEnumerate(text) {
  return text
    .replace(/\\begin\{enumerate\}/g, '')
    .replace(/\\end\{enumerate\}/g, '')
    .replace(/\\item\[\(([^)]+)\)\]/g, '<br>($1) ')
    .replace(/\\item\[[A-D]\)\]/g, '')
    .replace(/\\item/g, '<br>- ');
}

function cleanLatex(text) {
  return text
    .replace(/\\questionimage\{[^}]+\}/g, '')
    .replace(/\\begin\{center\}[\s\S]*?\\end\{center\}/g, '')
    .replace(/\\begin\{cc\}[\s\S]*?\\end\{cc\}/g, '')
    .replace(/\\includegraphics(?:\[[^\]]*\])?\{[^}]+\}/g, '')
    .replace(/\\vspace\{[^}]+\}/g, ' ')
    .replace(/\\textbf\{\}/g, ' ')
    .replace(/\\centering/g, ' ')
    .replace(/\\columnbreak/g, ' ')
    .replace(/\\tg\b/g, '\\tan')
    .replace(/\\ctg\b/g, '\\cot')
    .replace(/~+/g, ' ')
    .replace(/\\\\/g, ' ')
    .replace(/\n{2,}/g, '\n')
    .trim();
}

function normalizeText(text) {
  return flattenInnerEnumerate(cleanLatex(text))
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n[ \t]+/g, '\n')
    .replace(/\n{2,}/g, '<br><br>')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
}

function parseOptionList(optionsText, mode) {
  const options = [];
  let matches = [];

  if (mode === 'tasks') {
    matches = [...optionsText.matchAll(/\\task\b\s*([\s\S]*?)(?=(\\task\b|$))/g)];
  } else {
    matches = [...optionsText.matchAll(/\\item(?:\[[A-D]\)\])?\s+([\s\S]*?)(?=(\\item(?:\[[A-D]\)\])?\s+|$))/g)];
  }

  for (const match of matches) {
    const option = normalizeText(match[1]);
    if (option) options.push(option);
  }

  return options;
}

function parseQuestionBlock(block, mode) {
  let optionsMatch;

  if (mode === 'tasks') {
    optionsMatch = block.match(/\\begin\{tasks\}\(\d+\)([\s\S]*?)\\end\{tasks\}/);
  } else if (mode === 'options') {
    optionsMatch = block.match(/\\begin\{options\}([\s\S]*?)\\end\{options\}/);
  } else {
    optionsMatch = block.match(/\\begin\{enumerate\}([\s\S]*?)\\end\{enumerate\}/);
  }

  if (!optionsMatch) {
    return null;
  }

  const optionsSource = optionsMatch[1] || optionsMatch[2] || '';
  const options = parseOptionList(optionsSource, mode);
  const beforeOptions = block.slice(0, optionsMatch.index);
  const image = extractRelevantImage(beforeOptions) || extractRelevantImage(block);
  const text = normalizeText(beforeOptions);

  if (!text || options.length < 4) {
    return null;
  }

  return { text, options, image };
}

function parseEnumeratedQuestions(text) {
  const bodyMatch = text.match(/\\begin\{enumerate\}([\s\S]*?)\\end\{enumerate\}\s*\\end\{document\}/);
  const body = bodyMatch ? bodyMatch[1] : '';
  const questions = [];
  let match;
  const pattern = /\\item\s+([\s\S]*?)\\begin\{enumerate\}([\s\S]*?)\\end\{enumerate\}/g;

  while ((match = pattern.exec(body))) {
    const parsed = parseQuestionBlock(`${match[1]}\\begin{enumerate}${match[2]}\\end{enumerate}`, 'enum');
    if (parsed) questions.push(parsed);
  }

  return questions;
}

function parseInlineOptionQuestions(text) {
  const bodyMatch = text.match(/\\begin\{enumerate\}([\s\S]*?)\\end\{document\}/);
  const body = bodyMatch ? bodyMatch[1] : '';
  const items = body
    .split(/\n\\item\s+/)
    .map((chunk) => chunk.trim())
    .filter(Boolean);
  const questions = [];

  for (const rawBlock of items) {
    const block = rawBlock.replace(/\\vspace\{[^}]+\}/g, ' ').trim();
    const optionStart = block.indexOf('\\\\ A)');
    if (optionStart === -1) continue;

    const questionText = normalizeText(block.slice(0, optionStart));
    const optionString = block
      .slice(optionStart + 2)
      .replace(/\s+/g, ' ')
      .trim();
    const optionMatches = [...optionString.matchAll(/([A-D])\)\s*([\s\S]*?)(?=\s+[A-D]\)\s*|$)/g)];
    const options = optionMatches.map((match) => normalizeText(match[2]));

    if (!questionText || options.length < 4) continue;

    questions.push({
      text: questionText,
      options,
      image: extractRelevantImage(block)
    });
  }

  return questions;
}

function parseTaskBoxQuestions(text) {
  const questions = [];
  let match;
  const pattern = /\\begin\{taskbox\}(?:\[[^\]]*\])?([\s\S]*?)\\end\{taskbox\}/g;

  while ((match = pattern.exec(text))) {
    const parsed = parseQuestionBlock(match[1], 'tasks');
    if (parsed) questions.push(parsed);
  }

  return questions;
}

function parseQuestionBoxQuestions(text) {
  const questions = [];
  let match;
  const pattern = /\\begin\{questionbox\}\{\d+\}([\s\S]*?)\\end\{questionbox\}/g;

  while ((match = pattern.exec(text))) {
    const parsed = parseQuestionBlock(match[1], 'options');
    if (parsed) questions.push(parsed);
  }

  return questions;
}

function parseSavolQuestions(text) {
  const questions = [];
  let match;
  const pattern = /\\begin\{savol\}(?:\[[^\]]*\])?([\s\S]*?)\\end\{savol\}/g;

  while ((match = pattern.exec(text))) {
    const parsed = parseQuestionBlock(match[1], 'enum');
    if (parsed) questions.push(parsed);
  }

  return questions;
}

function parseQuestionsFromTex(tex) {
  const source = removeComments(tex);

  if (source.includes('\\begin{questionbox}')) return parseQuestionBoxQuestions(source);
  if (source.includes('\\begin{taskbox}')) return parseTaskBoxQuestions(source);
  if (source.includes('\\begin{savol}')) return parseSavolQuestions(source);
  if (source.includes('\\\\ A)')) return parseInlineOptionQuestions(source);
  return parseEnumeratedQuestions(source);
}

function getTexPair(testId) {
  const dir = path.join(ATTESTATION_DIR, testId);
  const ruFile = fs.existsSync(path.join(dir, 'rus.tex')) ? 'rus.tex' : 'main.tex';
  const uzFile = 'uzb.tex';

  return {
    ru: readFileSafe(path.join(dir, ruFile)),
    uz: readFileSafe(path.join(dir, uzFile))
  };
}

function buildAttestationTests() {
  const tests = {};

  for (const testId of ATT_TEST_IDS) {
    const texPair = getTexPair(testId);
    const ruQuestions = parseQuestionsFromTex(texPair.ru);
    const uzQuestions = parseQuestionsFromTex(texPair.uz);
    const answers = parseAnswers(testId);
    const count = Math.min(ruQuestions.length, uzQuestions.length, answers.size);

    tests[testId] = Array.from({ length: count }, (_, index) => ({
      id: index + 1,
      image: ruQuestions[index].image || uzQuestions[index].image,
      correct: answers.get(index + 1),
      variants: {
        ru: {
          text: ruQuestions[index].text,
          options: ruQuestions[index].options
        },
        uz: {
          text: uzQuestions[index].text,
          options: uzQuestions[index].options
        }
      }
    }));
  }

  return tests;
}

function buildData() {
  return {
    Attestasiya: buildAttestationTests(),
    DTM: DEMO_TESTS.DTM,
    MS: DEMO_TESTS.MS
  };
}

const data = buildData();
const output = `const EXAMS_DATA = ${JSON.stringify(data, null, 2)};\n`;

fs.writeFileSync(OUTPUT_FILE, output, 'utf8');
console.log(`Generated ${OUTPUT_FILE}`);
