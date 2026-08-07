const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
let basePath = '';

if (isGithubActions) {
  // GITHUB_REPOSITORY is in the format "owner/repo"
  const repo = process.env.GITHUB_REPOSITORY.split('/')[1];
  // For project pages, the path is /<repo>. For user/org pages (like owner.github.io), the path is /
  if (repo && !repo.endsWith('.github.io')) {
    basePath = `/${repo}`;
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: basePath || undefined,
};

export default nextConfig;
