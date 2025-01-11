# contributors-table

[![NPM Version](https://img.shields.io/npm/v/contributors-table?logo=npm&logoColor=212121&label=version&labelColor=FAFAFA&color=212121)](https://npmjs.com/package/contributors-table) [![Tests Status](https://img.shields.io/github/actions/workflow/status/okineadev/contributors-table-npm/test.yml?label=tests&labelColor=212121)](https://github.com/okineadev/contributors-table-npm/actions/workflows/test.yml) [![Built with Bun](https://img.shields.io/badge/Built_with-Bun-fbf0df?logo=bun&labelColor=212121)](https://bun.sh) [![Formatted with Biome](https://img.shields.io/badge/Formatted_with-Biome-60a5fa?style=flat&logo=biome&labelColor=212121)](https://biomejs.dev/)

GitHub contributors table generator

> [!NOTE]
> A very fresh project, unexpected changes are possible.

## 📦 Installation

```bash
npm install contributors-table
# If you are using Bun
bun install contributors-table
```

## 🚀 Usage

### Basic Usage

```ts
import { generateContributorsTable } from 'contributors-table'
import { Octokit } from '@octokit/core'

const octokit = new Octokit()
const contributorsList = await octokit.request(
    'GET /repos/{owner}/{repo}/contributors',
    {
        owner: 'octocat',
        repo: 'Hello-World'
    }
)

const image = generateContributorsTable(contributorsList.data)
// <svg>...</svg>
```

### 🏞️ An example of an image

![Contributor Table Example](https://contributors-table.vercel.app/image?repo=material-extensions/vscode-material-icon-theme)

### Advanced Usage

#### Use another image format

```ts
// Generate a PNG image
generateContributorsTable(..., { type: 'png' })
```

### Customize the table

```ts
generateContributorsTable(..., {
    // The width of the avatars
    width: 60,
    // Gap between avatars
    gap: 10,
    // The number of avatars per row
    columns: 10,
    // The roundness of the avatars
    roundness: 50,
    // Stroke around avatars
    borderWith: 0.8,
    // Whether to render avatars on the server side.
    // If false - then the browser itself downloads images from GitHub
    // If true - then the script takes care of downloading avatars and embedding them
    // Always `true` if `type` != `'svg'`
    ssr: true
})
```

## 🤝 Contributing

Thank you for considering contributing to contributors-table 😀!
Please read the [CONTRIBUTING.md](CONTRIBUTING.md) file for more information about how to contribute to this project.

## ❤️ Support

If you like this project, consider supporting it by starring ⭐ it on GitHub, sharing it with your friends, or [buying me a coffee ☕](https://github.com/okineadev/contributors-table-npm?sponsor=1)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
