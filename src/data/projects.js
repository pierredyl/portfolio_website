// EDIT: your projects. Order here is the order they appear on the home page.
// `slug` drives the /projects/:slug route — keep it stable once shared/linked.
export const projects = [
  {
    slug: 'checkpoint',
    title: 'Checkpoint',
    description:
      'A concurrent authentication and authorization backend in Go. Uses PostgreSQL for persistence, Redis for rate limiting and token state, and Nginx for load-balancing horizontally scaled, containerized instances.',
    lang: { label: 'Go', color: 'cyan' },
    link: 'https://github.com/pierredyl/secure-auth-gateway',

    // EDIT: detail-page copy.
    overview:
      'Checkpoint is the authentication and authorization service that other third-party services depend on. All user registrations and logins are handled by it. It is designed with a security focus, implementing PASETO tokens over JWT and OWASP standard Argon2id password hashing.',
    architecture:
      'The service is containerized via Docker. Inside the Docker container, there are three app instances providing redundancy in case one of them fails. There is also a Postgres database, Redis cache, and Nginx load balancer. When a request is made, one of these three instances is chosen by the load balancer. The request is handled by an HTTP handler, each one concurrently. Therefore, all that is needed by the third-party service is an understanding of what endpoints exist to call them and what each returns. The demo above is modeled from the real service.',
    challenges: [
      {
        title: 'Simulating real load',
        text: 'Before a service goes live, it\'s imperative to baseline performance. This service has been load tested at 12,100+ requests/second across 121,000+ requests, sustaining a 100% success rate and 23.3ms p99 tail latency.',
      },
      {
        title: 'Security hardening and tradeoffs',
        text: 'Argon2id and PASETO cover credential storage and token integrity. However, Argon2id password hashing is expensive on the server. While it provides enhanced security against cracking, a brute-force attempt could be dangerous. This makes rate limiting crucially important. Using Redis, rate limiting exists on both IP and account attributes.',
      },
      {
        title: 'Decoupling verification from the token format',
        text: 'Publishing a standalone verification library, separate from the service itself, means a consumer can validate a token without understanding PASETO internals. Checkpoint can change its token format later without breaking every integration.',
      },
    ],
    techStack: {
      Languages: ['Go'],
      Concepts: ['Authentication', 'Authorization', 'Rate Limiting', 'Load Balancing', 'Security Hardening'],
      Tools: ['PostgreSQL', 'Redis', 'Nginx', 'Docker', 'PASETO', 'Argon2id'],
    },

    // Simulated client-side walkthrough of the real request/response contract —
    // see CheckpointDemo.jsx for why it's simulated rather than a live call.
    demo: { type: 'checkpoint' },
  },
  {
    slug: 'c-like-interpreter',
    title: 'C-Like Language Interpreter',
    description:
      'A full language interpreter built from scratch in C++. Comment removal, tokenizing, recursive-descent parsing, concrete and abstract syntax trees, a symbol table, and an evaluator, with zero external dependencies.',
    lang: { label: 'C++', color: 'orange' },
    link: 'https://github.com/pierredyl/c-like-language-interpreter',

    // EDIT: detail-page copy.
    overview:
      'A full interpreter for a C-like language, built from raw C++. It correctly interprets typed variables, arrays, functions and procedures, full control flow, and precedence-aware expressions, backed by scope-aware redeclaration checks and line-numbered error diagnostics.',
    architecture:
      'The pipeline runs in five stages. Lexical analysis is modeled as an explicit 28-state deterministic finite automaton, turning raw source into a token stream. A recursive-descent parser builds a concrete syntax tree from that stream, which is reduced into an abstract syntax tree matching the language grammar. A symbol table tracks scope as the tree is built, resolving variable and function lookups and catching illegal redeclarations. Finally, a tree-walking evaluator executes the AST directly, keeping a call stack of scopes as it descends into function calls, and reporting errors with line numbers rather than raw failures.',
    challenges: [
      {
        title: 'Utilizing a state machine approach',
        text: 'The lexer is modeled as an explicit 28-state deterministic finite automaton. Every edge case has exactly one defined transition instead of an accumulating pile of special cases.',
      },
      {
        title: 'Scope resolution without a bytecode layer',
        text: 'Because the evaluator walks the tree directly rather than compiling to bytecode first, scope has to be resolved and torn down correctly at every function call and block, using the symbol table as the single source of truth for what a name refers to at any point in the tree.',
      },
      {
        title: 'Validating correctness',
        text: 'The 4,600+ line implementation is validated against 25 test programs spanning every component of the pipeline, from lexing through evaluation.',
      },
    ],
    techStack: {
      Languages: ['C++'],
      Concepts: [
        'Interpreters',
        'Lexical Analysis',
        'Recursive Descent Parsing',
        'Abstract Syntax Trees',
        'Scope Resolution',
      ],
      Tools: ['CMake'],
    },

    demo: {
      type: 'interpreter',
      // Real source, pulled directly from the project's public repo
      // (github.com/pierredyl/c-like-language-interpreter). The repo's
      // `output.txt` turned out to be a stray copy of the fizzbuzz source, not
      // a captured run, so there's no real logged output to pull alongside it.
      // The `output` below is hand-traced by executing each program's logic by
      // hand — not captured from an actual run of the compiled interpreter —
      // which is disclosed in InterpreterDemo.jsx as well. All three programs
      // are simple enough (straight-line arithmetic, hex conversion, classic
      // FizzBuzz) to trace with full confidence.
      examples: [
        {
          label: 'test-1.c',
          source: `// ***************************************************
// * CS460: Programming Assignment 6: Test Program 1 *
// ***************************************************

function int sum_of_first_n_squares (int n)
{
  int sum;

  sum = 0;
  if (n >= 1)
  {
    sum = n * (n + 1) * (2 * n + 1) / 6;
  }
  return sum;
}

procedure main (void)
{
  int n;
  int sum;

  n = 100;
  sum = sum_of_first_n_squares (n);
  printf ("sum of the squares of the first %d numbers = %d\\n", n, sum);
}`,
          output: 'sum of the squares of the first 100 numbers = 338350',
        },
        {
          label: 'test-2.c',
          source: `// ***********************************************************************************
// * Hex digit converts a single character into its non-negative integer equivalent. *
// ***********************************************************************************
function int hexdigit2int (char hex_digit)
{
  int i, digit;

  digit = -1;
  if ((hex_digit >= '0') && (hex_digit <= '9'))
  {
    digit = hex_digit - '0';
  }
  else
  {
    if ((hex_digit >= 'a') && (hex_digit <= 'f'))
    {
      digit = hex_digit - 'a' + 10;
    }
  }
  return digit;
}

procedure main (void)
{
  char hexnum[9];
  int i, digit, number;

  number = 0;
  hexnum = "feed\\x0";
  digit = 0;
  for (i = 0; (i < 4) && (digit > -1); i = i + 1)
  {
    digit = hexdigit2int (hexnum[i]);
    if (digit > -1)
    {
      number = number * 16 + digit;
    }
  }
  if (digit > -1)
  {
    printf ("Hex: 0x%s is %d decimal\\n", hexnum, number);
  }
}`,
          output: 'Hex: 0xfeed is 65261 decimal',
        },
        {
          label: 'test-3.c',
          source: `// *******************************************************************************************
// * fizzbuzz: divisible by 3 -> "Fizz", by 5 -> "Buzz", by both -> "Fizzbuzz", else the number *
// *******************************************************************************************
procedure fizzbuzz (int counter)
{
  int state;

  state = 0;
  if ((counter % 3) == 0) { state = 1; }
  if ((counter % 5) == 0) { state = state * 2 + 2; }
  if (state == 1) { printf ("Fizz"); }
  else if (state == 2) { printf ("Buzz"); }
  else if (state == 4) { printf ("Fizzbuzz"); }
  else { printf ("%d", counter); }
}

procedure main (void)
{
  int counter;

  counter = 1;
  while (counter <= 100)
  {
    fizzbuzz (counter);
    counter = counter + 1;
    if (counter <= 100) { printf (", "); }
    else { printf ("\\n"); }
  }
}`,
          output:
            '1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz, 11, Fizz, 13, 14, Fizzbuzz, 16, 17, Fizz, 19, Buzz, Fizz, 22, 23, Fizz, Buzz, 26, Fizz, 28, 29, Fizzbuzz, 31, 32, Fizz, 34, Buzz, Fizz, 37, 38, Fizz, Buzz, 41, Fizz, 43, 44, Fizzbuzz, 46, 47, Fizz, 49, Buzz, Fizz, 52, 53, Fizz, Buzz, 56, Fizz, 58, 59, Fizzbuzz, 61, 62, Fizz, 64, Buzz, Fizz, 67, 68, Fizz, Buzz, 71, Fizz, 73, 74, Fizzbuzz, 76, 77, Fizz, 79, Buzz, Fizz, 82, 83, Fizz, Buzz, 86, Fizz, 88, 89, Fizzbuzz, 91, 92, Fizz, 94, Buzz, Fizz, 97, 98, Fizz, Buzz',
        },
      ],
    },
  },
  {
    slug: 'backbone',
    title: 'Backbone',
    description:
      'A machine learning and computer vision pipeline that screens CT scans for cervical spine fractures, trained on the RSNA 2022 dataset.',
    lang: { label: 'Python', color: 'yellow' },
    link: 'https://github.com/pierredyl/Cervical_Spine_Fracture',

    // EDIT: detail-page copy.
    overview:
      'A machine learning and computer vision pipeline that detects cervical spine fractures in CT scan images. Uses the RSNA 2022 dataset from Kaggle, YOLO for object detection, and PyTorch for fine-tuning the model.',
    architecture:
      'DICOM volumes are preprocessed with pydicom and OpenCV, applying Hounsfield Unit windowing (290–1700 HU) to isolate bone structure from surrounding tissue before anything reaches the model. A YOLOv8s model, fine-tuned via Ultralytics, handles the object detection. Data was split at the patient/study level rather than the slice level, so no single patient’s slices leak across the train/validation boundary.',
    challenges: [
      {
        title: 'Class imbalance in medical imaging',
        text: 'Fracture-positive slices are rare relative to normal anatomy. Balancing the training set 1:1 from 14,434 labeled slices, split 11,547 train / 2,887 validation, was necessary to keep the model from simply learning to predict "no fracture."',
      },
      {
        title: 'Preventing leakage between train and validation',
        text: 'Splitting at the patient/study level, not the slice level, was the deliberate tradeoff. It costs some training data diversity, but means the validation score reflects performance on unseen patients, not just unseen slices of patients the model has already partly seen.',
      },
      {
        title: 'Working on an Agile team',
        text: 'Working on an Agile team under a fast-paced timeline meant delegating pipeline components (preprocessing, training, evaluation) across contributors and integrating them through weekly stand-ups rather than building the whole pipeline solo.',
      },
    ],
    techStack: {
      Languages: ['Python'],
      Concepts: ['Computer Vision', 'Object Detection', 'Medical Imaging', 'Data Pipeline Design'],
      Tools: ['PyTorch', 'YOLOv8 (Ultralytics)', 'OpenCV', 'pydicom'],
    },
    demo: {
      type: 'backbone',

      // Both figures are real outputs from the project's notebook
      // (github.com/pierredyl/Cervical_Spine_Fracture, YOLO_Model.ipynb).
      figures: [
        {
          label: 'Slices from a study',
          src: '/backbone_slices.png',
          width: 1353,
          height: 752,
          alt: 'Eighteen consecutive axial slices from a single CT study, labeled slice 110 through 127, each showing the vertebra silhouette in pale yellow on black.',
          caption:
            'Eighteen consecutive slices from one study, moving down through the neck. A study is not a single image, but a stack of hundreds of slices, and one vertebra spans many of them, opening and closing again as the scan passes through it.',
        },
        {
          label: 'Fracture boxes',
          src: '/backbone_boxes.png',
          width: 1337,
          height: 1351,
          alt: 'Four axial CT slices from different studies, each with a red rectangle drawn around the fracture site on a vertebra.',
          caption:
            'Ground-truth boxes from four different studies, drawn straight from the annotation CSV. Each red rectangle marks a fracture site on that one slice. The box frames the fractured region, not the whole vertebra, and its size varies with how much of the break is visible at that depth. These are the targets the detector is trained to reproduce.',
        },
      ],

      dataset: {
        file: 'train_bounding_boxes.csv',
        intro:
          'The RSNA 2022 dataset ships each patient study as a folder of DICOM slices, plus one annotation row per fracture box. A box is a flat, axis-aligned rectangle that belongs to exactly one slice, so a fracture visible across nine slices is nine separate rows, not one 3D volume.',
        columns: [
          {
            name: 'StudyInstanceUID',
            text: 'Which scan the box belongs to. Doubles as the folder name for that study’s DICOM files.',
          },
          {
            name: 'slice_number',
            text: 'Which axial slice inside that study. Together with the UID it identifies exactly one image.',
          },
          {
            name: 'x, y',
            text: 'Top-left corner of the box, in absolute pixels within that slice.',
          },
          {
            name: 'width, height',
            text: 'Size of the box in pixels, extending right and down from that corner.',
          },
        ],
        note:
          'The rows only cover fractures, which is the whole difficulty: the overwhelming majority of slices in the dataset have no row at all. Training directly on that distribution teaches a model that predicting "nothing here" is almost always right. The pipeline instead pairs every positive slice with a randomly sampled negative one (7,217 each, 14,434 total) and splits 80/20 at the study level, so no patient has slices on both sides of the train/validation line.',
      },
    },
  },
]
