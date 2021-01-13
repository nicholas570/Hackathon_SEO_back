## Install and config eslint/airbnb/prettier in projects (locally)

### Needed

Node > 12 & Prettier/Eslint extensions

### configuration

- In the project directory, run npm i eslint --save-dev
- Init eslint with ./node_modules/.bin/eslint --init

### Pluggins

You need to install pluggins to run prettier as eslint rule

- npm i --save-dev prettier eslint-config-prettier eslint-plugin-prettier
- npx mrm lint-staged

Then add:

```json
"extends": [
  "prettier",
  "airbnb-base"
],
"plugins": [
  "prettier"
]
```

Modify Escma version to 2018 and es2020 to es6:

```json
"env": {
    "commonjs": true,
    "es6": true,
    "node": true
  },
  "parserOptions": {
    "ecmaVersion": 2018
  },
```

in .eslintrc.json

### Config

Change lint-staged rule to

```json
"lint-staged": {
    "src/**/*.{js,jsx}": [
      "./node_modules/.bin/eslint --max-warnings=0",
    ]
  }
```

NO COMMIT ALLOWED WITH WARNINGS

Create .prettierrc
Add:

```json
{
  "singleQuote": true,
  "trailingComma": "es5"
}
```

All rules can be changed or modified in .eslintrc.json
